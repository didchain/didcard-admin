import * as types from './mutation-types';
export default {
  [types.UPD_FULLSCREEN_STATE]: (state, fullscreen) => {
    state.fullScreenState = Boolean(fullscreen);
  },
};
