import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
let axiosProxy = axios.create({
  timeout: 60000,
});

axiosProxy.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  },
);

/**
 *
 */
axiosProxy.interceptors.response.use(
  (response) => {
    /**
     * response [status,err_msg,err_code,data]
     */
    if (response.status === 200) {
      if (!isProd) console.log(response.request.responseURL, response);
      if (response.data) {
        return Promise.resolve(response.data || null);
      } else {
        return Promise.resolve(response.data || null);
      }
    }
  },
  (err) => {
    if (!err) return Promise.reject(new Error('unknow error.'));
    if (err.response) {
      return Promise.reject(handleNetworkError(err));
    } else {
      // 超时；断网；请求重复被取消；主动取消请求；
      if (axios.isCancel(err)) {
        throw new axios.Cancel(
          err.message || `请求 '${err?.response?.config?.url}' 被取消. `,
        );
      } else if (err.code === 'ECONNABORTED') {
        err.message = '请求超时';
      } else {
        err.message = '请求失败';
      }
    }

    // show tips

    return Promise.reject(err);
  },
);

function handleNetworkError(err) {
  const { status, statusText, data } = err.response;
  if (!status) {
    err.message = statusText || data || 'unknow error.';
    return err;
  }

  switch (status) {
    case 200:
      err.message = '请求错误.';
      break;
    case 401:
      err.message = '未授权，请重新登录(401)';
      break;
    case 403:
      err.message = '拒绝访问(403)';
      break;
    case 404:
      err.message = '请求出错(404)';
      break;
    case 408:
      err.message = '请求超时(408)';
      break;
    case 500:
      err.message = '服务器错误(500)';
      break;
    case 501:
      err.message = '服务未实现(501)';
      break;
    case 502:
      err.message = '网络错误(502)';
      break;
    case 503:
      err.message = '服务不可用(503)';
      break;
    case 504:
      err.message = '网络超时(504)';
      break;
    case 505:
      err.message = 'HTTP版本不受支持(505)';
      break;
    default:
      err.message = '未知错误.';
  }

  return err;
}

export default axiosProxy;
