<template>
  <div class="container">
    <div class="room-title-container">
      <span class="room-title">
        <span class="room-icon">#</span> 
        {{room || 'Room'}}
      </span>
    </div>
    <div class="chat-container" v-loading="isHistoryLoading">
      <div class="info-container" v-if="isHistoryLoading==false && isHistoryEmpty==true">
        <div class="info-message-history-empty">Message history is empty </div>
      </div>
      <div v-else v-for="message in messages">
        <Message :created="message.created" :sender="message.sender.username" :text="message.text" />
      </div>
    </div>
    <div class="chat-input-message-container">
      <el-input class="input-message"
        @keyup.enter="sendMessage"
        :maxlength="maxMessageLength" 
        show-word-limit 
        placeholder="Input message" 
        v-model="text" 
      />
      <el-button class="button-send-message"
        :disabled="isSendingDisabled" 
        @click="sendMessage" 
        icon="el-icon-s-promotion" 
      />
    </div>
  </div>
</template>

<script setup>
import Message from './Chat/Message.vue';

import {computed, watch, nextTick, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const text = ref('');
const session = store.state.session;
const rooms = store.state.rooms;

const room = computed(() => {
  return store.state.rooms.current;
});

const messages = computed(() => {
  return store.state.rooms.history && store.state.rooms.history[store.state.rooms.current] 
       ? store.state.rooms.history[store.state.rooms.current] 
       : null;
});

const isHistoryLoading = computed(() => {
  return store.state.rooms.isHistoryLoading;
});

const isSendingDisabled = computed(() => {
  return session.username == null 
      || rooms.current == null 
      || text.value == null 
      || text.value == '';
});

const maxMessageLength = computed(() => {
  return store.state.session.settings?.max_message_length;
});

const isHistoryEmpty = computed(() => {
  return store.state.rooms.history == null 
      || store.state.rooms.history[store.state.rooms.current] == null 
      || store.state.rooms.history[store.state.rooms.current].length == 0;
});

const scrollToEndMessageList = () => {
  let length = document.getElementsByClassName("chat-container")[0].childNodes.length;
  if (length > 1) {
    return;
  }
  let node = document.getElementsByClassName("chat-container")[0].childNodes[length-2];
  if (node == undefined) {
    return;
  }
  let targetNode = node.previousSibling;
  if (targetNode == undefined || targetNode.scrollIntoView == undefined) {
    return;
  }
  targetNode.scrollIntoView();
};

const sendMessage = async () => {
  await store.dispatch('messages/sendMessage', {room: store.state.rooms.current, text: text.value});
  text.value = '';
};

watch(messages, async (messages, prevMessages) => {
  nextTick(scrollToEndMessageList);
}, {deep: true});
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
  border-bottom: solid 1px #e6e6e6;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.room-title {
  font-size: 1.5vmin;
  padding-left: 1.5vmin;
  word-break: break-word;
}

.room-icon {
  color: rgb(194, 194, 194)
}

.chat-container {
  width: 100%;
  height: 90%;
  overflow-y: auto;
  scroll-behavior: smooth;
  box-shadow: inset rgba(149, 157, 165, 0.2) 2px 2px 10px;
}

.info-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-message-history-empty {
  font-size: 1.5vmin;
  color: rgb(194, 194, 194);;
}

.chat-input-message-container {
  width: 100%;
  height: 5%;
  display: flex;
  overflow-y: auto;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  border-top: solid 1px #e6e6e6;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.input-message {
  width: 95%;
  padding-left: 0vmin;
  padding-right: 0vmin;
  resize: none;
}

:deep() .el-input__inner {
  height: 2.5vmin !important;
  border-radius: 0px;
}

:deep() .el-input {
  line-height: 0px;
}

.button-send-message {
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  padding-left: 0.5vmin;
  padding-right: 0.5vmin;
  font-size: 1.5vmin;
}

.button-send-message:hover, select {
  background-color: transparent;
}
</style>