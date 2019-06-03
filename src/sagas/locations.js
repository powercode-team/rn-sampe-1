import { takeLatest, call, put } from 'redux-saga/effects';
import {
  ADD_USER_LOCATION,
  addUserLocationSuccess,
  addUserLocationFailure,
  FETCH_USER_LOCATIONS,
  fetchUserLocationsSuccess,
  fetchUserLocationsFailure,
  SET_LOCATION_RADIUS,
  setLocationRadiusSuccess,
  setLocationRadiusFailure,
  DELETE_USER_LOCATION,
  deleteUserLocationSuccess,
  deleteUserLocationFailure,
} from '../actions/locations';
import { fetchAPI } from '../utils/api';

function* addLocationSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/add_location_preference', 'POST', payload.body);
    if (response.status_code === 201) {
      yield put(addUserLocationSuccess(response.payload));
      payload.afterRequest(null);
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(addUserLocationFailure());
    payload.afterRequest(error);
  }
}

function* fetchLocationsSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/location/get_location_preferences', 'GET');
    if (response.status_code === 200) {
      yield put(fetchUserLocationsSuccess(response.payload));
      if (payload.afterRequest) payload.afterRequest();
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(fetchUserLocationsFailure());
    if (payload.afterRequest) payload.afterRequest(error);
  }
}

function* setLocationRadiusSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/change_distance_for_location_preferences', 'PUT', payload.body);
    if (response.status_code === 200) {
      yield put(setLocationRadiusSuccess(payload.body));
      payload.afterRequest();
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(setLocationRadiusFailure());
    payload.afterRequest(error);
  }
}

function* deleteLocationSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, `/location/delete/id=${payload.locationId}`, 'DELETE');
    if (response.status_code === 200) {
      yield put(deleteUserLocationSuccess(payload.locationId));
      payload.afterRequest();
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(deleteUserLocationFailure());
    payload.afterRequest(error);
  }
}

function* locationsSaga() {
  yield takeLatest(ADD_USER_LOCATION, addLocationSaga);
  yield takeLatest(FETCH_USER_LOCATIONS, fetchLocationsSaga);
  yield takeLatest(SET_LOCATION_RADIUS, setLocationRadiusSaga);
  yield takeLatest(DELETE_USER_LOCATION, deleteLocationSaga);
}

export default locationsSaga;
