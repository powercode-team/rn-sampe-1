export const SET_ACTIVE_TAB_INDEX = 'SET_ACTIVE_TAB_INDEX';

export const setActiveTabIndex = (index) => ({
  type: SET_ACTIVE_TAB_INDEX,
  payload: {
    index,
  },
});

export const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';
export const setActiveItem = (data) => ({
  type: SET_ACTIVE_ITEM,
  payload: {
    data,
  },
});

export const CLEAR_ACTIVE_ITEM = 'CLEAR_ACTIVE_ITEM';
export const clearActiveItem = () => ({
  type: CLEAR_ACTIVE_ITEM,
});

export const FETCH_MATCHING_JOB = 'FETCH_MATCHING_JOB';
export const fetchMatchingJob = (id, callback) => ({
  type: FETCH_MATCHING_JOB,
  payload: { id, callback },
});

export const FETCH_MATCHING_JOB_SUCCESS = 'FETCH_MATCHING_JOB_SUCCESS';
export const fetchMatchingJobSuccess = (jobData) => ({
  type: FETCH_MATCHING_JOB_SUCCESS,
  payload: jobData,
});

export const FETCH_MATCHING_JOB_FAILURE = 'FETCH_MATCHING_JOB_FAILURE';
export const fetchMatchingJobFailure = (error) => ({
  type: FETCH_MATCHING_JOB_FAILURE,
  payload: error,
});

export const FETCH_MATCHING_TASK = 'FETCH_MATCHING_TASK';
export const fetchMatchingTask = (id, callback) => ({
  type: FETCH_MATCHING_TASK,
  payload: { id, callback },
});

export const FETCH_MATCHING_TASK_SUCCESS = 'FETCH_MATCHING_TASK_SUCCESS';
export const fetchMatchingTaskSuccess = (taskData) => ({
  type: FETCH_MATCHING_TASK_SUCCESS,
  payload: taskData,
});

export const FETCH_MATCHING_TASK_FAILURE = 'FETCH_MATCHING_TASK_FAILURE';
export const fetchMatchingTaskFailure = (error) => ({
  type: FETCH_MATCHING_TASK_FAILURE,
  payload: error,
});

export const UPDATE_MATCHING_FOR_JOB = 'UPDATE_MATCHING_FOR_JOB';
export const updateMatchingForJob = (jobId, callback) => ({
  type: UPDATE_MATCHING_FOR_JOB,
  payload: {
    jobId,
    callback,
  },
});

export const UPDATE_MATCHING_FOR_JOB_SUCCESS = 'UPDATE_MATCHING_FOR_JOB_SUCCESS';
export const updateMatchingForJobSuccess = (matchingInfo) => ({
  type: UPDATE_MATCHING_FOR_JOB_SUCCESS,
  payload: matchingInfo,
});

export const UPDATE_MATCHING_FOR_JOB_FAILURE = 'UPDATE_MATCHING_FOR_JOB_FAILURE';
export const updateMatchingForJobFailure = (error) => ({
  type: UPDATE_MATCHING_FOR_JOB_FAILURE,
  payload: error,
});

export const UPDATE_MATCHING_FOR_TASK = 'UPDATE_MATCHING_FOR_TASK';
export const updateMatchingForTask = (taskId, callback) => ({
  type: UPDATE_MATCHING_FOR_TASK,
  payload: {
    taskId,
    callback,
  },
});

export const UPDATE_MATCHING_FOR_TASK_SUCCESS = 'UPDATE_MATCHING_FOR_TASK_SUCCESS';
export const updateMatchingForTaskSuccess = (matchingInfo) => ({
  type: UPDATE_MATCHING_FOR_TASK_SUCCESS,
  payload: matchingInfo,
});

export const UPDATE_MATCHING_FOR_TASK_FAILURE = 'UPDATE_MATCHING_FOR_TASK_FAILURE';
export const updateMatchingForTaskFailure = (error) => ({
  type: UPDATE_MATCHING_FOR_TASK_FAILURE,
  payload: error,
});

export const INVITE_ALL_CANDIDATES = 'INVITE_ALL_CANDIDATES';
export const inviteAllCandidates = (type, activityId, cb) => ({
  type: INVITE_ALL_CANDIDATES,
  payload: {
    type,
    activityId,
    cb,
  },
});

export const INVITE_ALL_CANDIDATES_SUCCESS = 'INVITE_ALL_CANDIDATES_SUCCESS';
export const inviteAllCandidatesSuccess = () => ({
  type: INVITE_ALL_CANDIDATES_SUCCESS,
});

