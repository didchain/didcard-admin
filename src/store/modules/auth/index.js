import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
  namespaced: true,
  state: {
    navMenus: [],
  },
  actions,
  getters: {
    navMenus: (state) => state.navMenus,
    navEmpty: (state) => !state.navMenus || !state.navMenus.length,
    ...getters,
  },
  mutations,
};
