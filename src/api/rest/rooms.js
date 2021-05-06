import axios from "axios";
import {API_REST_BASE} from '../../config';

export default {
  getRoomsList: async () => {
    try {
      const resp = await axios.get(`${API_REST_BASE}/api/rooms`);
      return resp.data.result;
    } catch (err) {
      console.log(err);
    }
  },

  getMessageHistory: async (name) => {
    try {
      const resp = await axios.get(`${API_REST_BASE}/api/rooms/${name}/history`);
      return resp.data.result;
    } catch (err) {
      console.log(err);
    }
  }
}