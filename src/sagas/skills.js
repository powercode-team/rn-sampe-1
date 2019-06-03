import { takeLatest, call, put } from 'redux-saga/effects';
import {
  SAVE_USER_SKILLS,
  saveUserSkillsSuccess,
  saveUserSkillsFailure,
  FETCH_USER_SKILLS,
  fetchUserSkillsSuccess,
  fetchUserSkillsFailure,
  DELETE_USER_SKILL,
  deleteUserSkillSuccess,
  deleteUserSkillFailure,
  SET_SKILL_LEVEL,
  setSkillLevelSuccess,
  setSkillLevelFailure,
} from '../actions/skills';
import { fetchAPI } from '../utils/api';

function* saveUserSkillsSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/add_skills/', 'POST', payload.body);
    if (response.status_code === 200) {
      yield put(saveUserSkillsSuccess(response.payload.skills));
      payload.afterRequest(null);
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(saveUserSkillsFailure());
    payload.afterRequest(error);
  }
}

function* fetchUserSkillsSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/get_user_skills/', 'GET');
    if (response.status_code === 200) {
      yield put(fetchUserSkillsSuccess(response.payload.skills));
      if (payload.afterRequest) payload.afterRequest();
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(fetchUserSkillsFailure());
    if (payload.afterRequest) payload.afterRequest();
  }
}

function* deleteUserSkillSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, `/user/delete_skill/id=${payload.skillId}`, 'DELETE');
    if (response.status_code === 200) {
      yield put(deleteUserSkillSuccess(payload.skillId));
      payload.afterRequest();
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(deleteUserSkillFailure());
    payload.afterRequest();
  }
}

function* setSkillLevelSaga({ payload }) {
  try {
    const response = yield call(fetchAPI, '/user/change_user_skill_level/', 'PUT', payload.body);
    if (response.status_code === 200) {
      yield put(setSkillLevelSuccess(payload.body));
      payload.afterRequest();
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(setSkillLevelFailure());
    payload.afterRequest();
  }
}

function* skillsSaga() {
  yield takeLatest(SAVE_USER_SKILLS, saveUserSkillsSaga);
  yield takeLatest(FETCH_USER_SKILLS, fetchUserSkillsSaga);
  yield takeLatest(DELETE_USER_SKILL, deleteUserSkillSaga);
  yield takeLatest(SET_SKILL_LEVEL, setSkillLevelSaga);
}

export default skillsSaga;
