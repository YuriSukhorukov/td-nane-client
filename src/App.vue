<template>
  <el-container
    v-loading="!loaded"
  >
    <div class="side-container">
      <Auth class="auth" />
      <Rooms class="rooms" />
    </div>
    <div class='main-сontainer'>
      <Chat class="chat" />
    </div>
  </el-container>
</template>

<script setup>
import Chat from './components/Chat.vue';
import Rooms from './components/Rooms.vue';
import Auth from './components/Auth.vue';

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
    background-color: grey;
  }

  .el-container {
    width: 100vw;
    height: 100vh;
  }

  .side-container {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .auth {
    width: 100%;
    height: 5%;
  }

  .rooms {
    width: 100%;
    height: 95%;
  }

  .main-сontainer {
    width: 80%;
    height: 100%;

    background-color: rgb(255, 189, 189);
  }

  /* @media (orientation: landscape) {
    .wrapper {
      width: 100%;
    }
  } */
</style>