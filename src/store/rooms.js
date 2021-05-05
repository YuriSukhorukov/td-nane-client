import api from '../api';

const state = {
  list: null,
  history: null,
  current: null,
  isHistoryLoading: false,
  countNewMessagesInRooms: null,
};

const getters = {};

const mutations = {
  setRoomsList(state, data) {
    state.list = data;
  },
  
  setMessageHistory(state, data) {
    if (state.history == null) {
      state.history = {};
    }
    data.forEach(el => {
      if (state.history[el.room] == null) {
        state.history[el.room] = [];
      }
      state.history[el.room].push(el);
    })
  },

  pushMessageInHistory(state, message) {
    if (state.history[message.room] == null) {
      state.history[message.room] = [];
    }
    state.history[message.room].push(message);
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
      const resp = await api.rest.rooms.getMessageHistory(name);
      state.commit('setMessageHistory', resp);
      state.commit('setHistoryLoading', false);
    } catch (err) {
      console.log(err);
    }
  },

  async receiveStreamMessages(state) {
    let callback = (data) => {
      state.commit('pushMessageInHistory', data);
    };
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