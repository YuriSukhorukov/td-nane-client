<template>
  <div class="wrapper">
    <div class="title">
      Rooms
    </div>
    <div class="list-container">
      <ListRooms />
    </div>
  </div>
</template>

<script setup>
import ListRooms from './Rooms/ListRooms.vue';
</script>

<style scoped>
  .wrapper {
    background-color: rgb(255, 0, 0);
  }
  .title {
    background-color: rgb(255, 112, 112);
    height: 5%;
  }
  .list-container {
    background-color: rgb(255, 162, 162);
    height: 95%;
  }
</style>