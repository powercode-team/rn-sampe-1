import { takeLatest, call, put } from 'redux-saga/effects';

import { fetchAPI } from '../utils/api';

import {
  FETCH_ALL_THREADS,
  FETCH_THREAD,
  DELETE_THREAD,
  FETCH_USER_INFO,
  FETCH_USER_PROFILE_SKILLS,
  FETCH_CURRENT_OFFER,
  FETCH_MATCHED_USER,
  VIEW_MESSAGES,
  fetchAllThreadsSuccess,
  fetchAllThreadsFailure,
  fetchThreadSuccess,
  fetchThreadFailure,
  deleteThreadSuccess,
  deleteThreadFailure,
  fetchUserInfoSuccess,
  fetchUserInfoFailure,
  fetchUserProfileSkillsSuccess,
  fetchUserProfileSkillsFailure,
  fetchCurrentOfferSuccess,
  fetchCurrentOfferFailure,
  fetchMatchedUserSuccess,
  fetchMatchedUserFailure,
} from '../actions/chat';

function* fetchAllThreadsSaga({ payload: { callback } }) {
  try {
    const response = yield call(fetchAPI, '/chat/load_threads', 'GET');
    // console.log('response in fetchAllThreadsSaga', response);
    if (Object.prototype.hasOwnProperty.call(response, 'status_code') && response.status_code === 200) {
      yield put(fetchAllThreadsSuccess(response.payload));
      callback(true);
    } else {
      throw new Error(response);
    }
  } catch (error) {
    // console.log('ERROR fetchAllThreadsSaga', error);
    yield put(fetchAllThreadsFailure());
    callback(false);
  }
}

function* fetchThreadSaga({ payload: { threadId, callback } }) {
  try {
    console.log('fetchThreadSaga threadId', threadId);
    const response = yield call(fetchAPI, `/chat/load_chat_messages/thread_id=${threadId}`, 'GET');
    console.log('fetchThreadSaga response', response.payload);
    if (Object.prototype.hasOwnProperty.call(response, 'status_code') && response.status_code === 200) {
      yield put(fetchThreadSuccess(response.payload));
      callback(true);
    } else {
      throw new Error(response);
    }
  } catch (error) {
    // console.log('ERROR fetchThreadSaga', error);
    yield put(fetchThreadFailure());
    callback(false);
  }
}

function* deleteThreadSaga({ payload: { threadId } }) {
  try {
    const response = yield call(fetchAPI, `/chat/delete/thread_id=${threadId}`, 'DELETE');
    if (Object.prototype.hasOwnProperty.call(response, 'status_code') && response.status_code === 200) {
      yield put(deleteThreadSuccess(threadId));
    } else {
      throw new Error(response);
    }
  } catch (error) {
    // console.log('ERROR deleteThreadSaga', error);
    yield put(deleteThreadFailure());
  }
}

function* fetchUserDataSaga({ payload: { userId } }) {
  try {
    // console.log('userId', userId);
    const response = yield call(fetchAPI, `/user/load_user_info/id=${userId}`, 'GET');
    // console.log('response fetchUserDataSaga', response);
    if (response.status_code === 200) {
      yield put(fetchUserInfoSuccess(response.payload));
    } else if (response.status_code === 404) {
      throw new Error('This profile has been deactivated');
    } else {
      throw new Error(response || response.message || response.msg);
    }
  } catch (error) {
    // console.log('ERROR deleteThreadSaga', error);
    yield put(fetchUserInfoFailure(error.message));
  }
}

function* fetchUserSkillsSaga({ payload: { userId, callback } }) {
  try {
    console.log('payload', callback);
    const response = yield call(fetchAPI, `/user/get_user_skills/user_id=${userId}`, 'GET');
    // console.log('response fetchUserSkillsSaga', response);
    if (Object.prototype.hasOwnProperty.call(response, 'status_code') && response.status_code === 200) {
      yield put(fetchUserProfileSkillsSuccess(response.payload.skills));
      callback(true);
    } else {
      throw new Error(response);
    }
  } catch (error) {
    // console.log('ERROR deleteThreadSaga', error);
    yield put(fetchUserProfileSkillsFailure());
    callback(false);
  }
}

function* fetchCurrentOfferSaga({ payload: { offerId, offerType, callback } }) {
  try {
    let endpoint = '/offer';
    if (offerType === 'job') {
      endpoint = `${endpoint}/load_job_offer/id=${offerId}`;
    } else if (offerType === 'task') {
      endpoint = `${endpoint}/load_task_offer/id=${offerId}`;
    }
    const response = yield call(fetchAPI, endpoint, 'GET');
    // console.log('response', response)
    if (Object.prototype.hasOwnProperty.call(response, 'status_code') && response.status_code === 200) {
      yield put(fetchCurrentOfferSuccess(response.payload));
    } else {
      console.dir('response here', response);
      throw new Error(response);
    }
    callback();
  } catch (error) {
    console.dir('ERROR fetchActivitySaga', error);
    yield put(fetchCurrentOfferFailure());
  }
}

function* fetchCurrentActivitySaga({ payload: { activityId, userId, activityType, callback } }) {
  try {
    let endpoint = '/match';
    if (activityType === 'job') {
      endpoint = `${endpoint}/get_matched_user_for_job/user_id=${userId}&job_id=${activityId}`;
    } else if (activityType === 'task') {
      endpoint = `${endpoint}/get_matched_user_for_task/user_id=${userId}&task_id=${activityId}`;
    }
    const response = yield call(fetchAPI, endpoint, 'GET');
    if (response.isSuccessful) {
      yield put(fetchMatchedUserSuccess(response.payload));
    } else if (!response.isSuccessful) {
      throw new Error(`${response.payload ? response.payload.first_name : 'User'} has deleted all his skills or his entire profile`);
    } else {
      throw new Error(response || response.message || response.msg);
    }
    callback();
  } catch (error) {
    console.dir('ERROR fetchActivitySaga', error);
    yield put(fetchMatchedUserFailure(error.message));
  }
}

function* viewMessagesSaga({ payload: { messagesIds } }) {
  try {
    yield call(fetchAPI, '/chat/view_messages', 'PUT', { message_ids: messagesIds });
  } catch (error) {
    // console.log('ERROR viewMessagesSaga', error);
  }
}

function* chatSaga() {
  yield takeLatest(FETCH_ALL_THREADS, fetchAllThreadsSaga);
  yield takeLatest(FETCH_THREAD, fetchThreadSaga);
  yield takeLatest(DELETE_THREAD, deleteThreadSaga);
  yield takeLatest(FETCH_USER_INFO, fetchUserDataSaga);
  yield takeLatest(FETCH_USER_PROFILE_SKILLS, fetchUserSkillsSaga);
  yield takeLatest(FETCH_CURRENT_OFFER, fetchCurrentOfferSaga);
  yield takeLatest(FETCH_MATCHED_USER, fetchCurrentActivitySaga);
  yield takeLatest(VIEW_MESSAGES, viewMessagesSaga);
}

export default chatSaga;
