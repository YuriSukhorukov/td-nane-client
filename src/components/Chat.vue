<template>
  <div class="wrapper">
    Chat component
  </div>
</template>

<script setup>
  import Header from './Header.vue';
  import {useStore} from 'vuex';
  const store = useStore();
</script>

<style scoped>
  .wrapper {
    /* width: 100vw; */
    /* height: 100vh; */
    background-color: red;
  }
</style>