import * as types from './mutation-types';
export default {
  [types.RELOAD_NAV_MENUS]: (state, menus = []) => {
    state.navMenus = menus;
  },
};
