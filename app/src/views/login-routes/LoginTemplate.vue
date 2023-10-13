<template>
  <div id="login-templates" class="blue-1-bg flex jc-c ai-c">
    <Login v-if="renderedRoute === 'login'" :triggerViewChange="handleViewChange" />
    <Register v-else-if="renderedRoute === 'register'" :triggerViewChange="handleViewChange" />
    <ForgotPassword v-else class="w100p" :triggerViewChange="handleViewChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Login from "./Login.vue"
import ForgotPassword from "./ForgotPassword.vue"
import Register from './Register.vue';

const renderedRoute = ref("login");

const handleViewChange = (text) => {
  console.log(text)
  renderedRoute.value = text;
}
</script>