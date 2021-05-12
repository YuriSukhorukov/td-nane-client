import api from '../api';

const state = {
  settings: null,
  connected: false,
  error: null,
  username: null,
};

const getters = {};

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
    await api.socket.connect({username});
    state.commit('setUsername', username);
    state.commit('setConnected', true);
  },

  async disconnect(state) {
    await api.socket.disconnect();
    state.commit('setConnected', false);
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