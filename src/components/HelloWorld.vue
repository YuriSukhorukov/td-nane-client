<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <!-- <button @click="increment()">count is: {{ count }}</button> -->
  <!-- <div v-for="m in messages">{{m}}</div> -->
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>
import {defineProps, computed, onMounted} from 'vue';
import {useStore} from 'vuex';

    const store = useStore();
    // const count = computed(() => store.state.messages.count);
    
    // const increment = () => store.commit('messages/increment');
    // const decrement = () => store.commit('messages/decrement');

    onMounted(async ()=>{
      await store.dispatch('session/getSettings');
      await store.dispatch('rooms/getRoomsList');
      await store.dispatch('rooms/getMessageHistory', store.state.rooms.list[0].name);
      await store.dispatch('session/connect', 'user_name');
      await store.dispatch('rooms/receiveStreamMessages');
      // await store.dispatch('messages/sendMessage', '!@##$#$ some message');
      console.log(store.state.session.settings.max_message_length);
      console.log(store.state.rooms.list[0].last_message.created);
      console.log(store.state.rooms.history);
    })
// return {
//   count: 0
// }
  // const count = ref('value': 10);
  // export default {
  //   props: {
  //     msg: String
  //   },
  //   data: () => {
  //     return {
  //       count: 0,
  //       // messages: this.$store.messages
  //     }
  //   },
  //   computed: {
  //       messages: () => {
  //         return this.$store.messages;
  //       }   
  //   },
  //   created: () => {
  //     console.log('!');
  //     console.log(this.messages)
  //   }
  // }
  // import { defineProps, reactive } from 'vue'
   defineProps({
    msg: String
  })
 
</script>

<style scoped>
  a {
    color: #42b983;
  }
</style>
