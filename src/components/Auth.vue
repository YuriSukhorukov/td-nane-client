<template>
  <el-drawer 
    :modal="false"
    size="20%"
    title="Log In"
    v-model="drawer"
    direction="ltr"
    :before-close="handleClose"
  >
    <span>Username</span>
    <el-input :maxlength="maxUsernameLength" show-word-limit label="dwqewq" v-model="username" autocomplete="off"></el-input>
    <el-button type="primary" @click="auth(username)">Connect</el-button>
  </el-drawer>
</template>

<script setup>
  import {defineProps, ref, defineEmit, computed} from 'vue';
  import {useStore} from 'vuex';

  const store = useStore();

  defineProps({
    drawer: Boolean
  });

  const emit = defineEmit(['auth', 'close']);

  const handleClose = (done) => {
    done();
    emit('close');
  };

  const username = ref('');

  const auth = async (username) => {
    await store.dispatch('session/connect', username);
    await store.dispatch('rooms/receiveStreamMessages');
    emit('auth');
  }

  const maxUsernameLength = computed(() => {
    return store.state.session.settings?.max_username_length;
  });
</script>

<style scoped>
  :deep() .el-drawer.ltr {
    width: 20% !important;
  }
</style>