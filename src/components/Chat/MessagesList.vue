<template>
  <div class="wrapper">
    <el-container v-loading="isHistoryLoading" class="el-container-messages-list">
      <!-- Messages -->
      <div v-if="!isHistoryEmpty">
        <!-- <Message v-for="message in messages" created="dssdsd" sender="sdsds" text="sdsds" /> -->
        <!-- <div class="el-icon-chat-round"></div> -->
        

        <div v-if="!isHistoryEmpty">
          <!-- <div v-for="message in messages"> -->
            <Message v-for="message in messages" created="message.created" sender="message.sender" text="message.text" />
            <!-- {{message.created}} : {{message.sender}} : {{message.text}} -->
          <!-- </div> -->
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
  // console.log(store.state.rooms.history ? store.state.rooms.history[0].text : undefined);
  return store.state.rooms.history ? store.state.rooms.history : null;
});

</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: green;
}
.el-container-messages-list {
  width: 100%;
  height: inherit;
}
</style>