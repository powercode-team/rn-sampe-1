import { takeLatest, call, put } from 'redux-saga/effects';
import firebase from 'react-native-firebase';

import {
  RETRIEVE_DEVICE_TOKEN,
  retrieveDeviceTokenSuccess,
  retrieveDeviceTokenFailure,
  UPDATE_DEVICE_TOKEN,
  updateDeviceTokenSuccess,
  updateDeviceTokenFailure,
} from '../actions/notifications';

import { fetchAPI } from '../utils/api';

function* checkPermissions() {
  const enabled = yield firebase.messaging().hasPermission();
  if (enabled) return;
  try {
    yield firebase.messaging().requestPermission();
  } catch (error) {
    // console.log('Error during requesting firebase permissions');
  }
}

function* retrieveTokenSaga() {
  try {
    const fcmToken = yield firebase.messaging().getToken();
    yield checkPermissions();
    if (fcmToken) {
      const response = yield call(fetchAPI, '/user/update_device_token', 'POST', { device_token: fcmToken });
      if (response.status_code === 200) {
        yield put(retrieveDeviceTokenSuccess());
        // console.log('notification token', fcmToken);
      }
    } else {
      throw new Error('Error during notification token retrieval');
    }
  } catch (err) {
    // console.log(err);
    yield put(retrieveDeviceTokenFailure());
  }
}

function* updateTokenSaga({ payload: { token } }) {
  try {
    yield checkPermissions();
    const response = yield call(fetchAPI, '/user/update_device_token', 'POST', { device_token: token });
    if (response.status_code === 200) {
      yield put(updateDeviceTokenSuccess());
      // console.log('updated notification token', token);
    } else {
      throw new Error('Error during device firebase token update');
    }
  } catch (err) {
    // console.log(err);
    yield put(updateDeviceTokenFailure());
  }
}

function* notificationsSaga() {
  yield takeLatest(RETRIEVE_DEVICE_TOKEN, retrieveTokenSaga);
  yield takeLatest(UPDATE_DEVICE_TOKEN, updateTokenSaga);
}

export default notificationsSaga;
