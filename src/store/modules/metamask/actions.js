import {
  detectingMetamaskEnv,
  checkMultiMetaMaskConflict,
  loginMetamask,
} from '@lib/metamask';
import { getRandom } from '@/libs/api/did-api';
import * as types from './mutation-types';

/**
 *
 * @param {Object} context vuex
 */
export const checkMetaMaskEnv = async ({ commit }) => {
  try {
    const provider = await detectingMetamaskEnv();
    if (provider) {
      const conflicts = checkMultiMetaMaskConflict();
      commit(types.UPD_METAMASK_CONFLICTS, conflicts);
      commit(
        types.UPD_METAMASK_ENABLED,
        provider.isMetaMask && conflicts.length === 0,
      );
      if (conflicts.length === 0) {
        commit(types.UPD_CHAIN_ID, parseInt(window.ethereum.chainId));
        commit(types.UPD_SELECTED_ADDRESS, window.ethereum.selectedAddress);
      }
      commit(types.UPD_METAMASK_ERROR, '');
    } else {
      commit(types.UPD_METAMASK_ENABLED, false);
      commit(types.UPD_METAMASK_ERROR, '需要MetaMask浏览器插件');
    }
  } catch (err) {
    console.log('>>>>checkMetaMaskEnv>>>>>>>>>>>>>>>', err);
    commit(types.UPD_METAMASK_ENABLED, false);
    commit(types.UPD_METAMASK_ERROR, err.message);
  }
};

export const loginUpdateState = async (
  { commit },
  { selectedAddress = '', chainId },
) => {
  commit(types.UPD_CHAIN_ID, chainId);
  commit(types.UPD_SELECTED_ADDRESS, selectedAddress);
};

export const login = async ({ dispatch, commit }) => {
  // if (!state.metamaskEnabled) throw new Error('当前Meta Mask不可用');
  const randomNum = await getRandom();
  const data = await loginMetamask();
  const { chainId, accounts } = data;
  const selectedAddress = accounts[0];
  commit(types.UPD_CHAIN_ID, chainId);
  commit(types.UPD_SELECTED_ADDRESS, selectedAddress);

  return { randomNum, ...data };
};
