import instance from '@/utils/http/axios/http'

/**
 * @description: 用户登录
 */
export function loginByUsername(query) {
  return instance.request({
    url: '/admin/system/login/login',
    method: 'post',
    data: query,
  })
}

// 获取服务端sm2公钥
export function getServerPublicKey(data) {
  return instance.request({
    url: '/cert/getServerPublicKey',
    method: 'post',
    data: data,
  })
}

// 获取服务器端sm4私钥
export function getClientPrivateKey(data) {
  return instance.request({
    url: '/cert/getClientPrivateKey',
    method: 'post',
    data: data,
  })
}

