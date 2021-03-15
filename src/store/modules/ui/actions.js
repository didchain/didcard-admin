import * as types from './mutation-types';

export const toggleFullscreen = ({ commit }, fullscreen) => {
  commit(types.UPD_FULLSCREEN_STATE, fullscreen);
};
