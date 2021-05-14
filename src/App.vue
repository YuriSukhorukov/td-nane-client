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
  return store.state.session.settings != null 
      && store.state.rooms.list != null;
});
</script>

<style>
:root {
  --color-grey: rgb(158, 158, 158);
  --border-grey-solid-1px: solid 1px #e6e6e6; 
}

body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: Slack-Lato,appleLogo,sans-serif;
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
}

.el-button {
  color: var(--color-grey);
}
.el-button:hover {
  color: var(--color-grey);
}
</style>