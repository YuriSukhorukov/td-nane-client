<template>
  <div class="container">
    <div class="header-container">
      <span class="sender">{{sender}}</span><span class="created">{{getFormatedDate(created)}}</span>
    </div>
    <div class="main-container">
      <span class="text">{{text}}</span>
    </div>
    <!-- <div class="footer-container">
      <span class="created">{{getFormatedDate(created)}}</span>
    </div> -->
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
  var ps = new Date(date)  ;
  ps = ps.toDateString() + " " + ps.getHours() + ":"+ ps.getMinutes();
  return ps;
}

</script>

<style scoped>
  .container {
    width: 100%;
    height: 10vh;
    /* background-color: red; */
    margin-bottom: 1.5vmin;
  }

  .header-container {
    width: 100%;
    height: 20%;
    display: flex;    
    /* background-color: rgb(255, 56, 56); */
  }

  .sender {
    /* background-color: blue; */
  }

  .main-container {
    width: 100%;
    height: 60%;
    /* background-color: rgb(255, 160, 160); */
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
    padding-top: 1.5vmin;
    color: rgb(153, 153, 153);
  }

  .footer-container {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    background-color: rgb(255, 98, 98);
  }

  /* .created {
    background-color: blue;
  } */


  /* .wrapper {
    padding: 10px;
    padding-top: 20px;
  }
  .header {
    clear: both;
    display: flex;
  }
  .space-left {
    margin-left: 1em;
  }
  .header, .name {
    color: rgba(var(--sk_primary_foreground,29,28,29),1);
    line-height: 1.46668;
    font-size: 1.5em;
  }
  .header, time {
    color: #aaa;
    line-height: 1.46668;
    font-size: 1em;
  }
  .message {
    width: 50vw;
    word-wrap: break-word;
  } */
</style>