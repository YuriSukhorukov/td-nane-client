import api from '../api';

const state = {
  settings: null,
  connected: false,
  error: null,
  username: null,
};

const getters = {
  // displayMessages: state => state.chatMessages
};
const mutations = {
  setSettings(state, data) {
    state.settings = data;
  },
  setConnected(state, message) {
    state.connected = message;
  },
  setError(state, error) {
    state.error = error;
  },
  setUsername(state, username) {
    state.username = username;
  }
};
const actions = {
  async getSettings(state) {
    try {
      const resp = await api.rest.settings.getSettings();
      state.commit('setSettings', resp);
    } catch (err) {
      console.log(err);
    }
  },
  async connect(state, username) {
    // TODO добаить сохранение ошибки в state.error
    await api.socket.connect({username: state.username});
    state.commit('setUsername', username);
    state.commit('setConnected', true);
  },

  connectionOpened({ commit }) {
    commit('setConnection', true);
  },
  connectionClosed({ commit }) {
    commit('setConnection', false);
  },
  connectionError({ commit }, error) {
    commit('setError', error);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};