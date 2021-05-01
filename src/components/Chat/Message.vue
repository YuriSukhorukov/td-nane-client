<template>
  <div class="wrapper">
    {{created}} : {{sender}} : {{text}}
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
    background-color: rgb(0, 183, 255)
  }
</style>