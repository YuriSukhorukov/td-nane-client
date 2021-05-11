<template>
  <div class="container">
    <div class="auth-header-panel">
      <div v-if="stepAuth==FIRST_STEP" class="first-auth">
        <el-button @click="openAuthPanel" icon="el-icon-user" class="button-open-auth-panel" />
        <span class="user-name">{{authorizedUsername || 'Log In'}}</span>
      </div>
      <div v-else-if="stepAuth==SECOND_STEP" class="second-auth">
        <el-input
          class="input-auth-username"
          :maxlength="maxUsernameLength" 
          placeholder="Username" 
          show-word-limit 
          v-model="username" 
          autocomplete="off" 
        />
        <el-button
          class="el-icon-check"
          type="primary" 
          @click="auth(username)"
        />
        <el-button
          class="el-icon-close"
          type="primary" 
          @click="closeAuthPanel"
        />
      </div>
    </div>
  </div>




  <!-- <el-drawer 
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
  </el-drawer> -->
</template>

<script setup>
  import {defineProps, ref, defineEmit, computed} from 'vue';
  import {useStore} from 'vuex';

  const store = useStore();

  // defineProps({
  //   drawer: Boolean
  // });

  // const emit = defineEmit(['auth', 'close']);

  // const handleClose = (done) => {
  //   done();
  //   emit('close');
  // };
  const FIRST_STEP = 1;
  const SECOND_STEP = 2;

  const stepAuth = ref(FIRST_STEP);
  const username = ref('');

  const openAuthPanel = () => {
    stepAuth.value = SECOND_STEP;
  }

  const closeAuthPanel = () => {
    username.value = '';
    stepAuth.value = FIRST_STEP;
  }

  const auth = async (username) => {
    await store.dispatch('session/connect', username);
    await store.dispatch('rooms/receiveStreamMessages');
    stepAuth.value = FIRST_STEP;
    // emit('auth');
  }

  const maxUsernameLength = computed(() => {
    return store.state.session.settings?.max_username_length;
  });

  const authorizedUsername  = computed(() => {
    return store.state.session?.username;
  });
</script>

<style scoped>
.container {
  background-color: rgb(202, 71, 71);
}

.auth-header-panel {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-open-auth-panel {
  border: none;
  background-color: transparent;
  font-size: 3vmin;
  padding: 0;
}

.user-name {
  font-size: 2vmin;
  padding-left: 0.5em;
}

.first-auth, .second-auth {
  width: 100%;
  height: 100%;
  display: flex;
  
  align-items: center;
}

.first-auth {
  justify-content: center;
}

.second-auth {
  justify-content: space-between;
}

.el-icon-check, .el-icon-close {
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 2vmin;
}

.input-auth-username {
  width: 75%;
}

:deep() .el-input__count {
  font-size: 1.2vmin;
}

:deep() .el-input__inner {
  font-size: 1.5vmin;
  height: 3vmin !important;
}
</style>