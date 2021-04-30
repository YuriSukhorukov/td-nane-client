<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <div>
    <Header />
    <Chat />
  </div>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header.vue';
import Chat from './components/Chat.vue';

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  position: fixed;
  /* overflow: hidden; */
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
