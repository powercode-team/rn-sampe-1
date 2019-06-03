import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_MATCHING_JOB,
  FETCH_MATCHING_TASK,
  fetchMatchingJobSuccess,
  fetchMatchingJobFailure,
  fetchMatchingTaskSuccess,
  fetchMatchingTaskFailure,
  UPDATE_MATCHING_FOR_JOB,
  UPDATE_MATCHING_FOR_TASK,
  updateMatchingForJobSuccess,
  updateMatchingForJobFailure,
  updateMatchingForTaskSuccess,
  updateMatchingForTaskFailure,
  INVITE_ALL_CANDIDATES,
  inviteAllCandidatesSuccess,
  inviteAllCandidatesFailure,
  FETCH_SELECTED_USER_SKILLS,
  fetchSelectedUserSkillsSuccess,
  fetchSelectedUserSkillsFailure,
  CHANGE_OFFER_STATUS_CONTROLLER,
  SET_OFFER_STATUS_ACCEPTED,
  setOfferStatusAcceptedSuccess,
  setOfferStatusAcceptedFailure,
  SET_OFFER_STATUS_REJECTED,
  setOfferStatusRejectedSuccess,
  setOfferStatusRejectedFailure,
  CHANGE_MATCHING_OFFER_STATUS,
  changeMatchingOfferStatusSuccess,
  changeMatchingOfferStatusFailure,
  MARK_CANDIDATE_AS_VIEWED,
  markCandidateAsViewedSuccess,
  markCandidateAsViewedFailure,
  FILTER_MATCHING_USERS,
  filterMatchingUsersSuccess,
} from '../actions/matching';

import { fetchAPI } from '../utils/api';
import { statusesActionsMap } from '../utils/statuses';

function* fetchMatchingJobSaga({ payload: { id, callback } }) {
  try {
    const response = yield call(fetchAPI, `/match/get_matched_users_for_job_web/id=${id}`, 'GET');
    if (response.status_code === 200) {
      yield put(fetchMatchingJobSuccess(response.payload.users));
      callback();
    } else {
      throw new Error('Error during matching info fetch');
    }
  } catch (error) {
    yield put(fetchMatchingJobFailure(error));
    // console.log('ERROR', error);
    callback();
  }
}

function* fetchMatchingTaskSaga({ payload: { id, callback } }) {
  try {
    const response = yield call(fetchAPI, `/match/get_matched_users_for_task_web/id=${id}`, 'GET');
    if (response.status_code === 200) {
      yield put(fetchMatchingTaskSuccess(response.payload.users));
      callback();
    } else {
      throw new Error('Error during matching info fetch');
    }
  } catch (error) {
    yield put(fetchMatchingTaskFailure(error));
    // console.log('ERROR', error);
    callback();
  }
}

function* updateMatchingForJobSaga({ payload: { jobId, callback } }) {
  try {
    // console.log('jobId, callback', jobId, callback)
    const response = yield call(fetchAPI, `/match/update_matched_users_for_job_web/id=${jobId}`, 'GET');
    // console.log('response', response);
    if (response.status_code === 200 || response.status_code === 201) {
      yield put(updateMatchingForJobSuccess(response.payload.users));
      callback();
    } else {
      throw new Error('Error update matching for job');
    }
  } catch (error) {
    yield put(updateMatchingForJobFailure(error.msg || error.message || error));
    // console.log('ERROR', error);
  }
}

function* updateMatchingForTaskSaga({ payload: { taskId, callback } }) {
  try {
    const response = yield call(fetchAPI, `/match/update_matched_users_for_task_web/id=${taskId}`, 'GET');
    if (response.status_code === 200 || response.status_code === 201) {
      yield put(updateMatchingForTaskSuccess(response.payload.users));
      callback();
    } else {
      throw new Error('Error update matching for task');
    }
  } catch (error) {
    yield put(updateMatchingForTaskFailure(error.msg || error.message || error));
    // console.log('ERROR', error);
  }
}

function* inviteAllCandidatesSaga({ payload: { type, activityId, cb } }) {
  try {
    const data = {
      [`${type}_id`]: activityId,
      offer_action: 'send_all',
    };
    const response = yield call(fetchAPI, '/offer/send_all_offers', 'POST', data);
    if (response.status_code === 202) {
      yield put(inviteAllCandidatesSuccess());
    } else {
      throw new Error('Something went wrong during mass invite');
    }
  } catch (error) {
    yield put(inviteAllCandidatesFailure());
  } finally {
    cb();
  }
}

function* fetchSelectedUserSkillsSaga({ payload: { userId } }) {
  try {
    const response = yield call(fetchAPI, `/user/get_user_skills/user_id=${userId}`, 'GET');
    if (response.status_code === 200) {
      yield put(fetchSelectedUserSkillsSuccess(response.payload.skills));
    } else {
      throw new Error('Error during fetching skills for selected user');
    }
  } catch (error) {
    yield put(fetchSelectedUserSkillsFailure());
    // console.log('ERROR', error);
  }
}

function* changeStatusControllerSaga({
  payload: {
    data: { activeTab, currentStatus, button, ...rest },
  },
}) {
  const { action, serverAction } = statusesActionsMap(currentStatus)[button][activeTab.toLowerCase()];
  yield put(action({ ...rest, serverAction }));
}

