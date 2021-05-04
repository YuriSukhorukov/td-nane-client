<template>
  <div class="wrapper">
    <div class="user-container">
      <el-button icon="el-icon-user" class="button-auth"/>
      Log In
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
    /* background-color: rgb(255, 0, 0); */
    background-color: #FFF;

    /* box-sizing: border-box;
    border: inset 1px black; */
    /* box-shadow: inset 0 0 1px rgb(141, 141, 141); */
  }
  
  .list-container {
    /* background-color: rgb(255, 162, 162); */
    height: 95%;
  }

  .user-container {
    /* background-color: rgb(255, 112, 112); */
    height: 5%;
    /* border-bottom: solid 1px #e6e6e6; */
    box-sizing: border-box;
    border-bottom: inset 1px #e6e6e6;
  }

  .button-auth {
    border: none;
    background-color: transparent;
  }
</style>