<template>
  <div class="wrapper">
    <el-container v-loading="isHistoryLoading" class="el-container-messages-list">
      Messages
    </el-container>
  </div>
</template>

<script setup>
import {onMounted, computed} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const isHistoryEmpty = computed(() => {
  return store.state.rooms.history == null && store.state.rooms.isHistoryLoading ;
});
const isHistoryLoading = computed(() => {
  return store.state.rooms.isHistoryLoading;
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