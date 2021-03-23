import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
  namespaced: true,
  state: {
    chainId: 0x0,
    selectedAddress: '',
    enabled: false,
    errorMsg: '',
    conflicts: [],
  },
  actions,
  getters: {
    chainId: (state) => state.chainId,
    metamaskEnabled: (state) => state.enabled,
    metamaskError: (state) => state.errorMsg,
    selectedAddress: (state) => state.selectedAddress || '',
    conflicts: (state) => state.conflicts || [],
    ...getters,
  },
  mutations,
};
