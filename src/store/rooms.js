import api from '../api';

const state = {
  list: null,
  history: null,
  current: null,
};

const getters = {};

const mutations = {
  setRoomsList(state, data) {
    state.list = data;
  },
  
  setMessageHistory(state, data) {
    state.history = data;
  },

  pushMessageInHistory(state, message) {
    state.history.push(message);
  },

  setCurrentRoom(state, room) {
    state.current = room;
  }
};

const actions = {
  async getRoomsList(state) {
    try {
      const resp = await api.rest.rooms.getRoomsList();
      state.commit('setRoomsList', resp);
    } catch (err) {
      console.log(err);
    }
  },

  async getMessageHistory(state, name) {
    try {
      const resp = await api.rest.rooms.getMessageHistory(name);
      state.commit('setMessageHistory', resp);
    } catch (err) {
      console.log(err);
    }
  },

  async receiveStreamMessages(state) {
    let callback = (data) => {state.commit('pushMessageInHistory', data)};
    api.socket.subscribeMessage(callback);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};