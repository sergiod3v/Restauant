<template>
  <div id="home">
    <p class="blue-1 f-30">
      Name: {{ user.name }}
    </p>

    <p class="f-16 blue-3" v-for="order in orders" :key="order.id">
      {{ order }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue';
import { db_get } from '../api';
import { userData } from '../utils';
const user = ref({})
const orders = ref([])

onMounted(async () => {
  const userDB = await toRaw(db_get(`/users/${userData.id}`))
  user.value = userDB.user

  const ordersDB = await toRaw(db_get(`/orders`))
  console.log(ordersDB)
  // orders.value = ordersDB
})
</script>


<style lang="scss">
#logout {
  cursor: pointer;
}
</style>