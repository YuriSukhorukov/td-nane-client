<template>
  <div class="wrapper">
    <div class="message">
      {{created}} : {{sender}} : {{text}}
    </div>
    
    <!-- qwewqewqewqe {{created}} -->
  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';

defineProps({
  text: String, 
  created: String,
  sender: String,
})
</script>

<style scoped>
  .wrapper {
    /* width: 100px; */
    background-color: rgb(0, 183, 255)
  }
  .message {
    /* width: 50vw; */
    height: 5vh;
  }
</style>