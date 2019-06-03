export const LOG_IN = 'LOG_IN';
export const login = (fields, afterRequest) => ({
  type: LOG_IN,
  payload: {
    body: fields,
    afterRequest,
  },
});

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const loginSuccess = (tokens) => ({
  type: LOG_IN_SUCCESS,
  payload: tokens,
});

export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const loginFailure = () => ({
  type: LOG_IN_FAILURE,
});

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const resetPassword = (fields, afterRequest) => ({
  type: RESET_PASSWORD,
  payload: {
    data: fields,
    afterRequest,
  },
});

const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const resetPasswordFailure = () => ({
  type: RESET_PASSWORD_FAILURE,
});

export const LOGOUT = 'LOGOUT';
export const logout = (afterRequest) => ({
  type: LOGOUT,
  payload: afterRequest,
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const logoutFailure = () => ({
  type: LOGOUT_FAILURE,
});

export const DETECT_IS_AUTH = 'DETECT_IS_AUTH';
export const detectIsAuth = (callback) => ({
  type: DETECT_IS_AUTH,
  payload: {
    callback,
  },
});

export const DETECT_IS_AUTH_DONE = 'DETECT_IS_AUTH_DONE';
export const detectIsAuthDone = (hasToken) => ({
  type: DETECT_IS_AUTH_DONE,
  payload: { hasToken },
});

export const SET_LANGUAGE = 'SET_LANGUAGE';
export const setLanguage = (lang, callback) => ({
  type: 'SET_LANGUAGE',
  payload: { lang, callback },
});
