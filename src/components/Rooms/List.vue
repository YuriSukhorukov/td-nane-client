<template>
  <div class="container">
    <div class="new-room-panel">
      <div v-if="stepAddingRoom==FIRST_STEP" class="adding-room-panes-first">
        <span class="rooms-label">Rooms</span>
        <el-button @click="openAddingRoomPanel" class="el-icon-plus"></el-button>
      </div>
      <div v-else-if="stepAddingRoom==SECOND_STEP" class="adding-room-panes-second">
        <el-input 
          class="input-new-room-title"
          show-word-limit
          :maxlength="maxRoomTitleLength"
          placeholder="Room Title" 
          v-model="newRoomTitle"
        />
        <el-button
          class="el-icon-check"
          @click="addNewRoom"
        />
        <el-button
          class="el-icon-close"
          @click="closeAddingRoomPanel"
        />
      </div>
    </div>
    <div class="rooms-list-panel">
      <el-menu default-active="null" @select="handleSelectRoom" class="el-menu-vertical-demo" :collapse="false">
        <el-menu-item v-for="(room, index) in roomsList" :index="index">
          <template #title>
            <span>{{room.name}}</span>
            <div style="float: right">
              <i v-if="isMessagesInRoomUnreaded(index)" class="el-icon-message-solid" />
            </div>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const FIRST_STEP = 1;
const SECOND_STEP = 2;

const stepAddingRoom = ref(FIRST_STEP);

const roomsList = computed(() => {
  return store.state.rooms.list;
});

const maxRoomTitleLength = computed(() => {
  return store.state.session.settings?.max_room_title_length;
});

const newRoomTitle = ref('');

const openAddingRoomPanel = () => {
  stepAddingRoom.value = SECOND_STEP;
}

const closeAddingRoomPanel = () => {
  stepAddingRoom.value = FIRST_STEP;
}

const isRoomExist = (roomTitle) => {
  return store.state.rooms.list.find(el => el.name == roomTitle) != undefined;
}

const addNewRoom = () => {
  let _isRoomExist = isRoomExist(newRoomTitle.value);
  console.log('addNewRoom', newRoomTitle.value, _isRoomExist)
  if (newRoomTitle.title != '' && _isRoomExist == false) {
    store.commit('rooms/addRoom', newRoomTitle.value);
    closeAddingRoomPanel();
  } else {
    console.log('room exist', newRoomTitle.value);
  }
}

const handleSelectRoom = async (index, indexPath) => {
  if (store.state.rooms.list[index] == undefined)
    return;
  await store.dispatch('rooms/getMessageHistory', store.state.rooms.list[index].name);
  await store.commit('rooms/setCurrentRoom', store.state.rooms.list[index].name);
  await store.commit('rooms/setNewMessagesInRooms', {room: store.state.rooms.list[index].name, unread: false});
}

const isMessagesInRoomUnreaded = (index) => {
  if (store.state.rooms.list == undefined || store.state.rooms.newMessagesInRooms == undefined)
    return false;

  let room = store.state.rooms.list[index].name;
  return store.state.rooms.newMessagesInRooms[room];
};

</script>

<style scoped>
  .container {
    background-color: rgb(212, 106, 106);
  }

  .new-room-panel {
    height: 5%;
    background-color: rgb(185, 72, 72);
  }

  .adding-room-panes-first, .adding-room-panes-second {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding-left: 0.5em; */
    /* padding-right: 0.5em; */
    background-color: rgb(110, 37, 37);
  }

  .rooms-label {
    font-size: 1.5vmin;
  }

  .el-icon-plus {
    border: none;
    background-color: transparent;
    font-size: 2vmin;
    padding: 0;
  }

  .rooms-list-panel {
    height: 95%;
    background-color: rgb(163, 44, 44);
  }

  .input-new-room-title {
    width: 75%;
  }
  :deep() .el-input__count {
    font-size: 1.2vmin;
  }
  :deep() .el-input__inner {
    font-size: 1.5vmin;
    height: 3vmin !important;
  }

  .el-icon-check, .el-icon-close {
    background-color: transparent;
    border: none;
    padding: 0;
    font-size: 2vmin;
  }
</style>