<template>
  <nav id="nav-bar">
    <ul class="w100p flex jc-se ai-c">
      <li v-for="route in routes" :key="route">
        <router-link :to="route.path">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const routes = ref([
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Marketplace',
    path: '/marketplace'
  },
  {
    name: 'Profile',
    path: '/profile'
  },
  {
    name: 'Recipes',
    path: '/recipes'
  },
])
</script>

<style>
#nav-bar {
  width: 90%;
  max-width: 1000px;
}
</style>