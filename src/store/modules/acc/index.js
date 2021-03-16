import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
  namespaced: true,
  state: {
    ethAddr: '',
    mainAddr: '',
  },
  actions,
  getters: {
    mainAddr: (state) => state.mainAddr || '',
    ethAddr: (state) => state.ethAddr || '',
    ...getters,
  },
  mutations,
};
