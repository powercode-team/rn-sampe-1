import { eventChannel } from 'redux-saga';
import { takeLatest, call, put, take, select } from 'redux-saga/effects';
// import io from 'socket.io-client';
import io from 'socket.io-client';

import { DOMAIN } from '../utils/api';

import {
  INITIALIZE_CHANNEL,
  SOCKET_DISCONNECT,
  RECEIVED_NEW_MESSAGE,
  receivedNewMessage,
  threadDeletedByInterlocator,
} from '../actions/socketConnection';

import {
  SEND_MESSAGE,
  VIEW_SINGLE_MESSAGE,
  receivedMessage,
  onStatusChange,
  clearStorage,
  viewSingleMessage,
  messageSent,
  rejoinToThread,
  JOIN_THREAD,
  LEAVE_THREAD,
  REJOIN_TO_THREAD,
} from '../actions/chat';

import { fetchUserProfile } from '../actions/user';

import { addOffer, deleteOffer, ADD_OFFER, DELETE_OFFER } from '../actions/offers';

const SOCKET_URL = `${DOMAIN}/chat`;

const connectToSocket = () => io(SOCKET_URL, { transports: ['websocket'] });
let socket;
let userId = '';

const joinToThread = (offerId, activityType, senderId, threadId) => {
  socket.emit('joined', {
    offer_id: offerId,
    activity_type: activityType,
    sender_id: senderId,
    thread_id: threadId,
  });
};

const viewMessage = (msgId) => socket.emit('view_message', { message_id: msgId });

const createEventsChannel = () =>
  eventChannel((emit) => {
    socket.on('status', (status) => emit(onStatusChange(status)));

    socket.on('message', (message) => {
      emit(receivedMessage(message));
      emit(viewSingleMessage(message));
    });

    socket.on('new_offer_created', (offer) => emit(addOffer(offer)));

    socket.on('offer_was_deleted', (offerData) => emit(deleteOffer(offerData.offer_id, offerData.offer_type)));

    socket.on('received_new_message', () => emit(receivedNewMessage()));

    socket.on('chat_thread_was_deleted', (data) => emit(threadDeletedByInterlocator(data.thread_id)));

    socket.on('selected_as_substitute', () => {
      emit(fetchUserProfile(() => {}));
    });

    socket.on('master_back_from_vacation', () => {
      emit(fetchUserProfile(() => {}));
    });
    // socket.on('error', error => console.log('SOCKET EVENT ERROR', error));
    //
    // socket.on('connect_error', (error) => {
    //   console.log('connect_error', error);
    // });
    //
    // socket.on('connect_timeout', (timeout) => {
    //   console.log('connect_timeout', timeout);
    // });
    //
    // socket.on('reconnect_attempt', () => {
    //   console.log('trying to reconnect socket');
    // });
    //
    // socket.on('reconnect_error', () => {
    //   console.log('reconnection attempt error');
    // });
    //
    // socket.on('reconnect_failed', () => {
    //   console.log('Fired when couldn\'t reconnect within reconnectionAttempts');
    // });
    //
    // socket.on('ping', () => {
    //   console.log('ping');
    // });
    //
    // socket.on('pong', () => {
    //   console.log('pong');
    // });

    socket.on('reconnect', () => {
      emit(rejoinToThread());
      // console.log(`reconnected on ${attempt}th attempt`);
    });

    // socket.on('disconnect', (reason) => {
    //   console.log('disconnect', reason);
    // });

    const unsubscribe = () => socket.disconnect();
    return unsubscribe;
  });

function* rejoinToThreadSaga() {
  const offerId = yield select((state) => state.chat.offerId);
  const activityType = yield select((state) => state.chat.currentActivityType);
  const senderId = yield select((state) => state.user.id);
  const threadId = yield select((state) => state.chat.currentThread.id);
  if (offerId && activityType && senderId && threadId) joinToThread(offerId, activityType, senderId, threadId);
}

function* startSocketConnection(callback, setParams) {
  socket = connectToSocket();
  userId = yield select((state) => state.user.id);
  socket.on('connect', () => {
    socket.emit('connected', { sender_id: userId }, () => {});
    if (callback) callback();
  });
  const channel = yield call(createEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
    if (action.type === ADD_OFFER || action.type === DELETE_OFFER) {
      setParams({ isShowBageOnOffersTab: true });
    } else if (action.type === RECEIVED_NEW_MESSAGE) {
      setParams({ isShowBageOnChatTab: true });
    }
  }
}

const sendMessage = ({ message, threadId, userId: id, msg_number }) =>
  socket.emit('text', {
    msg: message,
    thread_id: threadId,
    sender_id: id,
    msg_number,
  });

const leaveThread = (threadId, id) => {
  socket.emit('left', { thread_id: threadId, user_id: id });
};

const socketDisconnect = () => socket.disconnect();

function* initializeChannelSaga({ payload: { setParams } }) {
  try {
    yield call(startSocketConnection, null, setParams);
  } catch (error) {
    // console.log('ERROR initializeChannelSaga', error);
  }
}

function* sendMessageSaga({ payload }) {
  try {
    yield call(sendMessage, payload);
    yield put(messageSent(payload));
  } catch (error) {
    // console.log('ERROR sendMessageSaga', error);
  }
}
function* socketDisconnectSaga() {
  try {
    yield call(socketDisconnect);
  } catch (error) {
    // console.log('ERROR socketDisconnect', error);
  }
}

function* viewSingleMessageSaga({ payload: { message } }) {
  try {
    const state = yield select();
    if (message.user_id === state.chat.interlocutorId) {
      yield call(viewMessage, message.message_id);
    }
  } catch (error) {
    // console.log('ERROR viewSingleMessageSaga', error);
  }
}

function* joinThreadSaga({ payload: { offerId, activityType, senderId, threadId } }) {
  try {
    if (socket && socket.connected) {
      yield call(joinToThread, offerId, activityType, senderId, threadId);
    } else {
      socket.off('connect');
      yield call(startSocketConnection, () => joinToThread(offerId, activityType, senderId, threadId));
    }
  } catch (error) {
    // console.log('ERROR initializeChannelSaga', error);
  }
}

function* leaveThreadSaga({ payload: { threadId, currentUserId } }) {
  try {
    yield call(leaveThread, threadId, currentUserId);
    yield put(clearStorage());
  } catch (error) {
    // console.log('ERROR socketDisconnect', error);
  }
}

function* socketConnectionSaga() {
  yield takeLatest(INITIALIZE_CHANNEL, initializeChannelSaga);
  yield takeLatest(SEND_MESSAGE, sendMessageSaga);
  yield takeLatest(SOCKET_DISCONNECT, socketDisconnectSaga);
  yield takeLatest(VIEW_SINGLE_MESSAGE, viewSingleMessageSaga);
  yield takeLatest(JOIN_THREAD, joinThreadSaga);
  yield takeLatest(LEAVE_THREAD, leaveThreadSaga);
  yield takeLatest(REJOIN_TO_THREAD, rejoinToThreadSaga);
}

export default socketConnectionSaga;
