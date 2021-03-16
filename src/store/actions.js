import detectEthereumProvider from '@metamask/detect-provider';

import { validMetaMaskEnv } from '@lib/metamask/utils.js';
import UIError from '@lib/UIError';
import * as types from './mutation-types';

export const login = async ({ dispatch, commit }) => {
  if (!validMetaMaskEnv())
    throw new UIError('需要MetaMask浏览器插件', 'NO_METAMASK', 0);

  const role = 'admin';
  await dispatch('auth/loadNavMenus', role);
  commit(types.UPD_ACCESS_ROLE, role);
  commit(types.UPD_ACCESS_TOKEN, '123');
};

export const logout = async ({ commit }) => {
  commit(types.UPD_ACCESS_ROLE, '');
  commit(types.UPD_ACCESS_TOKEN, '');
};
