export const UIERROR_NAME = 'UIError';

export class UIError extends Error {
  constructor(message, errCode, oricode) {
    super(message || 'Fail');
    this.name = UIERROR_NAME;
    this.errCode = errCode || 'FAIL';
    this.oricode = oricode || '';
  }

  stringfy() {
    JSON.stringify({
      errCode: this.errCode,
      oricode: this.oricode,
      message: this.message,
    });
  }
}

export default UIError;
