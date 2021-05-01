<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <div class="wrapper">
    <!-- <Header class="box1" /> -->
    <Rooms class="rooms" />
    <Chat class="chat" />
  </div>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header.vue';
import Chat from './components/Chat.vue';
import Rooms from './components/Rooms.vue';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: grey;
  }

  .wrapper {
    width: 100%;
    margin: 0 auto;
  }

  .rooms {
    float: left;
    width: 20%;
    height: 100vh;
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
// - Получить насройки сервера
// - Получить список комнат
// - Ввести имя пользователя
// - Установить подключение WS
// 
// Вход в комнату:
// - Выбрать комнату
// - Войти в комнату
// - Получить историю сообщений комнаты
// - Написать сообщение
