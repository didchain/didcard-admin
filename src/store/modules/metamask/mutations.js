import * as types from './mutation-types';
export default {
  [types.UPD_CHAIN_ID](state, chainId) {
    state.chainId = chainId;
  },
  [types.UPD_SELECTED_ADDRESS](state, address = '') {
    state.selectedAddress = address;
  },
  [types.UPD_METAMASK_ENABLED](state, enabled = false) {
    state.enabled = enabled;
  },
  [types.UPD_METAMASK_ERROR](state, message = '') {
    state.errorMsg = message;
  },
  [types.UPD_METAMASK_CONFLICTS](state, conflicts = []) {
    state.conflicts = conflicts;
  },
};
