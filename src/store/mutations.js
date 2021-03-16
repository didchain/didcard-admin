import * as types from './mutation-types';

export default {
  [types.UPD_ACCESS_ROLE]: (state, role) => {
    state.accessRole = role;
  },
  [types.UPD_ACCESS_TOKEN]: (state, token) => {
    state.accessToken = token;
  },
};
