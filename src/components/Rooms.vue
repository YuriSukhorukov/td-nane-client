<template>
  <div class="container">
    <List class="rooms-list" />
  </div>
</template>

<script setup>
import List from './Rooms/List.vue';
import {computed, reactive, ref} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const username = computed(() => {
  return store.state.session?.username;
});
</script>

<style scoped>
  .rooms-list {
    width: 100%;
    height: 100%;
  }
</style>