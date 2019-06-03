export const SET_THREAD_ID = 'SET_THREAD_ID';
export const setThreadId = (threadId) => ({
  type: SET_THREAD_ID,
  payload: threadId,
});

export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE';
export const receivedMessage = (message) => ({
  type: RECEIVED_MESSAGE,
  payload: message,
});

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const MESSAGE_SENT = 'MESSAGE_SENT';
export const messageSent = (message) => ({
  type: MESSAGE_SENT,
  payload: message,
});
export const CLEAR_STORAGE = 'CLEAR_STORAGE';
export const clearStorage = () => ({
  type: CLEAR_STORAGE,
});

export const SET_POPUP_STATE = 'SET_POPUP_STATE';
export const setPopupState = (state, message) => ({
  type: SET_POPUP_STATE,
  payload: { state, message },
});

export const FETCH_ALL_THREADS = 'FETCH_ALL_THREADS';
export const fetchAllTheads = (callback) => ({
  type: FETCH_ALL_THREADS,
  payload: { callback },
});

export const FETCH_ALL_THREADS_SUCCESS = 'FETCH_ALL_THREADS_SUCCESS';
export const fetchAllThreadsSuccess = (theads) => ({
  type: FETCH_ALL_THREADS_SUCCESS,
  payload: { theads },
});

export const FETCH_ALL_THREADS_FAILURE = 'FETCH_ALL_THREADS_FAILURE';
export const fetchAllThreadsFailure = () => ({
  type: FETCH_ALL_THREADS_FAILURE,
});

export const FETCH_THREAD = 'FETCH_THREAD';
export const fetchThread = (threadId, callback) => ({
  type: FETCH_THREAD,
  payload: { threadId, callback },
});

export const FETCH_THREAD_SUCCESS = 'FETCH_THREAD_SUCCESS';
export const fetchThreadSuccess = (thread) => ({
  type: FETCH_THREAD_SUCCESS,
  payload: { thread },
});

export const FETCH_THREAD_FAILURE = 'FETCH_THREAD_FAILURE';
export const fetchThreadFailure = () => ({
  type: FETCH_THREAD_FAILURE,
});

export const ON_STATUS_CHANGE = 'ON_STATUS_CHANGE';
export const onStatusChange = (status) => ({
  type: ON_STATUS_CHANGE,
  payload: { status },
});

export const DELETE_THREAD = 'DELETE_THREAD';
export const deleteThread = (threadId) => ({
  type: DELETE_THREAD,
  payload: { threadId },
});

export const DELETE_THREAD_SUCCESS = 'DELETE_THREAD_SUCCESS';
export const deleteThreadSuccess = (threadId) => ({
  type: DELETE_THREAD_SUCCESS,
  payload: { threadId },
});

export const DELETE_THREAD_FAILURE = 'DELETE_THREAD_FAILURE';
export const deleteThreadFailure = () => ({
  type: DELETE_THREAD_FAILURE,
});

export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const fetchUserInfo = (userId) => ({
  type: FETCH_USER_INFO,
  payload: { userId },
});

export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const fetchUserInfoSuccess = (userData) => ({
  type: FETCH_USER_INFO_SUCCESS,
  payload: { userData },
});

export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';
export const fetchUserInfoFailure = (message) => ({
  type: FETCH_USER_INFO_FAILURE,
  payload: {
    message,
  },
});

export const FETCH_USER_PROFILE_SKILLS = 'FETCH_USER_PROFILE_SKILLS_';
export const fetchUserProfileSkills = (userId, callback) => ({
  type: FETCH_USER_PROFILE_SKILLS,
  payload: { userId, callback },
});

export const FETCH_USER_PROFILE_SKILLS_SUCCESS = 'FETCH_USER_PROFILE_SKILLS_SUCCESS';
export const fetchUserProfileSkillsSuccess = (userSkills) => ({
  type: FETCH_USER_PROFILE_SKILLS_SUCCESS,
  payload: { userSkills },
});

export const FETCH_USER_PROFILE_SKILLS_FAILURE = 'FETCH_USER_PROFILE_SKILLS_FAILURE';
export const fetchUserProfileSkillsFailure = () => ({
  type: FETCH_USER_PROFILE_SKILLS_FAILURE,
});

