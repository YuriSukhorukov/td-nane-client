<template>
  <div class="wrapper">
    <div class="header">
      <span class="name">
        {{sender}}
      </span>
      <div class="space-left"/>
      <span class="time">
        {{getFormatedDate(created)}}
      </span>
    </div>
    <p class="message">
      {{text}}
    </p>
  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue';

const getFormatedDate = (date) => {
  var ps = new Date(date)  ;
  ps = ps.toDateString() + " " + ps.getHours() + ":"+ ps.getMinutes() + " hrs";
  return ps;
}

defineProps({
  text: String, 
  created: String,
  sender: String,
})
</script>

<style scoped>
  .wrapper {
    /* background-color: rgb(0, 183, 255); */
    /* border: 1px solid #ebeef5; */
    background-color: white;
    /* border-radius: 5px; */
    padding: 10px;
    margin: 20px 0;
    width: 500px;

    /* border-top: 1px solid #ebeef5; */
    /* border-bottom: 1px solid #ebeef5; */
  }
  .header {
    clear: both;
    display: flex;
    /* border-bottom: 1px solid #ebeef5; */
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
  }
</style>