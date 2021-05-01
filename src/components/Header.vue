<template>
  <div class="wrapper">
    <div class="logo">
      TADA
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .wrapper {
    position: relative;
    background-color: blue;
  }
  
  .logo {
    margin: 0;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-left: 2vh;
  }
</style>