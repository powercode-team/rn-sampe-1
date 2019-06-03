import { omit } from 'lodash';
import moment from 'moment';
import 'moment/min/moment-with-locales';
import 'moment/locale/de';
import 'moment/locale/en-au';
import { sortMessagesByDate } from '../utils/sorting';
import { isSameDay } from '../utils/dateHelpers';
import store from './../store';

import {
  SET_POPUP_STATE,
  FETCH_ALL_THREADS_SUCCESS,
  FETCH_ALL_THREADS_FAILURE,
  RECEIVED_MESSAGE,
  SET_THREAD_ID,
  CLEAR_STORAGE,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_FAILURE,
  ON_STATUS_CHANGE,
  DELETE_THREAD_SUCCESS,
  DELETE_THREAD_FAILURE,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  FETCH_USER_PROFILE_SKILLS_SUCCESS,
  FETCH_USER_PROFILE_SKILLS_FAILURE,
  SET_CURRENT_ACTIVITIES,
  FETCH_CURRENT_OFFER_SUCCESS,
  FETCH_CURRENT_OFFER_FAILURE,
  SET_INTERLOCUTOR_ID,
  SET_CURRENT_USER_TYPE,
  FETCH_MATCHED_USER_SUCCESS,
  FETCH_MATCHED_USER_FAILURE,
  SET_NUMBER_OF_MESSAGES,
  MESSAGE_SENT,
  SET_VIEWED_NEW_MESSAGE,
  SET_LAST_VIEWED_ROUTE,
} from '../actions/chat';

import { LOGOUT_SUCCESS } from '../actions/auth';

import { DELETE_OFFER } from '../actions/offers';

import {
  RECEIVED_NEW_MESSAGE,
  THREAD_DELETED_BY_INTERLOCUTOR,
  NEW_CHAT_WITH_SUBSTITUTE,
} from '../actions/socketConnection';

const initialState = {
  isPopupVisible: false,
  popupMessage: '',
  currentThreadId: '',
  currentThread: {},
  messages: [],
  theads: [],
  currentUserProfile: {},
  currentUserSkills: [],
  currentActivityType: '',
  currentActivityId: null,
  offerId: null,
  currentUserType: '',
  interlocutorId: '',
  messagesCount: 15,
  matchedUser: {
    related_skills: [],
    matched_skills: [],
  },
  currentOffer: {
    related_skills: [],
    matched_skills: [],
  },
  countMyMessages: 0,
  messagesInProgress: [],
  hasNewMessage: false,
  isChatLastViewedRoute: false,
};

