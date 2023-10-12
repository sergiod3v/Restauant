<template>
  <div class="flex column">
    <p class="f-20">
      Login template
    </p>

    <form @submit.prevent="login" class="flex column">
      <input v-model="username" type="text" name="username" id="username-input" placeholder="username">
      <input v-model="password" type="password" name="password" id="password-input" placeholder="password">
      <button type="submit">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue';
import { db_get, db_post } from '../api'
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies()

const username = ref('')
const password = ref('')

const login = async () => {
  const body = {
    email: username.value,
    password: password.value,
  }
  const data = await toRaw(db_post('/auth/login', body))

  cookies.set("id", data.user.id)
  cookies.set("token", data.token)
  cookies.set("name", data.user.name)
  cookies.set("email", data.user.email)
  cookies.set("role", data.user.role)
  window.location.reload()

  console.log(data.message)
}
</script>

<style lang="scss">
button {
  cursor: pointer;
}
</style>