<script setup>
import Navbar from './components/NavBar.vue'
import { isLogged, logOut } from './utils';

const handleLogOut = logOut
</script>

<template>
  <div id="page" class="wrapper">
    <div v-if="isLogged()" class="flex jc-se ai-c">
      <Navbar />
      <p class="f-20 medium" id="logout" @click="handleLogOut">
        Logout
      </p>
    </div>
    <div id="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<style scoped></style>
