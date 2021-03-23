import { UNKNOW_ERROR } from './error-codes';

/**
 *
 */
export class ApiError extends Error {
  /**
   *
   * @param {String} message
   * @param {String} errCode
   * @param {any} origin the response origin error info
   */
  constructor(message = 'Unknow error', errCode = UNKNOW_ERROR, origin) {
    super(message);
    this.name = 'ApiError';
    this.message = message;
    this.errCode = errCode;
    this.origin = origin || '';
  }

  jsonify() {
    return {
      errCode: this.errCode,
      errMessage: this.message,
    };
  }
}

ApiError.ErrorName = 'ApiError';

export default ApiError;
