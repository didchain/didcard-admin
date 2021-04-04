import axiosProxy from './did-proxy.js';
import ApiError from '../errors/api-error';

const API_PATHS = {
  getToken: '/api/auth',
  checkVerify: '/api/check',
  checkLogin: '/api/checkLogin',
};

export const getTokenApi = async () => {
  const resp = await axiosProxy.get(API_PATHS.getToken);

  const { auth_url, random_token } = resp;
  return {
    authUrl: auth_url,
    randomToken: random_token,
  };
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const checkLoginedApi = async ({ auth_url, random_token }) => {
  // {
  //   "result_code": 0,
  //   "message": "success",
  //   "data": {
  //       "redir_url": "http://39.99.198.143:60998/index.html",
  //       "signature": {
  //           "content": {
  //               "auth_url": "http://39.99.198.143:60998/api/verify",
  //               "random_token": "9C93zESJrpv4xMet6QVGyRXL3ihyUxyFfj7UM62R2u9V",
  //               "did": "did94Yof3BpmttjrSbPMsLqZjYwTfPgFPgZJRW7XK2fdTcL"
  //           },
  //           "sig": "3Kp27Fx1ivYpMRDpLSFSLj494nPXztv6iHFDUBRg3AK59XGnrqekzm7eXBreSwmNiCZvRgVnTFajceR1HVR4Ev76"
  //       },
  //       "user_desc": {
  //           "name": "hhhhhhh",
  //           "unit_name": "3323",
  //           "serial_number": "112233",
  //           "did": "did94Yof3BpmttjrSbPMsLqZjYwTfPgFPgZJRW7XK2fdTcL"
  //       }
  //   }
  // }
  const resp = await axiosProxy.post(API_PATHS.checkVerify, {
    auth_url: auth_url,
    random_token: random_token,
  });

  return resp;
};
