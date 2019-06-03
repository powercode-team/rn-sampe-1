import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  CHANGE_PASSWORD,
  changePasswordSuccess,
  changePasswordFailure,
  UPDATE_USER,
  updateUserSuccess,
  updateUserFailure,
  UPDATE_AVATAR,
  updateAvatarSuccess,
  updateAvatarFailure,
  FETCH_USER_PROFILE,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  FETCH_USER_DATA,
  fetchUserProfile,
  DELETE_USER_AVATAR,
  deleteUserAvatarSuccess,
  deleteUserAvatarFailure,
  DEACTIVATE_ACCOUNT,
  CHANGE_PUBLIC_STATUS,
  changePublicStatusSuccess,
  CHANGE_VACATION_MODE_STATUS,
  changeVacationModeStatusSuccess,
} from '../actions/user';

import { setFilterAccounts } from '../actions/tasksJobs';
import { fetchUserLocations } from '../actions/locations';
import { fetchUserSkills } from '../actions/skills';
import { logout } from '../actions/auth';
import { fetchAPI } from '../utils/api';

function* changePasswordSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/change/password/', 'PUT', payload.data);
    if (response.status_code === 200) {
      yield put(changePasswordSuccess());
      payload.afterRequest();
    } else {
      throw new Error('Something went wrong during password change');
    }
  } catch (error) {
    yield put(changePasswordFailure());
    payload.afterRequest(error);
  }
}

function* updateUserSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/update/', 'PUT', payload.body, { 'Content-Type': 'application/json' });
    if (response.status_code === 200) {
      yield put(updateUserSuccess(response.payload));
      payload.afterRequest(null);
    } else {
      throw new Error(response.message || response.msg || 'Error during user profile update');
    }
  } catch (error) {
    // console.log('error updateing user', error);
    const errorMsg = error.message || error.msg || error;
    if (errorMsg.includes('duplicate key value') && errorMsg.includes('phone')) {
      payload.afterRequest("Phone number you've entered is already taken");
    } else if (errorMsg.includes('duplicate key value') && errorMsg.includes('username')) {
      payload.afterRequest('Username is already taken. Please try again.');
    } else {
      payload.afterRequest(error);
    }
    yield put(updateUserFailure());
  }
}

function* updateAvatarSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/image/upload/', 'POST', payload.body, {
      'Content-Type': 'application/json',
    });
    if (response.status_code === 200) {
      yield put(updateAvatarSuccess(response.payload.file_path));
      payload.afterRequest(null);
    } else {
      throw new Error(response.message || response.msg || 'Error during user avatar update');
    }
  } catch (error) {
    yield put(updateAvatarFailure());
    payload.afterRequest(error);
  }
}

function* fetchUserProfileSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/get_user_info/', 'GET');
    // console.log('FETCH USER PROFILE response:', response);
    if (response.status_code === 200) {
      yield put(fetchUserProfileSuccess(response.payload));

      const { masters, email, id } = response.payload;

      let accounts = masters
        .filter((master) => master.is_active_relation)
        .map((account) => ({ ...account, isChecked: false }));

      if (accounts.length) {
        const myAccount = {
          id,
          email,
          first_name: 'My',
          last_name: 'postings',
          isChecked: false,
        };

        accounts = [myAccount, ...accounts];
      }

      yield put(setFilterAccounts(accounts));

      if (payload.afterRequest) {
        payload.afterRequest(null);
      }
    } else {
      throw new Error(response.message || response.msg || 'Error during user avatar update');
    }
  } catch (error) {
    yield put(fetchUserProfileFailure());
    if (payload.afterRequest) payload.afterRequest(error);
  }
}

function* fetchUserData({ payload }) {
  try {
    yield all([put(fetchUserSkills()), put(fetchUserProfile()), put(fetchUserLocations())]);
    payload.afterRequest(null);
  } catch (error) {
    payload.afterRequest(error);
  }
}

function* deleteAvatarSaga({ payload }) {
  try {
    // console.log('payload', payload);
    const response = yield call(fetchAPI, '/user/image/delete/', 'DELETE', { filename: payload.fileName });
    // console.log('response', response);
    if (response.status_code === 200) {
      yield put(deleteUserAvatarSuccess());
      payload.afterRequest(null);
    } else {
      throw new Error(response.message || response.msg || 'Error during user avatar deletion');
    }
  } catch (error) {
    yield put(deleteUserAvatarFailure());
    payload.afterRequest(error);
  }
}

function* deactivateAccountSaga({ payload: { password, callback } }) {
  try {
    const response = yield call(fetchAPI, '/user/delete/', 'DELETE', { password });
    // console.log('response', response);
    if (response.status_code === 200) {
      yield put(logout(callback));
    } else {
      throw new Error(response.message || response.msg || 'Error deactivate profile');
    }
  } catch (error) {
    // console.log('ERROR deactivateAccountSaga', error);
    callback(error);
  }
}

function* changePublicStatusSaga({ payload: { currentStatus, callback } }) {
  try {
    const response = yield call(fetchAPI, '/user/change_public_status', 'PATCH', { is_public: !currentStatus });
    // console.log('response', response);
    if (response.status_code === 200) {
      yield put(changePublicStatusSuccess(response.payload.is_public));
      callback(null);
    } else {
      throw new Error(response.message || response.msg || 'Error change public status');
    }
  } catch (error) {
    // console.log('ERROR changePublicStatusSaga', error);
    callback(error);
  }
}

function* changeVacationModeStatusSaga({ payload: { status, substituteId, callback } }) {
  try {
    const response = yield call(fetchAPI, '/user/update/', 'PUT', {
      is_in_vacation: status,
      substitute_id: substituteId,
    });
    // console.log('response', response);
    if (response.status_code === 200) {
      yield put(changeVacationModeStatusSuccess(response.payload.is_in_vacation, response.payload.substitutes));
      callback(null);
    } else {
      throw new Error(response.message || response.msg || 'Error change status vacation mode');
    }
  } catch (error) {
    // console.log('ERROR changeVacationModeStatusSaga', error);
    callback(error);
  }
}

function* userSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
  yield takeLatest(UPDATE_USER, updateUserSaga);
  yield takeLatest(UPDATE_AVATAR, updateAvatarSaga);
  yield takeLatest(FETCH_USER_PROFILE, fetchUserProfileSaga);
  yield takeLatest(FETCH_USER_DATA, fetchUserData);
  yield takeLatest(DELETE_USER_AVATAR, deleteAvatarSaga);
  yield takeLatest(DEACTIVATE_ACCOUNT, deactivateAccountSaga);
  yield takeLatest(CHANGE_PUBLIC_STATUS, changePublicStatusSaga);
  yield takeLatest(CHANGE_VACATION_MODE_STATUS, changeVacationModeStatusSaga);
}

export default userSaga;
