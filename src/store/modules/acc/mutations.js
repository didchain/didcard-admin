import * as types from './mutation-types';

export default {
  [types.SET_LOGIN_USERNAME](state, username = '') {
    state.username = username;
  },
};
