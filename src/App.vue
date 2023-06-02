<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { storage } from '@/utils/storage';
import { getServerPublicKey, getClientPrivateKey } from '@/api/system/login';
import crypto from 'sm-crypto'

onBeforeMount(async () => {
    if (!storage.get('PUBLICKEY') || !storage.get('PRIVATEKEY')) {
      await getServerPublicKeyQuery();
    }
  });


let randomKey = '';
  // 获取公钥私钥
  const getServerPublicKeyQuery = async () => {
    const res = await getServerPublicKey({});
    if (res.code === '1') {
      // 第一步：获取服务端sm2公钥
      const publicKey = res.data;
      storage.set('publicKey', publicKey);
      // 第二步：获取32位十六进制的sm4密码
      const sm4Password = await getRandomKeyQuery();
      // 第三步：使用sm2公钥加密sm4密码
      let sm2Ciphertext = crypto.sm2.doEncrypt(sm4Password, publicKey);
      // 第四步：使用sm4加密报文
      const headParam = {
        timestampt: Date.now(),
        channel: 'admin',
        version: '1.0',
      };
      const sm4HeadParam = crypto.sm4.encrypt(JSON.stringify(headParam), sm4Password);
      // 第五步：组装并上送报文
      const params = {
        encryptRandomKey: sm2Ciphertext,
        encryptContent: sm4HeadParam,
      };
      await getClientPrivateKeyQuery(params);
    }
  };

  // 获取32位十六进制的sm4密码
  const getRandomKeyQuery = async () => {
    const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (let i = 0; i < 32; i++) {
      const index = Math.floor(Math.random() * (arr.length - 1));
      randomKey += arr[index];
    }
    return randomKey;
  };

  // 获取服务器端sm4私钥
  const getClientPrivateKeyQuery = async (params) => {
    const res = await getClientPrivateKey(params);
    if (res.code === '1') {
      const sm4Password = randomKey;
      const decryptData = crypto.sm4.decrypt(res.data, sm4Password);
      storage.set('privateKey', decryptData);
    }
  };

</script>

<style lang="less">
#app {
  width: 100%;
  min-width: 1200px;
  min-height: 100vh;
}
p {
  margin-block-start: 0;
  margin-block-end: 0;
}
.fade-enter {
  opacity: 0;
  transform: translateY(15px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-leave {
  opacity: 0;
}
</style>
