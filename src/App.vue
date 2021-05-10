<template>
  <el-container
    v-loading="!loaded"
  >
    <div class="wrapper">
      <Rooms class="rooms" />
      <Chat class="chat" />
    </div>
  </el-container>
</template>

<script setup>
import Chat from './components/Chat.vue';
import Rooms from './components/Rooms.vue';

import {onMounted, computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

onMounted(async ()=>{
  await store.dispatch('session/getSettings');
  await store.dispatch('rooms/getRoomsList');
});

const loaded = computed(() => {
  return store.state.session.settings != null && store.state.rooms.list != null;
});
</script>

<style>
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: white;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .rooms {
    float: left;
    width: 20%;
    height: 100vh;
    box-sizing: border-box;
    border-right: inset 1px #e6e6e6;
  }

  .chat {
    float: right;
    width: 80%;
    height: 100vh;
  }

  /* @media (orientation: landscape) {
    .wrapper {
      width: 100%;
    }
  } */
</style>