export const INVITE_ALL_CANDIDATES_FAILURE = 'INVITE_ALL_CANDIDATES_FAILURE';
export const inviteAllCandidatesFailure = () => ({
  type: INVITE_ALL_CANDIDATES_FAILURE,
});

export const SET_USER_IN_REVIEW = 'SET_USER_IN_REVIEW';
export const setUserInReview = (user) => ({
  type: SET_USER_IN_REVIEW,
  payload: user,
});

export const SET_SWIPEABLE_CANDIDATES = 'SET_SWIPEABLE_CANDIDATES';
export const setSwipeableCandidates = (candidates) => ({
  type: SET_SWIPEABLE_CANDIDATES,
  payload: {
    candidates,
  },
});

export const CLEAR_USER_IN_REVIEW = 'CLEAR_USER_IN_REVIEW';
export const clearUserInReview = () => ({
  type: CLEAR_USER_IN_REVIEW,
});

export const CLEAR_MATCHING_INFO = 'CLEAR_MATCHING_INFO';
export const clearMatchingInfo = () => ({
  type: CLEAR_MATCHING_INFO,
});

export const FETCH_SELECTED_USER_SKILLS = 'FETCH_SELECTED_USER_SKILLS';
export const fetchSelectedUserSkills = (userId) => ({
  type: FETCH_SELECTED_USER_SKILLS,
  payload: {
    userId,
  },
});

export const FETCH_SELECTED_USER_SKILLS_SUCCESS = 'FETCH_SELECTED_USER_SKILLS_SUCCESS';
export const fetchSelectedUserSkillsSuccess = (skills) => ({
  type: FETCH_SELECTED_USER_SKILLS_SUCCESS,
  payload: {
    skills,
  },
});

export const FETCH_SELECTED_USER_SKILLS_FAILURE = 'FETCH_SELECTED_USER_SKILLS_FAILURE';
export const fetchSelectedUserSkillsFailure = () => ({
  type: FETCH_SELECTED_USER_SKILLS_FAILURE,
});

export const CHANGE_OFFER_STATUS_CONTROLLER = 'CHANGE_OFFER_STATUS_CONTROLLER';
export const changeOfferStatusController = (data) => ({
  type: CHANGE_OFFER_STATUS_CONTROLLER,
  payload: {
    data,
  },
});

export const SET_OFFER_STATUS_ACCEPTED = 'SET_OFFER_STATUS_ACCEPTED';
export const setOfferStatusAccepted = (data) => ({
  type: SET_OFFER_STATUS_ACCEPTED,
  payload: { ...data },
});

export const SET_OFFER_STATUS_ACCEPTED_SUCCESS = 'SET_OFFER_STATUS_ACCEPTED_SUCCESS';
export const setOfferStatusAcceptedSuccess = (userId, type, status) => ({
  type: SET_OFFER_STATUS_ACCEPTED_SUCCESS,
  payload: {
    status,
    userId,
    type,
  },
});

export const SET_OFFER_STATUS_ACCEPTED_FAILURE = 'SET_OFFER_STATUS_ACCEPTED_FAILURE';
export const setOfferStatusAcceptedFailure = () => ({
  type: SET_OFFER_STATUS_ACCEPTED_FAILURE,
});

export const SET_OFFER_STATUS_REJECTED = 'SET_OFFER_STATUS_REJECTED';
export const setOfferStatusRejected = (data) => ({
  type: SET_OFFER_STATUS_REJECTED,
  payload: { ...data },
});

export const SET_OFFER_STATUS_REJECTED_SUCCESS = 'SET_OFFER_STATUS_REJECTED_SUCCESS';
export const setOfferStatusRejectedSuccess = (userId, type, status) => ({
  type: SET_OFFER_STATUS_REJECTED_SUCCESS,
  payload: {
    status,
    userId,
    type,
  },
});

export const SET_OFFER_STATUS_REJECTED_FAILURE = 'SET_OFFER_STATUS_REJECTED_FAILURE';
export const setOfferStatusRejectedFailure = () => ({
  type: SET_OFFER_STATUS_REJECTED_FAILURE,
});

export const CHANGE_MATCHING_OFFER_STATUS = 'CHANGE_MATCHING_OFFER_STATUS';
export const changeMatchingOfferStatus = (data) => ({
  type: CHANGE_MATCHING_OFFER_STATUS,
  payload: { ...data },
});

