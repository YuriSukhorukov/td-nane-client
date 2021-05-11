<template>
  <div class="container">
    <div class="header-container">
      <span class="sender">{{sender}}</span>
      <span class="created">{{getFormatedDate(created)}}</span>
    </div>
    <div class="main-container">
      <span class="text">{{text}}</span>
    </div>
    <div class="footer-container">
      <span class="created">{{getFormatedDate(created)}}</span>
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';

defineProps({
  text: String, 
  created: String,
  sender: String,
})

const getFormatedDate = (date) => {
  var ps = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" }
  const dateString = new Date(ps).toLocaleDateString(undefined, options);
  const hours = ps.getHours();
  const minutes = ps.getMinutes() == '0' ? '00' : ps.getMinutes();
  const dateFormated = `${dateString} ${hours}:${minutes}`;
  return dateFormated;
}

</script>

<style scoped>
  .container {
    width: 100%;
    height: 10vh;
    margin-bottom: 1.5vmin;
  }

  .header-container {
    width: 100%;
    height: 20%;
    display: flex;    
  }

  .main-container {
    width: 100%;
    height: 60%;
  }

  .sender {
    padding-top: 1.5vmin;
    padding-left: 1.5vmin;
    word-break: break-word;
    font-weight: 900;
  }

  .text, .created {
    padding-left: 1.5vmin;
    word-break: break-word;
  }

  .text, .sender, .created {
    font-size: 1.25vmin;
    display: inline-block;
  }

  .text {
    padding-top: 0.5vmin;
    padding-bottom: 0.5vmin;
  }

  .created {
    color: rgb(194, 194, 194);
    padding-top: 1.5vmin;
  }

  .footer-container {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
  }
</style>