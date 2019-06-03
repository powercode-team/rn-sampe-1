import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_OFFERS,
  fetchOffersSuccess,
  fetchOffersFailure,
  CHANGE_OFFER_STATUS,
  changeOfferStatusSuccess,
  changeOfferStatusFailure,
  MARK_OFFER_AS_VIEWED,
  markOfferAsViewedSuccess,
  markOfferAsViewedFailure,
} from '../actions/offers';
import { fetchAPI } from '../utils/api';

function* fetchOffersSaga({ payload: { afterRequest } }) {
  try {
    const response = yield call(fetchAPI, '/offer/get_offers_list', 'GET');
    if (response.status_code === 201 || response.status_code === 200) {
      yield put(fetchOffersSuccess(response.payload));
      if (afterRequest) afterRequest(null);
    } else {
      throw new Error(response.message || response.msg || 'Error during user skills update');
    }
  } catch (error) {
    yield put(fetchOffersFailure());
    if (afterRequest) afterRequest(error);
  }
}

function* changeOffersStatusSaga({
  payload: {
    type,
    offerId,
    entityId,
    status,
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
    offer_status: status,
    offer_id: offerId,
  };
  if (type === 'job') data.job_id = entityId;
  if (type === 'task') data.task_id = entityId;
  if (status === 'declined') data = { ...data, ...reasons, decline_comment: comment || '' };
  if (status === 'accepted') data = { ...data, accept_comment: comment || '' };
  try {
    const response = yield call(fetchAPI, '/offer/change_status', 'PUT', data);
    if (response.status_code === 201 || response.status_code === 200 || response.status_code === 204) {
      yield put(changeOfferStatusSuccess(entityId));
      callback(null, response.payload.thread_id);
    } else {
      throw new Error(response.message || response.msg || 'Error during changing offer status');
    }
  } catch (error) {
    // console.log('err', error);
    yield put(changeOfferStatusFailure());
    callback(error);
  }
}

function* viewOfferSaga({ payload: { userId, offerId, type, entityId } }) {
  try {
    const data = {
      candidate_id: userId,
    };
    if (type === 'job') data.job_id = entityId;
    if (type === 'task') data.task_id = entityId;
    const response = yield call(fetchAPI, '/offer/view_offer', 'PATCH', data);
    if (response.status_code === 201 || response.status_code === 200 || response.status_code === 204) {
      yield put(markOfferAsViewedSuccess(offerId, type));
    } else {
      throw new Error('Error during changing offer accepted status');
    }
  } catch (error) {
    yield put(markOfferAsViewedFailure());
    // console.log('ERROR', error);
  }
}

function* offersSaga() {
  yield takeLatest(FETCH_OFFERS, fetchOffersSaga);
  yield takeLatest(CHANGE_OFFER_STATUS, changeOffersStatusSaga);
  yield takeLatest(MARK_OFFER_AS_VIEWED, viewOfferSaga);
}

export default offersSaga;
