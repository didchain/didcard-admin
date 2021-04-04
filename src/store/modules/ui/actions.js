import * as types from './mutation-types';
import { SCAN_SIGIN_MODE, METAMASK_SIGIN_MODE } from './mod-cnsts';

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

/**
 *
 * @param {*} param0
 * @param {String} mode
 */
export const setSigninMode = async ({ commit }, mode) => {
  if (!mode || (mode !== SCAN_SIGIN_MODE && mode !== METAMASK_SIGIN_MODE)) {
    throw new Error('Parameter mode illegal. mode : ' + mode);
  }

  commit(types.UPD_SIGIN_MODE, mode);
};
