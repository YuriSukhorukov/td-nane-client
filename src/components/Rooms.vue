<template>
  <div class="container">
    <!-- <Header class="rooms-header" /> -->
    <List class="rooms-list" />
  </div>
  <!-- <div class="wrapper"> -->
    <!-- <div class="user-container"> -->
      <!-- <el-button @click="openAuth" icon="el-icon-user" class="button-auth"/> -->
      <!-- <span class="user-name">{{username || 'Log In'}}</span> -->
      <!-- <Auth :drawer="drawer" @auth="onAuth" @close="onClose" /> -->
    <!-- </div> -->
    <!-- <div class="list-container">
      <ListRooms />
    </div> -->
  <!-- </div> -->
</template>

<script setup>
// import ListRooms from './Rooms/ListRooms.vue';



// import Header from './Rooms/Header.vue';
import List from './Rooms/List.vue';



// import Auth from './Auth.vue';
import {computed, reactive, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

// const drawer = ref(false);

// const openAuth = () => {
//   drawer.value = true;
// }

// const onAuth = () => {
//   console.log('onAuth');
//   drawer.value = false;
// }
// const onClose = () => {
//   console.log('onClose');
//   drawer.value = false;
// }

const username = computed(() => {
  return store.state.session?.username;
});
</script>

<style scoped>
  /* .container {
    width: 100vw;
    height: 100vh;
  } */

  /* .rooms-header {
    width: 100%;
    height: 10%;
  } */

  .rooms-list {
    width: 100%;
    height: 100%;
  }




  /* .list-container {
    height: 95%;
  }

  .user-container {
    height: 5%;
    box-sizing: border-box;
    border-bottom: inset 1px #e6e6e6;
    padding-left: 15px;
    line-height: 70px;
    font-size: 24px;
  }

  :deep() .el-icon-user {
    font-size: 24px;
  }

  :deep .el-menu-item {
    padding: 0px !important;
    padding-left: 25px !important;
    padding-right: 10px !important;
  }

  .button-auth {
    border: none;
    background-color: transparent;
    padding: 0px;
    padding-left: 5px;
    margin-right: 10px;
  } */
</style>