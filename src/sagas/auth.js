import { takeLatest, put, call } from 'redux-saga/effects';
import { setLanguage } from 'redux-i18n';

import { getFromStorage, saveToStorage } from '../utils/storage';
import {
  LOG_IN,
  loginSuccess,
  loginFailure,
  LOGOUT,
  logoutSuccess,
  logoutFailure,
  RESET_PASSWORD,
  DETECT_IS_AUTH,
  resetPasswordSuccess,
  resetPasswordFailure,
  detectIsAuthDone,
  SET_LANGUAGE,
} from '../actions/auth';

import {
  fetchSeniorityData,
  fetchSkillsData,
  fetchTermsOfUse,
  fetchContractTypesData,
  fetchCategoriesData,
} from './../actions/initialFetches';

import { fillUserProfile } from '../actions/user';
import { BASE_URL } from '../utils/api';

const postRequest = (body, url) => {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify(body),
  };
  if (!body) delete options.body;
  return fetch(`${BASE_URL}${url}`, options);
};

function* loginSaga(data) {
  const { body, afterRequest } = data.payload;
  try {
    const response = yield call(postRequest, body, '/user/login/');
    const parsedResponse = yield response.json();
    if (parsedResponse.status_code === 200) {
      const tokens = {
        accessToken: parsedResponse.payload.access_token,
        refreshToken: parsedResponse.payload.refresh_token,
      };
      yield put(fillUserProfile(parsedResponse.payload));
      yield put(loginSuccess(tokens));
      afterRequest(null);
    } else {
      yield put(loginFailure());
      afterRequest(parsedResponse);
    }
  } catch (error) {
    // console.log('error', error.message);
    afterRequest(error.msg || error.message || error);
  }
}

const deleteRefreshToken = async (token) => {
  try {
    const url = `${BASE_URL}/user/logout/refresh`;
    const customHeaders = new Headers({
      Authorization: `Bearer ${JSON.parse(token)}`,
    });
    const options = {
      method: 'POST',
      headers: customHeaders,
    };
    const response = await fetch(url, options);
    if (response.status === 500) throw new Error('Server responded with 500 status code');
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteAccessToken = async (token) => {
  try {
    const url = `${BASE_URL}/user/logout/access`;
    const customHeaders = new Headers({
      Authorization: `Bearer ${JSON.parse(token)}`,
    });
    const options = {
      method: 'POST',
      headers: customHeaders,
    };
    const response = await fetch(url, options);
    if (response.status === 500) throw new Error('Server responded with 500 status code');
    return response;
  } catch (error) {
    throw error;
  }
};

function* logoutSaga(data) {
  try {
    const afterRequest = data.payload;
    const accessToken = yield call(getFromStorage, 'access_token');
    const accessResponse = yield call(deleteAccessToken, accessToken);
    const refreshToken = yield call(getFromStorage, 'refresh_token');
    const refreshResponse = yield call(deleteRefreshToken, refreshToken);
    if (
      (accessResponse.status === 200 || accessResponse.status === 401) &&
      (refreshResponse.status === 200 || refreshResponse.status === 401)
    ) {
      yield put(logoutSuccess());
      afterRequest(null);
    } else {
      throw new Error('Unexpected server answer');
    }
  } catch (error) {
    // console.log('error during logout', error);
    yield put(logoutFailure());
    data.payload(error); // same as afterRequest
  }
}

const resetPutRequest = (body) => {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'PUT',
    body: JSON.stringify(body),
  };
  return fetch(`${BASE_URL}/user/reset/password/`, options);
};

function* resetPasswordSaga({ payload }) {
  try {
    const response = yield call(resetPutRequest, payload.data);
    // console.log('response during resetting', response);
    const parsedResponse = yield response.json();
    if (parsedResponse.status_code === 200) {
      yield put(resetPasswordSuccess());
      payload.afterRequest(null);
    } else if (parsedResponse.status_code === 400) {
      throw new Error('Profile not found');
    } else {
      throw new Error('Something went wrong during password reset');
    }
  } catch (error) {
    yield put(resetPasswordFailure());
    payload.afterRequest(error.msg || error.messsage || error);
  }
}

function* detectAuthSaga({ payload: { callback } }) {
  try {
    const accessToken = yield call(getFromStorage, 'access_token');
    const hasToken = Boolean(accessToken && accessToken.length);
    yield put(detectIsAuthDone(hasToken));
    callback(hasToken);
  } catch (err) {
    throw err;
  }
}

function* setLanguageSaga({ payload: { lang, callback } }) {
  try {
    // const response = yield call(fetchAPI, '/user/update_language', 'POST', { language_code: lang });
    const body = { language_code: lang };
    const response = yield call(postRequest, body, '/user/update_language');

    const parsedResponse = yield response.json();
    yield put(fetchSeniorityData());
    yield put(fetchSkillsData());
    yield put(fetchContractTypesData());
    yield put(fetchCategoriesData());
    yield put(fetchTermsOfUse(lang));

    yield call(saveToStorage, 'lang', lang);
    // console.log('response', response);
    if (parsedResponse.status_code === 200) {
      yield put(setLanguage(lang));
      callback(null);
    } else {
      throw new Error(response.message || response.msg || 'Error change language');
    }
  } catch (error) {
    // console.log('ERROR changePublicStatusSaga', error);
    callback(error);
  }
}

function* authSaga() {
  yield takeLatest(LOG_IN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(DETECT_IS_AUTH, detectAuthSaga);
  yield takeLatest(SET_LANGUAGE, setLanguageSaga);
}

export default authSaga;
