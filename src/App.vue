<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <ChatWindow />
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import ChatWindow from './components/ChatWindow.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
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
