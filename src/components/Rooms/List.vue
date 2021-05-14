<template>
  <div class="container">
    <div class="new-room-panel">
      <div v-if="stepAddingRoom == FIRST_STEP" class="adding-room-panel-first">
        <span class="rooms-label">Rooms</span>
        <el-button class="el-icon-plus" @click="openAddingRoomPanel" />
      </div>
      <div v-else-if="stepAddingRoom == SECOND_STEP" class="adding-room-panel-second">
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
      <el-menu class="el-menu-vertical-demo" 
        default-active="null" 
        @select="handleSelectRoom" 
        :collapse="false"
      >
        <el-menu-item v-for="(room, index) in roomsList" :index="index">
          <template #title>
            <span>
              <span class="room-icon"># </span> 
              {{room.name}}
            </span>
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
const newRoomTitle = ref('');

const roomsList = computed(() => {
  return store.state.rooms.list;
});

const maxRoomTitleLength = computed(() => {
  return store.state.session.settings?.max_room_title_length;
});

const openAddingRoomPanel = () => {
  stepAddingRoom.value = SECOND_STEP;
}

const closeAddingRoomPanel = () => {
  newRoomTitle.value = '';
  stepAddingRoom.value = FIRST_STEP;
}

const checkRoomExist = (roomTitle) => {
  return store.state.rooms.list.find(el => el.name == roomTitle) != undefined;
}

const addNewRoom = () => {
  let isRoomExist = checkRoomExist(newRoomTitle.value);
  if (newRoomTitle.value != '' && isRoomExist == false) {
    store.commit('rooms/addRoom', newRoomTitle.value);
    closeAddingRoomPanel();
  }
}

const handleSelectRoom = async (index, indexPath) => {
  if (store.state.rooms.list[index] == undefined) {
    return;
  }
  await store.dispatch('rooms/getMessageHistory', store.state.rooms.list[index].name);
  await store.commit('rooms/setCurrentRoom', store.state.rooms.list[index].name);
  await store.commit('rooms/setNewMessagesInRooms', {room: store.state.rooms.list[index].name, unread: false});
}

const isMessagesInRoomUnreaded = (index) => {
  if (store.state.rooms.list == undefined || store.state.rooms.newMessagesInRooms == undefined) {
    return false;
  }
  let room = store.state.rooms.list[index].name;
  return store.state.rooms.newMessagesInRooms[room];
};

</script>

<style scoped>
.container {
  border-right: var(--border-grey-solid-1px);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.new-room-panel {
  height: 5%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.adding-room-panel-first, .adding-room-panel-second {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rooms-label {
  font-size: 1.5vmin;
  padding-left: 1.5vmin;
  word-break: break-word;
}

.room-icon {
  color: var(--color-grey);
}

.el-icon-plus {
  border: none;
  background-color: transparent;
  font-size: 2vmin;
  padding: 0;
  padding-right: 1.25vmin;
}

.rooms-list-panel {
  height: 95%;
  overflow-y: auto;
}

.input-new-room-title {
  width: 75%;
  padding-left: 0vmin;
  resize: none;
}

:deep() .el-input__inner {
  height: 2.5vmin !important;
  border-radius: 0px;
}

:deep() .el-input {
  line-height: 0px;
  padding-left: 1vmin;
}

.el-icon-check, .el-icon-close {
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  padding-left: 0.5vmin;
  padding-right: 0.5vmin;
  font-size: 1.5vmin;
}

.el-menu-vertical-demo {
  overflow-y: auto;
  border-right: none;
}

.el-icon-message-solid {
  font-size: 1.25vmin;
  color: var(--color-grey);
}

:deep() .el-menu-item {
  box-sizing: border-box;
  word-break: break-all;
  height: inherit;
  white-space: normal;
  font-size: 1.25vmin;
  padding-right: 1vmin;
  padding-left: 1vmin;
}
</style>