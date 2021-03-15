import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

import { icons } from './mod-cnsts';

export default {
  namespaced: true,
  state: {
    icons,
    globalDense: true,
    navDrawerShow: true,
    drawerPosition: 'left',
  },
  actions,
  getters: {
    icons: (state) => state.icons,
    toolbarDense: (state) => state.globalDense,
    drawerPosition: (state) => state.drawerPosition,
    navDrawerShow: (state) => state.navDrawerShow,
    navDrawerRight: (state) => state.drawerPosition === 'right',
    ...getters,
  },
  mutations,
};
