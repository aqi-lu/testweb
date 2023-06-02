<template>
  <div>
    <input type="text" v-model="loginForm.loginName" />
    <input type="text" v-model="loginForm.password" />
    <button @click="sumbitForm">确认1</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  loginByUsername,
} from "@/api/system/login";

const loginForm = ref({
  loginName: "",
  password: "",
});

function sumbitForm() {
  loginByUsername(loginForm.value).then((res) => {
    console.log(res)
  });
}

onMounted(async () => {
});
</script>
