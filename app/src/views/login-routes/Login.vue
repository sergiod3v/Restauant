<template>
  <div id="login-view" class="login-template">
    <div class="flex column">
      <p class="title f-40 bold">
        Microrestaurant <br>------------<br>Login
      </p>

      <form @submit.prevent="login" class="flex column">
        <input v-model="email" type="text" name="email" id="email-input" placeholder="email">
        <input v-model="password" type="password" name="password" id="password-input" placeholder="password">
        <button type="submit">
          Login
        </button>
      </form>
      <p @click="triggerViewChange('register')" class="reset-password link login-template-link">
        Registrate
      </p>
      <p @click="triggerViewChange('forgotPassword')" class="reset-password link login-template-link">
        Olvidé mi contraseña
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue';
import { db_post } from '../../api'
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies()

const props = defineProps({
  triggerViewChange: Function,
});

const email = ref('')
const password = ref('')

const login = async () => {
  const body = {
    email: email.value,
    password: password.value,
  }
  const data = await toRaw(db_post('/auth/login', body))

  cookies.set("id", data.user.id)
  cookies.set("token", data.token)
  cookies.set("name", data.user.name)
  cookies.set("email", data.user.email)
  cookies.set("role", data.user.role)
  window.location.reload()
}
</script>

<style lang="scss" scoped></style>