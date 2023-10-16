<template>
  <div id="home">
    <p class="blue-1 f-30">
      Name: {{ user.name }}
    </p>
    <table>
      <thead>
        <th v-for="header in tableHeaders" :key="header.id">
          {{ header }}
        </th>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>
            <p class="f-20 blue-1 medium">
              {{ order._id }} <br>
            </p>
          </td>
          <td>
            <p class="f-20 blue-1 medium">
              {{ order.status }} <br>
            </p>
          </td>
          <td>
            <p class="f-20 blue-1 medium">
              {{ order.recipe.name }} <br>
            </p>
          </td>
          <td>
            <p class="f-20 blue-1 medium">
              {{ order.assigned_users.length == 0 ? "No users" : order.assigned_users }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, onMounted, toRaw, watch } from 'vue';
import { db_get } from '../api';
import { userData, URL, token } from '../utils';

import io from 'socket.io-client'

const user = ref({})
const orders = ref([])


const socket = io('http://localhost:3002');

socket.on('order_created', (data) => {
  console.log("order created")
});
socket.on('order_updated', (data) => {
  console.log("order updated")
});

const tableHeaders = ref([
  'Order ID',
  'Status',
  'Recipe',
  'Users',
])

onMounted(async () => {
  const userDB = await toRaw(db_get(`/users/${userData.id}`))
  user.value = userDB.user

  const ordersDB = await toRaw(db_get(`/orders`))
  orders.value = ordersDB.orders
})

</script>

<style>
th,
td {
  padding: 6px 12px;
  text-align: center;
  border: 1px solid black;
  border-radius: 3px;
}

.red {
  color: red;
}

.green {
  color: green;
}

.yellow {
  color: yellow;
}
</style>