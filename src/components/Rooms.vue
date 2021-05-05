<template>
  <div class="wrapper">
    <div class="user-container">
      <el-button @click="openAuth" icon="el-icon-user" class="button-auth"/>
      <span class="user-name">{{username || 'Log In'}}</span>
      <Auth :drawer="drawer" @auth="onAuth" @close="onClose" />
    </div>
    <div class="list-container">
      <ListRooms />
    </div>
  </div>
</template>

<script setup>
import ListRooms from './Rooms/ListRooms.vue';
import Auth from './Auth.vue';
import {computed, reactive, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const drawer = ref(false);

const openAuth = () => {
  drawer.value = true;
}

const onAuth = () => {
  console.log('onAuth');
  drawer.value = false;
}
const onClose = () => {
  console.log('onClose');
  drawer.value = false;
}

const username = computed(() => {
  return store.state.session?.username;
});
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
    /* margin: 2%; */
    /* padding-top: 4%; */
    padding-left: 15px;
    line-height: 70px;
    font-size: 24px;
  }

  :deep() .el-icon-user {
    font-size: 24px;
  }

  :deep .el-menu-item {
    /* padding-left: 0px !important; */
    padding: 0px !important;
    padding-left: 25px !important;
    padding-right: 10px !important;
  }

  /* :deep .el-icon-message-solid {
    margin: 0px !important;
  } */

  .button-auth {
    border: none;
    background-color: transparent;
    padding: 0px;
    padding-left: 5px;
    margin-right: 10px;
  }
</style>