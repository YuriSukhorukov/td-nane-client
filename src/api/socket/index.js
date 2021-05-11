import {API_WS_BASE} from '../../config';
import uid from '../../utils/uid';

export default {
  listeners: {},

  async connect({username}) {
    return new Promise((res, rej) => {
      this.conn = new WebSocket(`${API_WS_BASE}/ws?name=${username}`);
      this.conn.onopen = res;
      this.conn.onerror = rej;
      this.conn.onmessage = this.onMessage.bind(this);
    });
  },

  async disconnect() {
    return new Promise((res, rej) => {
      this.conn.onclose = (event) => {
        if (event.wasClean) {
          this.conn = null;
          res();
        } else {
          rej();
        }
      };
      this.conn.close(1000);
    })
  },

  onMessage(event) {
    let data = JSON.parse(event.data);
    if (data.text != undefined) {
      Object.keys(this.listeners).forEach(key => this.listeners[key](data));
    } else if (data.id != undefined && this.listeners[data.id] != undefined) {
      this.listeners[data.id](data);
      delete this.listeners[data.id];
    } else if (data.pong) {
      this.listeners.pong(data);
    }
  },

  subscribeMessage(callback) {
    callback.id = uid();
    this.listeners[callback.id] = callback;
  },

  unsubscribeMessage(callback) {
    if (callback.id != undefined && this.listeners[callback.id] != undefined) {
      delete this.listeners[callback.id];
    }
  },

  async sendMessage({room, text}) {
    return new Promise((res, rej) => {
      try {
        const id = uid();
        this.conn.send(JSON.stringify({"room": room, "text": text, "id": id}));
        this.listeners[id] = res;
      } catch (err) {
        rej();
      }
    });
  },

  async ping() {
    return new Promise((res, rej) => {
      try {
        this.listeners.pong = res;
        this.conn.send(JSON.stringify({"ping": true}));
      } catch (e) {
        rej(e);
      }
    });
  }
}