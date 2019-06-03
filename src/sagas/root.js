import { all } from 'redux-saga/effects';
import initialFetches from './initialFetches';
import signUpSaga from './signUp';
import authSaga from './auth';
import userSaga from './user';
import skillsSaga from './skills';
import tasksJobsSaga from './tasksJobs';
import locationsSaga from './locations';
import matchingSaga from './matching';
import offersSaga from './offers';
import chatSaga from './chat';
import notificationsSaga from './notifications';
import socketConnectionSaga from './socketConnection';
import matchingArchiveFilterSaga from './matchingArchive';

function* rootSaga() {
  yield all([
    initialFetches(),
    signUpSaga(),
    authSaga(),
    userSaga(),
    skillsSaga(),
    locationsSaga(),
    tasksJobsSaga(),
    matchingSaga(),
    offersSaga(),
    chatSaga(),
    notificationsSaga(),
    socketConnectionSaga(),
    matchingArchiveFilterSaga(),
  ]);
}

export default rootSaga;
