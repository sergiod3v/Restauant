<template>
  <div id="home">
    <h1>
      Te extraño bro :c
    </h1>
    <p class="f-28 bold">
      Logged in as
    </p>
    <p class="f-28 bold">
      Name: {{ userData.name }}
    </p>
    <p class="f-28 bold">
      Email: {{ userData.email }}
    </p>
    <p class="f-28 bold">
      Role: {{ userData.role }}
    </p>
  </div>
</template>

<script setup>
import { userData } from '../utils';

</script>


<style lang="scss">
#logout {
  cursor: pointer;
}
</style>