export const CHANGE_MATCHING_OFFER_STATUS_SUCCESS = 'CHANGE_MATCHING_OFFER_STATUS_SUCCESS';
export const changeMatchingOfferStatusSuccess = (userId, status) => ({
  type: CHANGE_MATCHING_OFFER_STATUS_SUCCESS,
  payload: {
    userId,
    status,
  },
});

export const CHANGE_MATCHING_OFFER_STATUS_FAILURE = 'CHANGE_MATCHING_OFFER_STATUS_FAILURE';
export const changeMatchingOfferStatusFailure = () => ({
  type: CHANGE_MATCHING_OFFER_STATUS_FAILURE,
});

export const SET_MATCHING_SORTING_TYPE = 'SET_MATCHING_SORTING_TYPE';
export const setMatchingSortingType = (sortingType) => ({
  type: SET_MATCHING_SORTING_TYPE,
  payload: {
    sortingType,
  },
});

export const CHECK_AND_CLEAR_SWIPEABLE_LIST = 'CHECK_AND_CLEAR_SWIPEABLE_LIST';
export const checkAndClearSwipeableList = () => ({
  type: CHECK_AND_CLEAR_SWIPEABLE_LIST,
});

export const SET_SWIPE_ITEM_INDEX = 'SET_SWIPE_ITEM_INDEX';
export const setSwipeItemIndex = (index) => ({
  type: SET_SWIPE_ITEM_INDEX,
  payload: {
    index,
  },
});

export const MARK_CANDIDATE_AS_VIEWED = 'MARK_CANDIDATE_AS_VIEWED';
export const markCandidateAsViewed = (type, id, candidateId) => ({
  type: MARK_CANDIDATE_AS_VIEWED,
  payload: {
    type,
    id,
    candidateId,
  },
});

export const MARK_CANDIDATE_AS_VIEWED_SUCCESS = 'MARK_CANDIDATE_AS_VIEWED_SUCCESS';
export const markCandidateAsViewedSuccess = (type, candidateId) => ({
  type: MARK_CANDIDATE_AS_VIEWED_SUCCESS,
  payload: {
    type,
    candidateId,
  },
});

export const MARK_CANDIDATE_AS_VIEWED_FAILURE = 'MARK_CANDIDATE_AS_VIEWED_FAILURE';
export const markCandidateAsViewedFailure = () => ({
  type: MARK_CANDIDATE_AS_VIEWED_FAILURE,
});

export const SET_MATCHING_FILTER_VALUE = 'SET_MATCHING_FILTER_VALUE';
export const setMatchingFilterValue = (value) => ({
  type: SET_MATCHING_FILTER_VALUE,
  payload: {
    value,
  },
});

export const FILTER_MATCHING_USERS = 'FILTER_MATCHING_USERS';
export const filterMatchingUsers = (activityType, activityId, skillsCount, senioritiesNames, cb) => ({
  type: FILTER_MATCHING_USERS,
  payload: { activityType, activityId, skillsCount, senioritiesNames, cb },
});

export const FILTER_MATCHING_USERS_SUCCESS = 'FILTER_MATCHING_USERS_SUCCESS';
export const filterMatchingUsersSuccess = (filteredUsers) => ({
  type: FILTER_MATCHING_USERS_SUCCESS,
  payload: { filteredUsers },
});

export const FILTER_MATCHING_USERS_FAILURE = 'FILTER_MATCHING_USERS_FAILURE';
export const filterMatchingUsersFailure = () => ({
  type: FILTER_MATCHING_USERS_FAILURE,
});

export const RESET_FILTER = 'RESET_FILTER';
export const resetFilter = () => ({
  type: RESET_FILTER,
});

export const FULL_MATCHING_FILTER_RESET = 'FULL_MATCHING_FILTER_RESET';
export const fullMatchingFilterReset = () => ({
  type: FULL_MATCHING_FILTER_RESET,
});

export const SET_ACTIVITY_DATA_FOR_FILTER = 'SET_ACTIVITY_DATA_FOR_FILTER';
export const setActivityDataForFilter = (activityType, matchingTab, seniorities) => ({
  type: SET_ACTIVITY_DATA_FOR_FILTER,
  payload: { activityType, matchingTab, seniorities },
});

export const CHANGE_SENIORITY_CHECKBOX_STATE = 'CHANGE_SENIORITY_CHECKBOX_STATE';
export const changeSeniorityCheckboxState = (name, newState) => ({
  type: CHANGE_SENIORITY_CHECKBOX_STATE,
  payload: {
    name,
    newState,
  },
});
