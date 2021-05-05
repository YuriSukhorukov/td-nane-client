import api from '../api';

const state = {
  sentMessage: null,
};

const getters = {
  history(state) {
    return state.messages;
  }
};
const mutations = {
  setSentMessage(state, data) {
    state.sentMessage = data;
  }
};
const actions = {
  async sendMessage(state, {room, text}) {
    try {
      await api.socket.sendMessage({room, text});
      console.log(room, text);
      // state.commit('setSentMessage', text);
    } catch (err) {
      console.error(err);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
