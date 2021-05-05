<template>
  <el-drawer
    title="Log In"
    v-model="drawer"
    direction="ltr"
    :before-close="handleClose">
    <span>Username</span>
    <el-input label="dwqewq" v-model="username" autocomplete="off"></el-input>
    <el-button type="primary" @click="auth(username)">Connect</el-button>
  </el-drawer>
</template>

<script setup>
  import {defineProps, ref, defineEmit} from 'vue';
  

  defineProps({
    drawer: Boolean
  });

  const emit = defineEmit(['auth', 'close']);

  const handleClose = (done) => {
    done();
    emit('close');
  };

  const username = ref('');

  const auth = (username) => {
    emit('auth');
  }
</script>

<style scoped>

</style>