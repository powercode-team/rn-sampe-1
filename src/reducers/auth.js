import { LOG_IN_SUCCESS, LOGOUT_SUCCESS, DETECT_IS_AUTH_DONE } from '../actions/auth';
import { updateTokens, deleteFromStorage } from '../utils/storage';

const initialState = {
  isLoggedIn: false,
  hasToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS: {
      updateTokens(action.payload.accessToken, action.payload.refreshToken).catch(() => {});
      return { ...state, isLoggedIn: true };
    }
    case LOGOUT_SUCCESS: {
      deleteFromStorage('access_token');
      deleteFromStorage('refresh_token');
      return { ...state, isLoggedIn: false };
    }
    case DETECT_IS_AUTH_DONE: {
      return { ...state, hasToken: action.payload.hasToken };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
