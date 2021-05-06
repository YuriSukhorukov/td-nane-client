<template>
  <div class="wrapper" v-if="isRoomsLoaded">
    <el-menu default-active="null" @select="handleSelect" class="el-menu-vertical-demo" :collapse="false">
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
import {computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const handleSelect = async (index, indexPath) => {
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