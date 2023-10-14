<template>
  <div id="register-view" class="login-template">
    <div class="flex column">
      <p class="title f-40 bold">
        Microrestaurant <br>------------<br>Register
      </p>

      <p class="light-1 f-22">
        Escoge qué quieres ser
      </p>

      <div class="register-options flex">
        <div class="link option light-1-bg f-18 blue-1" :class="registerOption === 'manager' ? 'selected' : ''"
          @click="setRegisterOption('manager')">
          Manager
        </div>
        <div class="link option light-1-bg f-18 blue-1" @click="setRegisterOption('user')"
          :class="registerOption === 'user' ? 'selected' : ''">
          User
        </div>
      </div>

      <form v-show="registerOption === 'manager' && !validPalanca" @submit.prevent="checkPalanca">
        <div class="question" style="margin-bottom:16px">
          <p class="f-16 light-1">
            Dame la palanca, sabes de qué hablo.
          </p>
          <input v-model="palanca" type="text" name="name" id="palanca-input" placeholder="...">
        </div>
        <button type="submit">
          check
        </button>
      </form>
      <div v-show="validPalanca" class="manager-register">

        <p class="f-24 light-4" style="margin-bottom: 12px;">
          Muy bien hecho, corrupto
        </p>
        <form @submit.prevent="registerManager" class="flex column">
          <input v-model="managerName" type="text" name="Name" id="manager-name-input" placeholder="Name">
          <input v-model="managerEmail" type="text" name="email" id="manager-email-input" placeholder="Email">
          <input v-model="managerPassword" type="password" name="password" id="manager-password-input"
            placeholder="password">
          <button type="submit">
            Register
          </button>
        </form>
      </div>
      <div v-show="palancaError" class="error-box" style="margin-bottom: 12px;">
        {{ palancaErrorMessage }}
      </div>

      <div v-if="success" class="success-box">
        {{ userRegisterMessage }}
      </div>
      <form v-else v-show="registerOption === 'user'" @submit.prevent="registerUser" class="grid">
        <div class="question">
          <p class="f-16 light-1">
            ¿Cuál es tu nombre?
          </p>
          <input v-model="name" type="text" name="name" id="name-input" placeholder="Name">
        </div>
        <div class="question">
          <p class="f-16 light-1">
            Introduce tu Email
          </p>
          <input v-model="email" type="text" name="email" id="email-input" placeholder="Email">
        </div>
        <div class="question">
          <p class="f-16 light-1">
            ¿Universidad Publica o Privada?
          </p>
          <input v-model="question_3" type="text" name="question_3" id="question_3-input" placeholder="publica o privada">
        </div>
        <div class="question">
          <p class="f-16 light-1">
            ¿Le has echado agua al shampoo?
          </p>
          <input v-model="question_4" type="text" name="question_4" id="question_4-input" placeholder="si o no">
        </div>
        <div class="question">
          <p class="f-16 light-1">
            ¿Antes de fumar bazuka fumabas vapo?
          </p>
          <input v-model="question_5" type="text" name="question_3" id="question_5-input" placeholder="si o no">
        </div>
        <div class="question">
          <p class="f-16 light-1">
            ¿Morat o Crack Family?
          </p>
          <input v-model="question_6" type="text" name="question_4" id="question_6-input"
            placeholder="Escribe alguno de los dos">
        </div>
        <div class="question">
          <p class="f-16 light-1">
            Saludas a los trabajadores de un edificio?
          </p>
          <input v-model="question_7" type="text" name="question_4" id="question_7-input" placeholder="si o no">
        </div>
        <div class="question">
          <p class="f-16 light-1">
            Password
          </p>
          <input v-model="password" type="text" name="question_4" id="password-input" placeholder="Password">
        </div>
        <div v-show="success" class="success-box">
          Registro Exitoso! Ve a la pestaña de login.
        </div>
        <button type="submit">
          Register
        </button>
      </form>
      <p @click="triggerViewChange('login')" class="reset-password link login-template-link">
        Login
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

const registerOption = ref('')

const palanca = ref('')
const validPalanca = ref(false)
const palancaError = ref(false)
const palancaErrorMessage = ref('')
const managerName = ref('')
const managerEmail = ref('')
const managerPassword = ref('')

const name = ref('')
const email = ref('')
const password = ref('')
const question_3 = ref('')
const question_4 = ref('')
const question_5 = ref('')
const question_6 = ref('')
const question_7 = ref('')
const userRegisterMessage = ref('')

const success = ref(false)

const setRegisterOption = (option) => {
  registerOption.value = option
}

const checkPalanca = async () => {
  try {
    const res = await toRaw(db_post('/auth/palanca', { palanca: palanca.value }))
    if (res.access) {
      validPalanca.value = true
      palancaErrorMessage.value = ''
      palancaError.value = false
    } else {
      validPalanca.value = false
      palancaErrorMessage.value = res.message
      palancaError.value = true
      setTimeout(() => {
        palancaErrorMessage.value = ''
        palancaError.value = false
      }, 5000)
    }
  } catch (error) {
    validPalanca.value = false
  }
}

const registerUser = async () => {
  let obj = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  if (
    question_3 === 'privada' &&
    question_4 === 'no' &&
    question_5 === 'si' &&
    question_6 === 'morat' &&
    question_7 === 'no'
  ) {
    obj.role = "gomelo_user"
  } else {
    obj.role = "normal_user"
  }
  console.log(
    question_3.value,
    question_4.value,
    question_5.value,
    question_6.value,
    question_7.value
  )
  const res = await toRaw(db_post('/auth/register', obj))
  success.value = true
  if (obj.role === 'gomelo_user') {
    userRegisterMessage.value = "Por pirobo se te asignó un usuario gomelo."
  } else {
    userRegisterMessage.value = "Me caes bien, serás un usuario normal."
  }
  setTimeout(() => {
    success.value = false
  }, 5000)
}

const registerManager = async () => {
  const obj = {
    name: managerName.value,
    email: managerEmail.value,
    role: 'manager',
    password: managerPassword.value,
  }
  console.log(obj)
  const res = await toRaw(db_post('/auth/register', obj))
  success.value = true
  setTimeout(() => {
    success.value = false
  }, 5000)
}
</script>

<style lang="scss" scoped></style>