import axios from "axios"

export default {
  getSettings: async () => {
    try {
      const resp = await axios.get('https://nane.tada.team/api/settings');
      console.log(resp.data.result);
      return resp.data.result;
    } catch (err) {
      console.log(err);
    }
  }
}