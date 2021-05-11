<template>
  <div class="wrapper" v-if="isRoomsLoaded">
    <el-menu default-active="null" @select="handleSelect" class="el-menu-vertical-demo" :collapse="false">
      <div style="
        padding: 25px; 
        font-size: 14px; 
        padding: 0px !important; 
        padding-left: 25px !important;
        padding-right: 10px !important;
        line-height: 56px;
        font-size: 14px;"
      >
        <i class="el-icon-menu"></i>
        <span>Rooms</span>
        <el-button 
          @click="enableAddingNewRoom" 
          style="
            background-color: none; 
            border: none; 
            float: right;" 
          :class="addingRoomIcon"
        />
        <el-button
          v-if="isAddingNewRoom"
          @click="disableAddingNewRoom"
          class="el-icon-close"
          style="
            background-color: none; 
            border: none; 
            float: right;"
        >
        </el-button>
      </div>
      <el-menu-item v-if="isAddingNewRoom">
        <el-input
          v-model="newRoom"
          :maxlength="maxRoomTitleLength"
          show-word-limit 
          placeholder="Room Title" 
          class="input-message"
        />
      </el-menu-item>
      <el-menu-item v-for="(room, index) in list" :index="index">
        <template #title>
          <i class="el-icon-message"></i>
          <span>{{room.name}}</span>
          <div style="float: right">
            <i v-if="isMessagesInRoomUnreaded(index)" class="el-icon-message-solid" />
          </div>
        </template>
      </el-menu-item>

      
    </el-menu>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const handleSelect = async (index, indexPath) => {
  if (store.state.rooms.list[index] == undefined)
    return;
  await store.dispatch('rooms/getMessageHistory', store.state.rooms.list[index].name);
  await store.commit('rooms/setCurrentRoom', store.state.rooms.list[index].name);
  await store.commit('rooms/setNewMessagesInRooms', {room: store.state.rooms.list[index].name, unread: false});
};

const isRoomsLoaded = computed(()=>{
  return list != null;
});

const list = computed(() => {
  return store.state.rooms.list;
});

const isMessagesInRoomUnreaded = (index) => {
  if (store.state.rooms.list == undefined || store.state.rooms.newMessagesInRooms == undefined)
    return false;

  let room = store.state.rooms.list[index].name;
  return store.state.rooms.newMessagesInRooms[room];
};

const isAddingNewRoom = ref(false);
const newRoom = ref('');

const enableAddingNewRoom = () => {
  isAddingNewRoom.value = true;

  if (isAddingNewRoom.value==true) {
    if (newRoom.value != '' && store.state.rooms.list.find(el => el.name == newRoom.value) == undefined) {
      store.commit('rooms/addRoom', newRoom.value);
      disableAddingNewRoom();
    } else {
      console.log('room exist', newRoom.value);
    }
  }
}

const disableAddingNewRoom = () => {
  newRoom.value = '';
  isAddingNewRoom.value = false;
}

const addingRoomIcon = computed(() => {
  return isAddingNewRoom.value == true ? "el-icon-check" : "el-icon-plus";
});

const maxRoomTitleLength = computed(() => {
  return store.state.session.settings?.max_room_title_length;
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.el-menu-vertical-demo {
  width: 100%;
  height: inherit;
}
:deep() .el-menu {
  height: 4vh !important;
  border-right: none;
}

.count-new-messages {
  color: #409EFF; 
  float: right;
  right: 0;
}

.el-icon-message-solid {
  color: inherit;
  color: #909399;
}
</style>