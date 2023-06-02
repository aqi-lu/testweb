import axios from 'axios'
import { storage } from '@/utils/storage';
// gm-crypto可以转化出base64格式
import { SM2 } from 'gm-crypto';
// sm-crypto只支持16进制
import smCrypto from 'sm-crypto';

// 创建自定义配置的 axios 实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 40000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "X-Requested-With": "XMLHttpRequest"
  },
  withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const headParam = {
      timestampt: Date.now(),
      channel: "admin",
      version: "1.0"
    };
    const sendParam = {
      ...config.data,
    };
    const content = {
      content: sendParam || {}
    };
    for (const key in content.content) {
      if (content.content[key] === "") {
        delete content.content[key];
      }
    }
    const requestMsg = { ...headParam, ...content };
    console.log(`加密前发送请求报文信息:${config.url}, params:${JSON.stringify(config.params)}, data:${JSON.stringify(requestMsg)}`)
    const publicKey = storage.get('publicKey');
    // 同时有公钥和私钥的情况下，才执行下面代码
    if (publicKey && storage.get('privateKey')) {
      const encryptContent = SM2.encrypt(JSON.stringify(requestMsg), publicKey, {
        inputEncoding: 'utf8',
        outputEncoding: 'base64',
      });
      const sign = smCrypto.sm3(encryptContent);
      config.data = {
        sign: sign,
        encryptContent: encryptContent,
      };
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const originSin = response.data.sign;
    if (originSin) {
      const encryptContent = response.data.encryptContent;
      const sign = smCrypto.sm3(encryptContent);
      const privateKey = storage.get('privateKey');
      if (sign === originSin) {
        const decryptContent = SM2.decrypt(encryptContent, privateKey, {
          inputEncoding: 'base64',
          outputEncoding: 'utf8',
        });
        const data = JSON.parse(decryptContent) || {};
        console.log(`解密出的内容${response.config.url}`, data);
        const tokenInfo = (data.data && data.data.tokenInfo) || {};
        if (tokenInfo.tokenName) {
          storage.set('tokenName', tokenInfo.tokenName);
          storage.set('tokenValue', tokenInfo.tokenValue);
        }
        const { code, msg } = data;
        const formatRes = {
          code,
          msg,
          data:data.data
        };
        if (code === '1') {
          return formatRes;
        }
      } else {
        console.log('验签不通过');
      }
    } else {
      return response.data;
    }
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default instance
