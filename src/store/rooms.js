import api from '../api';

const state = {
  list: null,
  history: null,
  current: null,
  isHistoryLoading: false,
  newMessagesInRooms: null,
};

const getters = {};

const mutations = {
  setRoomsList(state, data) {
    state.list = data;
    console.log(state.list)
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

  setEmptyMessageHistory(state, room) {
    if (state.history == null) {
      state.history = {};
    }
    state.history[room] = [];
  },

  pushMessageInHistory(state, message) {
    if (state.history == null) {
      state.history = {};
    }
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
  },

  setNewMessagesInRooms(state, {room, unread}) {
    if (state.newMessagesInRooms == null) {
      state.newMessagesInRooms = {};
    }
    state.newMessagesInRooms[room] = unread;
  },

  addRoom(state, room) {
    state.list.push({name: room});
    if (state.history == null) {
      state.history = {};
    }
    state.history[room] = [];
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
      if (resp != undefined) {
        state.commit('setMessageHistory', resp);
        state.commit('setHistoryLoading', false);  
      } else {
        state.commit('setEmptyMessageHistory', name);
        state.commit('setHistoryLoading', false);  
      }
    } catch (err) {
      console.log(err);
    }
  },

  async receiveStreamMessages(state) {
    let callback = (data) => {
      state.commit('pushMessageInHistory', data);
      if (state.state.current != data.room) {
        state.commit('setNewMessagesInRooms', {room: data.room, unread: true});
      }
      if (state.state.list.find(el => el.name == data.room) == undefined) {
        state.commit('addRoom', data.room);
      }
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