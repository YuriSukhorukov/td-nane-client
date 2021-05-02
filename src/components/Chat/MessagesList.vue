<template>
  <div class="wrapper">
    <el-container v-loading="isHistoryLoading" class="el-container-messages-list">
      <div v-if="!isHistoryEmpty">
        <div v-for="message in messages">
          <Message :created="message.created" :sender="message.sender.username" :text="message.text" />
        </div>
      </div>
    </el-container>
  </div>
</template>

<script setup>
import {onMounted, computed} from 'vue';
import {useStore} from 'vuex';
import Message from './Message.vue';

const store = useStore();

const isHistoryEmpty = computed(() => {
  return store.state.rooms.history == null && store.state.rooms.isHistoryLoading;
});
const isHistoryLoading = computed(() => {
  return store.state.rooms.isHistoryLoading;
});
const messages = computed(() => {
  return store.state.rooms.history ? store.state.rooms.history : null;
});

</script>

<style scoped>
.wrapper {
  width: 100%;
}
.el-container-messages-list {
  width: 100%;
  height: inherit;
  overflow: scroll;
}
</style>