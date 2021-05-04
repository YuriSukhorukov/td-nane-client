import api from '../api';

const state = {
  list: null,
  history: null,
  current: null,
  isHistoryLoading: false,
  newMessageInRoom: null,
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
  },

  clearHystory(state) {
    state.history = null;
  },

  setHistoryLoading(state, isLoading) {
    state.isHistoryLoading = isLoading;
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
      state.commit('clearHystory');
      state.commit('setHistoryLoading', true);
      // setTimeout(async () => {
      //   const resp = await api.rest.rooms.getMessageHistory(name);
      //   state.commit('setMessageHistory', resp);
      //   state.commit('setHistoryLoading', false);
      // }, 2000);
      const resp = await api.rest.rooms.getMessageHistory(name);
      state.commit('setMessageHistory', resp);
      state.commit('setHistoryLoading', false);
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