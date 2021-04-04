import UIError from '@lib/UIError';
import { loginMetamask } from '@lib/metamask';
import { getRandom, verifyToken } from '@/libs/api/did-api';

import { getTokenApi } from '@/libs/api/did-demo';
import { signToken, sign4Login } from '@/libs/web3js/sign.js';
import * as types from './mutation-types';

export const login = async ({ dispatch, commit }) => {
  const did = 'did94Yof3BpmttjrSbPMsLqZjYwTfPgFPgZJRW7XK2fdTcL';
  const randomResp = await getTokenApi();
  const { authUrl, randomToken } = randomResp;

  // const random = await getRandom();
  const ethData = await loginMetamask();
  const { chainId, accounts = [] } = ethData;
  const selectedAddress = accounts.length ? accounts[0] : '';
  await dispatch('metamask/loginUpdateState', {
    chainId: parseInt(chainId),
    selectedAddress,
  });

  console.log('>loginUpdateState>>>>>>>>>>>>>>', ethData);
  /**
   * 1 signature : sigData[sig,token,address]
   */
  const c = {
    authUrl,
    randomToken,
    did,
  };
  const sigData = await sign4Login(c, selectedAddress);
  // const verifyData = await verifyToken(sigData.sig, random);
  console.log('>verifyData>>>>>>>>>>>>>>', sigData);
  const username = 'mockAdmin';
  const role = 'user';
  await dispatch('acc/setUsername', username);
  await dispatch('auth/loadNavMenus', role);
  commit(types.UPD_ACCESS_ROLE, role);
  commit(types.UPD_ACCESS_TOKEN, verifyData);

  return Promise.resolve({
    status: 1,
    message: 'success',
    data: {
      accessToken: verifyData,
      role: role,
      selectedAddress,
    },
  });
};

export const siginSaveState = async ({ dispatch, commit }, authState) => {
  const { did, username, role, accessToken } = authState;
  await dispatch('acc/setUsername', username);
  // TODO 如果没有给默认 user
  if (role !== 'admin' && role !== 'user') {
    role = 'user';
  }
  await dispatch('auth/loadNavMenus', role);
  commit(types.UPD_ACCESS_ROLE, role);
  commit(types.UPD_ACCESS_TOKEN, accessToken);
  return Promise.resolve({
    status: 1,
    message: 'success',
    data: {
      role,
      did,
      username,
    },
  });
};

export const logout = async ({ commit }) => {
  commit(types.UPD_ACCESS_ROLE, '');
  commit(types.UPD_ACCESS_TOKEN, '');
};
