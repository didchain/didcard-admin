import axiosProxy from './did-proxy.js';

import ApiError from '../errors/api-error';

import { ILLEGAL_PARAMS_FORMAT, TOKEN_VERIFY_FAIL } from './did-error-codes';

/**
 * result_code: 3, message: "json string error"
 *
 */

const DID_APIS = {
  getAuthToken: '/api/auth/token',
  verifyToken: '/api/auth/verify',
  getCardList: '/api/user/listUser',
  addCardItem: '/api/user/add',
  delCardItem: '/api/user/del',
  getCardTotal: '/api/user/count',
  listCards4Add: '/api/user/listUser4Add',
};

/**
 *
 * @returns
 */
export const getRandom = async () => {
  const response = await axiosProxy.get(DID_APIS.getAuthToken);
  if (!response) throw new ApiError('get random fail');
  return response;
};

/**
 *
 * @param {String} sig
 * @param {string} accessToken
 * @returns String accessToken
 */
export const verifyToken = async (sig, accessToken) => {
  // if(!sig)
  const paramsData = {
    sig: sig,
    acces_token: accessToken,
  };

  const response = await axiosProxy.post(DID_APIS.verifyToken, paramsData);
  const { result_code, message, access_token } = response;
  if (result_code === 1)
    throw new ApiError('token 校验未通过', TOKEN_VERIFY_FAIL, message);
  if (result_code === 3)
    throw new ApiError('参数格式不正确', ILLEGAL_PARAMS_FORMAT, {
      result_code,
      message,
    });

  return access_token;
};
