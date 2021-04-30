import { createStore } from 'vuex';

import messages from './messages'
import rooms from './rooms'
import session from './session'
// import connection from './connection'
// // import users from './users'

const StoreData = {
  modules: {
    messages,
    rooms,
    session,
    // connection/
  }
};

export default createStore(StoreData);