const getCountMyMessages = (messages, interlocutorId) =>
  messages.filter((msg) => msg.user_id !== interlocutorId).length;

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POPUP_STATE: {
      return {
        ...state,
        isPopupVisible: action.payload.state,
        popupMessage: action.payload.message,
      };
    }
    case FETCH_ALL_THREADS_SUCCESS: {
      const threads = action.payload.theads || [];
      const sortedByDate = threads.sort((a, b) => moment(b.last_message_date).valueOf() - moment(a.last_message_date).valueOf());

      const dateToDay = moment();
      let hasNoViewedMsg = false;
      const threadsFormettdDate = sortedByDate.map((thread) => {
        if (thread.unread_message_counter && thread.unread_message_counter > 0) {
          hasNoViewedMsg = true;
        }
        const lastMsgDate = moment(thread.last_message_date);
        const diff = dateToDay.diff(lastMsgDate, 'days');

        return { ...thread, last_message_date: diff };
      });

      return { ...state, theads: threadsFormettdDate, hasNewMessage: hasNoViewedMsg };
    }
    case FETCH_ALL_THREADS_FAILURE: {
      return { ...state, isPopupVisible: true, popupMessage: 'Error loading dialogs' };
    }
    case FETCH_THREAD_SUCCESS: {
      const currentThread = omit(action.payload.thread, 'messages');
      const sortedMessages = sortMessagesByDate(action.payload.thread.messages);

      const messagesWithDate = sortedMessages.map((msg, i) => {
        const isLastMsg = sortedMessages.length === i + 1;

        const nextItem = !isLastMsg && sortedMessages[i + 1];
        const showDate = isLastMsg || !isSameDay(msg.date, nextItem.date);
        const storeData = store.getState();
        const locale = storeData.i18nState.lang;
        if (locale === 'en') {
          moment.locale('en-au');
        } else if (locale === 'de') {
          moment.locale('de');
        }
        const formattedDate = moment(msg.date).format('dddd DD.MM.YYYY');
        return {
          ...msg,
          formattedDate,
          showDate,
        };
      });

      const messagesCount = messagesWithDate.length >= state.messagesCount ? messagesWithDate.length : 15;

      return {
        ...state,
        currentThread,
        messagesCount,
        messages: messagesWithDate,
      };
    }
    case FETCH_THREAD_FAILURE: {
      return { ...state, isPopupVisible: true, popupMessage: 'Error loading messages' };
    }
    case SET_THREAD_ID: {
      return { ...state, currentThreadId: action.payload };
    }

    case MESSAGE_SENT: {
      const countMyMessages = action.payload.msg_number;
      const messagesInProgress = [...state.messagesInProgress, countMyMessages];

      const storeData = store.getState();
      const locale = storeData.i18nState.lang;
      if (locale === 'en') {
        moment.locale('en-au');
      } else if (locale === 'de') {
        moment.locale('de');
      }
      const newMessage = {
        id: `${action.payload.msg}${Math.random()}`,
        text: action.payload.message,
        user_id: action.payload.userId,
        date: new Date(),
        isViewed: true,
        showDate: isSameDay(new Date(), state.messages[0]),
        formattedDate: moment(new Date()).format('dddd DD.MM.YYYY'),
        isNoSent: true,
        msg_number: action.payload.msg_number,
      };

      return {
        ...state,
        messages: [newMessage, ...state.messages],
        countMyMessages,
        messagesInProgress,
      };
    }
    case RECEIVED_MESSAGE: {
      const storeData = store.getState();
      const locale = storeData.i18nState.lang;
      if (locale === 'en') {
        moment.locale('en-au');
      } else if (locale === 'de') {
        moment.locale('de');
      }
      const newMessage = {
        id: `${action.payload.msg}${action.payload.date}${Math.random()}`,
        text: action.payload.msg,
        user_id: action.payload.user_id,
        date: action.payload.date,
        isViewed: action.payload.is_viewed,
        showDate: isSameDay(action.payload.date, state.messages[0]),
        formattedDate: moment(action.payload.date).format('dddd DD.MM.YYYY'),
        isNoSent: false,
      };

      const messagesInProgress = [...state.messagesInProgress];
      let messages = [];
      let сount = state.messagesCount;

      const indexSendingMsg = state.messagesInProgress.indexOf(action.payload.msg_number);

      if (action.payload.user_id !== state.interlocutorId && indexSendingMsg !== -1) {
        messagesInProgress.splice(indexSendingMsg, 1);
        messages = state.messages.map((msg) => (msg.msg_number === action.payload.msg_number ? newMessage : msg));
        сount = state.messagesCount + 1;
      } else {
        messages = [newMessage, ...state.messages];
      }

      return {
        ...state,
        messagesCount: сount,
        messagesInProgress,
        messages,
      };
    }
    case ON_STATUS_CHANGE: {
      if (!action.payload.status.is_online && action.payload.status.user_id === state.interlocutorId) {
        let message;
        if (state.currentThread.is_public_interlocutor) {
          message = `${action.payload.status.username} is out of chatroom`;
        } else if (
          !state.currentThread.is_public_interlocutor &&
          state.currentThread &&
          !state.currentThread.interlocutor_is_deactivate
        ) {
          message = `${action.payload.status.username} is out of chatroom`;
        } else {
          message = 'Private profile is out of chat chatroom';
        }

        return {
          ...state,
          isPopupVisible: true,
          popupMessage: message,
        };
      }
      return { ...state };
    }
    case CLEAR_STORAGE: {
      return {
        ...state,
        currentThreadId: '',
        currentThread: {},
        messages: [],
        currentUserProfile: {},
        currentUserSkills: [],
        currentActivityType: '',
        currentActivityId: null,
        offerId: null,
        currentUserType: '',
        interlocutorId: '',
        matchedUser: {
          related_skills: [],
          matched_skills: [],
        },
        currentOffer: {
          related_skills: [],
          matched_skills: [],
        },
      };
    }
    case SET_CURRENT_ACTIVITIES: {
      return {
        ...state,
        currentActivityType: action.payload.activityType,
        currentActivityId: action.payload.activityId,
        offerId: action.payload.offerId,
      };
    }
    case DELETE_THREAD_SUCCESS: {
      const filterDeletedThread = state.theads.filter((thread) => thread.id !== action.payload.threadId);
      return { ...state, theads: filterDeletedThread };
    }
    case DELETE_THREAD_FAILURE: {
      return { ...state, isPopupVisible: true, popupMessage: 'Error delete dialog' };
    }
    case FETCH_USER_INFO_SUCCESS: {
      return { ...state, currentUserProfile: { ...action.payload.userData } };
    }
    case FETCH_USER_INFO_FAILURE: {
      return { ...state, isPopupVisible: true, popupMessage: action.payload.message || 'Error loading user info' };
    }
    case FETCH_USER_PROFILE_SKILLS_SUCCESS: {
      return { ...state, currentUserSkills: [...action.payload.userSkills] };
    }
    case FETCH_USER_PROFILE_SKILLS_FAILURE: {
      return { ...state, isPopupVisible: true, popupMessage: 'Error loading user skills' };
    }
    case FETCH_CURRENT_OFFER_SUCCESS: {
      return { ...state, currentOffer: action.payload.offer };
    }
    case FETCH_CURRENT_OFFER_FAILURE: {
      return { ...state, isPopupVisible: true, popupMessage: 'Error loading user offer' };
    }
    case FETCH_MATCHED_USER_SUCCESS: {
      return { ...state, matchedUser: action.payload.matchedUser };
    }
    case FETCH_MATCHED_USER_FAILURE: {
      return { ...state, isPopupVisible: true, popupMessage: action.payload.message || 'Error loading matched user' };
    }
    case SET_INTERLOCUTOR_ID: {
      const countMyMessages = getCountMyMessages(state.messages, action.payload.interlocutorId);
      return { ...state, countMyMessages, interlocutorId: action.payload.interlocutorId };
    }
    case SET_CURRENT_USER_TYPE: {
      return { ...state, currentUserType: action.payload.userType };
    }
    case SET_NUMBER_OF_MESSAGES: {
      return { ...state, messagesCount: action.payload.count };
    }
    case DELETE_OFFER: {
      const thread = { ...state.currentThread };

      if (Object.keys(state.currentThread).length && state.offerId === action.payload.offerId) {
        if (state.currentUserType === 'candidate') {
          thread.is_deleted_by_creator = true;
        }
      }
      return { ...state, currentThread: thread };
    }
    case THREAD_DELETED_BY_INTERLOCUTOR: {
      const thread = { ...state.currentThread };

      if (Object.keys(thread).length && thread.id === action.payload.threadId) {
        if (state.currentUserType === 'candidate') {
          thread.is_deleted_by_creator = true;
        } else {
          thread.is_deleted_by_candidate = true;
        }
      }
      return { ...state, currentThread: thread };
    }
    case RECEIVED_NEW_MESSAGE:
    case NEW_CHAT_WITH_SUBSTITUTE: {
      return { ...state, hasNewMessage: true };
    }
    case SET_VIEWED_NEW_MESSAGE: {
      return { ...state, hasNewMessage: false };
    }
    case SET_LAST_VIEWED_ROUTE: {
      return { ...state, isChatLastViewedRoute: action.payload.route };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default chatReducer;
