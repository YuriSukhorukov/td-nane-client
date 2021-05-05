<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <el-container
    v-loading="!loaded">
    <div class="wrapper">
      <!-- <Header class="box1" /> -->
      <Rooms class="rooms" />
      <Chat class="chat" />
    </div>
  </el-container>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header.vue';
import Chat from './components/Chat.vue';
import Rooms from './components/Rooms.vue';

import {onMounted, computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

onMounted(async ()=>{
  // setTimeout(()=>{
  //   store.dispatch('session/getSettings');
  //   store.dispatch('rooms/getRoomsList');
  // }, 2000);
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


// простые компоненты без стилей
// стили
// роутинги

// Старт:
// - Показать лоадер
// -- Получить насройки сервера
// -- Получить список комнат
// - Скрыть лоадер
// - Ввести имя пользователя
// - Показать лоадер
// -- Установить подключение WS
// - Скрыть лоадер
// 
// Вход в комнату:
// - Скрыть лоадер
// - Выбрать комнату
// - Войти в комнату
// - Показать лоадер
// -- Получить историю сообщений комнаты
// - Скрыть лоадер
// - Написать сообщение