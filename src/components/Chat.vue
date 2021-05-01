<template>
  <div class="wrapper">
    <div class="title">
      Room
    </div>
    <div class="list-container">
      Messages
    </div>
  </div>
</template>

<script setup>
  import Header from './Header.vue';
  import {useStore} from 'vuex';
  const store = useStore();
</script>

<style scoped>
  .wrapper {
    background-color: yellow;
  }
  .title {
    background-color: rgb(255, 241, 112);
    height: 5%;
  }
  .list-container {
    background-color: rgb(255, 253, 162);
    height: 95%;
  }
</style>