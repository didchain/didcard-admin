import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

import { MDI_ICONS } from '@lib/mdi-icons.js';
import { DEF_DRAWER_POS } from './mod-cnsts';

export default {
  namespaced: true,
  state: {
    icons: MDI_ICONS,
    globalDense: true,
    navDrawerShow: true,
    drawerPosition: DEF_DRAWER_POS,
    fullScreenState: false,
    navMini: false,
  },
  actions,
  getters: {
    icons: (state) => state.icons,
    toolbarDense: (state) => state.globalDense,
    drawerPosition: (state) => state.drawerPosition,
    navDrawerShow: (state) => state.navDrawerShow,
    navDrawerRight: (state) => state.drawerPosition === 'right',
    navMini: (state) => Boolean(state.navMini),
    fullScreenState: (state) => state.fullScreenState,
    ...getters,
  },
  mutations,
};
