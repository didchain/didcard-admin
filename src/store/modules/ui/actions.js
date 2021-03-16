import * as types from './mutation-types';

export const toggleFullscreen = ({ commit }, fullscreen) => {
  commit(types.UPD_FULLSCREEN_STATE, fullscreen);
};

export const toggleNavMini = ({ commit, state }, mini) => {
  const _cur = Boolean(state.navMini);
  if (typeof mini === 'undefined') {
    commit(types.UPD_NAV_DRAWER_MINI, !_cur);
  } else {
    commit(types.UPD_NAV_DRAWER_MINI, Boolean(mini));
  }
};