function* setOfferStatusAcceptedSaga({ payload: { type, instanceId, candidateId, serverAction, callback } }) {
  try {
    const data = {
      candidate_id: candidateId,
      offer_action: serverAction,
    };
    if (type === 'Jobs') data.job_id = instanceId;
    if (type === 'Tasks') data.task_id = instanceId;
    const response = yield call(fetchAPI, '/offer/create_or_delete_offer', 'POST', data);
    if (response.status_code === 201 || response.status_code === 200 || response.status_code === 204) {
      const newStatus = serverAction === 'create' ? 'pending' : 'new';
      yield put(setOfferStatusAcceptedSuccess(candidateId, type, newStatus));
      callback(null, null, newStatus);
    } else {
      throw new Error('Error during changing offer accepted status');
    }
  } catch (error) {
    yield put(setOfferStatusAcceptedFailure());
    callback(error);
    // console.log('ERROR', error);
  }
}

function* setOfferStatusRejectedSaga({ payload: { type, instanceId, candidateId, serverAction, callback } }) {
  try {
    const data = {
      candidate_id: candidateId,
      is_true: serverAction,
    };
    if (type === 'Jobs') data.job_id = instanceId;
    if (type === 'Tasks') data.task_id = instanceId;
    const response = yield call(fetchAPI, '/activity/user_block_or_unblock', 'POST', data);
    if (response.status_code === 201 || response.status_code === 200 || response.status_code === 204) {
      const newStatus = serverAction ? 'rejected' : 'new';
      yield put(setOfferStatusRejectedSuccess(candidateId, type, newStatus));
      callback(null, null, newStatus);
    } else {
      throw new Error('Error during changing offer accepted status');
    }
  } catch (error) {
    yield put(setOfferStatusRejectedFailure());
    callback(error);
    // console.log('ERROR', error);
  }
}

function* changeMatchingOfferStatusSaga({
  payload: {
    type,
    offerId,
    instanceId,
    candidateId,
    serverAction,
    reasons = {
      is_not_interested: false,
      is_contract_type: false,
      is_description: false,
      is_location: false,
      is_time: false,
    },
    comment,
    callback,
  },
}) {
  let data = {
    offer_status: serverAction,
    offer_id: offerId,
    [`${type.slice(0, -1).toLowerCase()}_id`]: instanceId,
  };
  if (serverAction === 'canceled') data = { ...data, ...reasons, decline_comment: comment || '' };
  if (serverAction === 'submitted') data = { ...data, accept_comment: comment || '' };
  try {
    const response = yield call(fetchAPI, '/offer/change_status', 'PUT', data);
    if (response.status_code === 201 || response.status_code === 200 || response.status_code === 204) {
      yield put(changeMatchingOfferStatusSuccess(candidateId, serverAction));
      callback(null, response.payload.thread_id, serverAction);
    } else {
      throw new Error(response.message || response.msg || 'Error during changing offer status');
    }
  } catch (error) {
    // console.log('err', error);
    yield put(changeMatchingOfferStatusFailure());
    callback(error);
  }
}

function* viewCandidateSaga({ payload: { type, id, candidateId } }) {
  try {
    const data = {
      candidate_id: candidateId,
    };
    if (type === 'Jobs') data.job_id = id;
    if (type === 'Tasks') data.task_id = id;
    // console.log('data to send', data);
    const response = yield call(fetchAPI, '/offer/view_offer', 'PATCH', data);
    // console.log('response to receive', response);
    if (response.status_code === 201 || response.status_code === 200 || response.status_code === 204) {
      yield put(markCandidateAsViewedSuccess(type, candidateId));
    } else {
      throw new Error('Error during changing offer accepted status');
    }
  } catch (error) {
    yield put(markCandidateAsViewedFailure());
    // console.log('ERROR', error);
  }
}

function* filterMatchingUsersSaga({ payload: { activityType, activityId, skillsCount, senioritiesNames, cb } }) {
  try {
    const data = {
      activity_type: activityType,
      activity_id: activityId,
      matching_skill_count: skillsCount,
      seniority: senioritiesNames,
    };
    const response = yield call(fetchAPI, '/filter/change_matching_score_value', 'PUT', data);
    if (response.status_code === 201 || response.status_code === 200 || response.status_code === 204) {
      yield put(filterMatchingUsersSuccess(response.payload.users));
    } else {
      throw new Error('Error filter matching users');
    }
  } catch (error) {
    // console.log('ERROR in filterMatchingUsersSaga', error);
  } finally {
    cb();
  }
}

function* matchingSaga() {
  yield takeLatest(FETCH_MATCHING_JOB, fetchMatchingJobSaga);
  yield takeLatest(FETCH_MATCHING_TASK, fetchMatchingTaskSaga);
  yield takeLatest(UPDATE_MATCHING_FOR_JOB, updateMatchingForJobSaga);
  yield takeLatest(UPDATE_MATCHING_FOR_TASK, updateMatchingForTaskSaga);
  yield takeLatest(INVITE_ALL_CANDIDATES, inviteAllCandidatesSaga);
  yield takeLatest(FETCH_SELECTED_USER_SKILLS, fetchSelectedUserSkillsSaga);
  yield takeLatest(CHANGE_OFFER_STATUS_CONTROLLER, changeStatusControllerSaga);
  yield takeLatest(SET_OFFER_STATUS_ACCEPTED, setOfferStatusAcceptedSaga);
  yield takeLatest(SET_OFFER_STATUS_REJECTED, setOfferStatusRejectedSaga);
  yield takeLatest(CHANGE_MATCHING_OFFER_STATUS, changeMatchingOfferStatusSaga);
  yield takeLatest(MARK_CANDIDATE_AS_VIEWED, viewCandidateSaga);
  yield takeLatest(FILTER_MATCHING_USERS, filterMatchingUsersSaga);
}

export default matchingSaga;