export const SET_CURRENT_ACTIVITIES = 'SET_CURRENT_ACTIVITIES';
export const setCurrentActivities = (activityId, activityType, offerId) => ({
  type: SET_CURRENT_ACTIVITIES,
  payload: { activityId, activityType, offerId },
});

export const FETCH_CURRENT_OFFER = 'FETCH_CURRENT_OFFER';
export const fetchCurrentOffer = (offerId, offerType, callback) => ({
  type: FETCH_CURRENT_OFFER,
  payload: { offerId, offerType, callback },
});

export const FETCH_CURRENT_OFFER_SUCCESS = 'FETCH_CURRENT_OFFER_SUCCESS';
export const fetchCurrentOfferSuccess = (offer) => ({
  type: FETCH_CURRENT_OFFER_SUCCESS,
  payload: { offer },
});

export const FETCH_CURRENT_OFFER_FAILURE = 'FETCH_CURRENT_OFFER_FAILURE';
export const fetchCurrentOfferFailure = () => ({
  type: FETCH_CURRENT_OFFER_FAILURE,
});

export const SET_INTERLOCUTOR_ID = 'SET_INTERLOCUTOR_ID';
export const setInterlocutorId = (interlocutorId) => ({
  type: SET_INTERLOCUTOR_ID,
  payload: { interlocutorId },
});

export const SET_CURRENT_USER_TYPE = 'SET_CURRENT_USER_TYPE';
export const setCurrentUserType = (userType) => ({
  type: SET_CURRENT_USER_TYPE,
  payload: { userType },
});

export const FETCH_MATCHED_USER = 'FETCH_MATCHED_USER';
export const fetchMatchedUser = (activityId, userId, activityType, callback) => ({
  type: FETCH_MATCHED_USER,
  payload: { activityId, userId, activityType, callback },
});

export const FETCH_MATCHED_USER_SUCCESS = 'FETCH_MATCHED_USER_SUCCESS';
export const fetchMatchedUserSuccess = (matchedUser) => ({
  type: FETCH_MATCHED_USER_SUCCESS,
  payload: { matchedUser },
});

export const FETCH_MATCHED_USER_FAILURE = 'FETCH_MATCHED_USER_FAILURE';
export const fetchMatchedUserFailure = (message) => ({
  type: FETCH_MATCHED_USER_FAILURE,
  payload: {
    message,
  },
});

export const VIEW_MESSAGES = 'VIEW_MESSAGES';
export const viewMessages = (messagesIds) => ({
  type: VIEW_MESSAGES,
  payload: { messagesIds },
});

export const VIEW_SINGLE_MESSAGE = 'VIEW_SINGLE_MESSAGE';
export const viewSingleMessage = (message) => ({
  type: VIEW_SINGLE_MESSAGE,
  payload: { message },
});

export const SET_NUMBER_OF_MESSAGES = 'SET_NUMBER_OF_MESSAGES';
export const setNumberOfMessages = (count) => ({
  type: SET_NUMBER_OF_MESSAGES,
  payload: { count },
});

export const JOIN_THREAD = 'JOIN_THREAD';
export const joinThread = ({ offerId, activityType, senderId, threadId }) => ({
  type: JOIN_THREAD,
  payload: {
    offerId,
    activityType,
    senderId,
    threadId,
  },
});

export const LEAVE_THREAD = 'LEAVE_THREAD';
export const leaveThread = (threadId, currentUserId) => ({
  type: LEAVE_THREAD,
  payload: {
    threadId,
    currentUserId,
  },
});

export const SET_VIEWED_NEW_MESSAGE = 'SET_VIEWED_NEW_MESSAGE';
export const setViewdNewMessage = () => ({
  type: SET_VIEWED_NEW_MESSAGE,
});

export const REJOIN_TO_THREAD = 'REJOIN_TO_THREAD';
export const rejoinToThread = () => ({
  type: REJOIN_TO_THREAD,
});

export const SET_LAST_VIEWED_ROUTE = 'SET_VIEWED_ROUTE';
export const setLastViewedRoute = (route) => ({
  type: SET_LAST_VIEWED_ROUTE,
  payload: {
    route,
  },
});
