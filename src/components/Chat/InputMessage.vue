<template>
  <div class="wrapper">
    <el-input maxlength="100" show-word-limit placeholder="Send a message to" v-model="text" class="input-message">
      <template #append>
        <el-button icon="el-icon-s-promotion" class="button-send-message"></el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent ({
  setup() {
    return {
      text: ref(''),
      textarea: ref('')
    }
  }
})
</script>

<style scoped>
  .wrapper {
    /* border: 1px solid #000000;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px; */
  }

  .input-message {
    box-sizing: inherit;
    padding: 0;
  }

  :deep() .el-input__inner {
    height: 4vh !important;
  }

  .button-send-message {
    border: none;
    background-color: none;
  }
</style>


