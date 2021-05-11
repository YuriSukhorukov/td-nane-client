<template>
  <div class="container">
    <div class="room-title-container">
      <span class="room-title">{{room || 'Room'}}</span>
    </div>
    <div class="chat-container" v-loading="isHistoryLoading">
      <div v-for="message in messages">
        <Message :created="message.created" :sender="message.sender.username" :text="message.text" />
      </div>
    </div>
    <div class="chat-input-message-container">
      <el-input :maxlength="maxMessageLength" show-word-limit placeholder="Send a message to" v-model="text">
        <template #append>
          <el-button :disabled="isSendingDisabled" @click="sendMessage" icon="el-icon-s-promotion" class="button-send-message"></el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import InputMessage from './Chat/InputMessage.vue';
import Message from './Chat/Message.vue';

import {computed, onMounted, watch, nextTick, onUpdated, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const room = computed(() => {
  return store.state.rooms.current;
});
const messages = computed(() => {
  return store.state.rooms.history && store.state.rooms.history[store.state.rooms.current] ? store.state.rooms.history[store.state.rooms.current] : null;
});
const isHistoryLoading = computed(() => {
  return store.state.rooms.isHistoryLoading;
});

const scrollToEndMessageList = async () => {
  var length = document.getElementsByClassName("chat-container")[0].childNodes.length;
  var node = document.getElementsByClassName("chat-container")[0].childNodes[length-2].previousSibling;
  if (node == undefined || node.scrollIntoView == undefined)
    return;
  node.scrollIntoView();
};

watch(messages, async (messages, prevMessages) => {
  nextTick(scrollToEndMessageList);
}, {deep: true});

const text = ref('');
const session = store.state.session;
const rooms = store.state.rooms;

const isSendingDisabled = computed(() => {
  return session.username == null 
      || rooms.current == null 
      || text.value == null 
      || text.value == '';
});

const sendMessage = async () => {
  await store.dispatch('messages/sendMessage', {room: store.state.rooms.current, text: text.value});
  text.value = '';
}

const maxMessageLength = computed(() => {
  return store.state.session.settings?.max_message_length;
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.room-title-container {
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  background-color: rgb(156, 70, 70);
}

.room-title {
  font-size: 1.5vmin;
  padding-left: 1.5vmin;
  word-break: break-word;
  /* background-color: blue; */
}

.chat-container {
  width: 100%;
  height: 90%;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: rgb(192, 113, 113);
}

.chat-input-message-container {
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  background-color: rgb(231, 137, 137);
}



/* :deep() .el-input__inner {
  font-size: 1.5vmin;
  height: 3vmin !important;
} */
/* :deep() .el-input__count {
  font-size: 1.2vmin;
  height: 3vmin !important;
} */

/* :deep() .el-input-group {
  padding-left: 1% !important;
  padding-right: 1% !important;
} */

/* :deep() .el-input__suffix {
  font-size: 1.5vmin;
  padding-left: 1% !important;
  padding-right: 1% !important;
}

:deep() .el-input {
  font-size: 2vmin;
}

:deep() .el-input-group__append {
  font-size: 1.5vmin;
}

:deep() .el-button {
  background-color: transparent;
}

:deep() .el-button:hover {
  background-color: transparent;
  border-color: transparent;
} */
</style>