import { takeLatest, call, put } from 'redux-saga/effects';
import { has } from 'lodash';

import {
  FETCH_SENIORITY_DATA,
  fetchSeniorityDataSuccess,
  fetchSeniorityDataFailure,
  FETCH_SKILLS_DATA,
  fetchSkillsDataSuccess,
  fetchSkillsDataFailure,
  FETCH_TERMS_OF_USE,
  fetchTermsOfUseSuccess,
  fetchTermsOfUseFailure,
  FETCH_CATEGORIES_DATA,
  fetchCategoriesDataSuccess,
  fetchCategoriesDataFailure,
  FETCH_CONTRACT_TYPES_DATA,
  fetchContractTypesDataFailure,
  fetchContractTypesDataSuccess,
} from '../actions/initialFetches';

import { BASE_URL } from '../utils/api';

function* fetchSenioritySaga() {
  try {
    const response = yield call(fetch, `${BASE_URL}/info/get_seniorities_list`);
    const parsedResponse = yield response.json();
    if (parsedResponse.status_code === 200) {
      yield put(fetchSeniorityDataSuccess(parsedResponse.payload.seniorities));
    } else {
      throw new Error('Error fetching seniorities list');
    }
  } catch (error) {
    // console.log(error);
    yield put(fetchSeniorityDataFailure());
  }
}

function* fetchSkillsSaga() {
  let skillsData = null;
  try {
    for (let i = 0; i <= 5; i += 1) {
      if (!skillsData) {
        const response = yield call(fetch, `${BASE_URL}/skill/get_skill_levels`);
        const parsedResponse = yield response.json();
        if (parsedResponse.status_code === 200) {
          skillsData = parsedResponse.payload.skill_levels;
        }
      }
      // else {
      //   throw new Error('Error fetching seniorities list');
      // }
    }
    if (!skillsData) throw new Error('Error fetching seniorities list');
  } catch (error) {
    // console.log(error);
    yield put(fetchSkillsDataFailure());
  } finally {
    if (skillsData) yield put(fetchSkillsDataSuccess(skillsData));
  }
}

function* fetchTermsOfUseSaga({ payload: { language } }) {
  try {
    const response = yield call(fetch, `${BASE_URL}/agreements/terms_of_use?lang=${language}&format=md`, {
      credentials: 'include',
    });
    const termsOfUse = yield response.text();
    yield put(fetchTermsOfUseSuccess(termsOfUse));
  } catch (error) {
    yield put(fetchTermsOfUseFailure());
    console.log('ERROR fetchTermsOfUseSaga', error);
  }
}

function* fetchCategoriesSaga() {
  try {
    const response = yield call(fetch, `${BASE_URL}/info/get_categories_list`, 'GET');
    const parsedResponse = yield response.json();

    if (has(parsedResponse, 'payload') && has(parsedResponse.payload, 'categories')) {
      yield put(fetchCategoriesDataSuccess(parsedResponse.payload.categories));
    }
  } catch (error) {
    yield put(fetchCategoriesDataFailure());
    // console.log('ERROR', error);
  }
}

function* fetchContractTypesSaga() {
  try {
    const response = yield call(fetch, `${BASE_URL}/info/get_contract_types_list`, 'GET');
    const parsedResponse = yield response.json();
    if (has(parsedResponse, 'payload') && has(parsedResponse.payload, 'categories')) {
      yield put(fetchContractTypesDataSuccess(parsedResponse.payload.categories));
    }
  } catch (error) {
    yield put(fetchContractTypesDataFailure());
    // console.log('ERROR', error);
  }
}

function* initialFetchSaga() {
  yield takeLatest(FETCH_SENIORITY_DATA, fetchSenioritySaga);
  yield takeLatest(FETCH_SKILLS_DATA, fetchSkillsSaga);
  yield takeLatest(FETCH_TERMS_OF_USE, fetchTermsOfUseSaga);
  yield takeLatest(FETCH_CATEGORIES_DATA, fetchCategoriesSaga);
  yield takeLatest(FETCH_CONTRACT_TYPES_DATA, fetchContractTypesSaga);
}

export default initialFetchSaga;
