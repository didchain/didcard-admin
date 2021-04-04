import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
  namespaced: true,
  state: {
    ethAddr: '',
    mainAddr: '',
    username: '',
  },
  actions,
  getters: {
    username: (state) => state.username,
    mainAddr: (state) => state.mainAddr || '',
    ethAddr: (state) => state.ethAddr || '',
    ...getters,
  },
  mutations,
};
