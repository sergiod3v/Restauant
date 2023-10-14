<template>
  <div id="home">
    <p class="blue-1 f-30">
      Name: {{ user.name }}
    </p>

    <div v-for="order in orders" :key="order.id">
      <p class="f-20 blue-1 medium">
        Order Status: {{ order.status }} <br>
        Recipe name: {{ order.recipe.name }} <br>
        Assigned Users: {{ order.assigned_users.length == 0 ? "No users" : order.assigned_users }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, toRaw, watch } from 'vue';
import { db_get } from '../api';
import { userData } from '../utils';
const user = ref({})
const orders = ref([])

onMounted(async () => {
  const userDB = await toRaw(db_get(`/users/${userData.id}`))
  user.value = userDB.user

  const ordersDB = await toRaw(db_get(`/orders`))
  orders.value = ordersDB.orders

  console.log(orders.value)
})

</script>


<style lang="scss">
#logout {
  cursor: pointer;
}
</style>