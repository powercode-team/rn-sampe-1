import { takeLatest, put, call } from 'redux-saga/effects';
import {
  SIGN_UP_REQUEST,
  signUpSuccess,
  signUpError,
  CONFIRM_HR_MEMBERSHIP,
  hrMembershipSuccess,
  hrMembershipFailure,
} from '../actions/signUp';
import { fillUserProfile, updateUser } from '../actions/user';
import { BASE_URL } from '../utils/api';
import { loginSuccess } from '../actions/auth';

const postRequest = (body) => {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify(body),
  };
  return fetch(`${BASE_URL}/user/registration/`, options);
};

function* sendSignUpData(data) {
  const { body, afterRequest } = data.payload;
  try {
    const response = yield call(postRequest, body);
    const parsedResponse = yield response.json();
    if (parsedResponse.status_code === 201) {
      const tokens = {
        accessToken: parsedResponse.payload.access_token,
        refreshToken: parsedResponse.payload.refresh_token,
      };
      yield put(signUpSuccess());
      yield put(fillUserProfile(parsedResponse.payload));
      yield put(loginSuccess(tokens));
      afterRequest(null);
    } else if (
      parsedResponse.status_code === 400 &&
      parsedResponse.message &&
      parsedResponse.message.includes('duplicate key value') &&
      parsedResponse.message.includes('username')
    ) {
      throw new Error('Username is already taken. Please try again');
    } else {
      yield put(signUpError());
      afterRequest(parsedResponse);
    }
  } catch (error) {
    // console.log('error', error);
    afterRequest(error);
  }
}

function checkHrCode(body) {
  const options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'POST',
    body: JSON.stringify(body),
  };
  return fetch(`${BASE_URL}/user/hr/exists`, options);
}

function* hrMembershipSaga({ payload }) {
  try {
    const response = yield call(checkHrCode, payload.body);
    if (response.status === 200) {
      if (payload.isFromSettings) {
        yield put(updateUser({ is_hr: true }, () => payload.afterRequest(null)));
      } else {
        yield put(hrMembershipSuccess());
        payload.afterRequest(null);
      }
    }
    if (response.status === 400) {
      yield put(hrMembershipFailure());
      throw Error('Hr code does not exist');
    }
  } catch (error) {
    // console.log('error during checking hr code', error);
    payload.afterRequest(error);
  }
}

function* signUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, sendSignUpData);
  yield takeLatest(CONFIRM_HR_MEMBERSHIP, hrMembershipSaga);
}

export default signUpSaga;
