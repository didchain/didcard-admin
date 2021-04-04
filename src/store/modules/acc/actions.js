import * as types from './mutation-types';

export const setUsername = async ({ commit }, username = '') => {
  commit(types.SET_LOGIN_USERNAME, username);
};
