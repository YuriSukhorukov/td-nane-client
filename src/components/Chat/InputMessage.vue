<template>
  <div class="container">
    <el-input :maxlength="maxMessageLength" show-word-limit placeholder="Send a message to" v-model="text" class="input-message">
      <template #append>
        <el-button :disabled="isSendingDisabled" @click="sendMessage" icon="el-icon-s-promotion" class="button-send-message"></el-button>
      </template>
    </el-input>
  </div>
  <div class="container">input</div>
</template>

<script setup>
import { defineComponent, ref, computed } from 'vue';
import {useStore} from 'vuex';

const store = useStore();
const text = ref('');

const sendMessage = async () => {
  console.log(store.state.rooms.current, text.value);
  await store.dispatch('messages/sendMessage', {room: store.state.rooms.current, text: text.value});
  text.value = '';
}

const maxMessageLength = computed(() => {
  return store.state.session.settings?.max_message_length;
});

const session = store.state.session;
const rooms = store.state.rooms;

const isSendingDisabled = computed(() => {
  return session.username == null 
      || rooms.current == null 
      || text.value == null 
      || text.value == '';
});

</script>

<style scoped>
</style>


