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
    width: 79%;
    height: 90vh;
    margin-left: 1%;
    position: fixed;
  }
  .input-container {
    background-color: rgb(156, 120, 153);
    width: 78%;
    height: 4vh;
    margin: 1%;
    position: fixed;
    bottom: 0;
  }
</style>