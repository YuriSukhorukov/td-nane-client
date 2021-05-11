<template>
  <el-container
    v-loading="!loaded"
  >
    <!-- <el-aside 
      width="100%" 
      height="100%"
    > -->
    <div class="side-container">
      <Auth class="auth" />
      <Rooms class="rooms" />
    </div>
    <!-- </el-aside> -->
    <!-- <Chat class="chat" /> -->
    <!-- <div class="wrapper">
      <Rooms class="rooms" />
      <Chat class="chat" />
    </div> -->
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
    height: 10%;
  }

  .rooms {
    width: 100%;
    height: 90%;
  }

  /* .el-aside {
    background-color: rgb(255, 189, 189);
  } */

/* 
  .wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  } */

  /* .rooms {
    box-sizing: border-box;
    border-right: inset 1px #e6e6e6;
    width: 90%;
  } */
/* 
  .chat {
    float: right;
    width: 80%;
    height: 100vh;
  } */

  /* @media (orientation: landscape) {
    .wrapper {
      width: 100%;
    }
  } */
</style>