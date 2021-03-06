import axios from "axios";
import {API_REST_BASE} from '../../config';

export default {
  getSettings: async () => {
    try {
      const resp = await axios.get(`${API_REST_BASE}/api/settings`);
      return resp.data.result;
    } catch (err) {
      console.error(err.message);
    }
  }
}