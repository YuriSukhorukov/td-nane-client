<template>
  <div class="wrapper">
    <div class="title">
      Room
    </div>
    <div class="list-container">
      <MessagesList />
    </div>
    <div class="input-container">
      <InputMessage />
    </div>
  </div>
</template>

<script setup>
  // import Header from './Header.vue';
  import MessagesList from './Chat/MessagesList.vue';
  import InputMessage from './Chat/InputMessage.vue';
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
    background-color: rgb(46, 45, 15);
    height: 85%;
  }
  .input-container {
    background-color: rgb(156, 120, 153);
    height: 10%;
  }
</style>