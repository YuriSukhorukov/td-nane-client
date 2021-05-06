<template>
  <div class="wrapper">
    <div class="title">
      {{room || 'Room'}}
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
  import {computed} from 'vue';
  import {useStore} from 'vuex';
  const store = useStore();

  const room = computed(() => {
    return store.state.rooms.current;
  });
</script>

<style scoped>
  .wrapper {
    /* background-color: yellow; */
    background-color: #FFF;
  }
  .title {
    /* background-color: rgb(255, 241, 112); */
    height: 5%;
    background-color: #FFF;
    box-sizing: border-box;
    border-bottom: inset 1px #e6e6e6;

    line-height: 70px;
    padding-left: 14px;
    font-size: 24px;
  }
  .list-container {
    /* background-color: rgb(46, 45, 15); */
    width: 79%;
    height: 90vh;
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