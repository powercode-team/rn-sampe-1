export const FETCH_ARCHIVE_JOBS = 'FETCH_ARCHIVE_JOBS';
export const fetchArchiveJobs = (successCallback) => ({
  type: FETCH_ARCHIVE_JOBS,
  payload: { successCallback },
});

export const FETCH_ARCHIVE_JOBS_SUCCESS = 'FETCH_ARCHIVE_JOBS_SUCCESS';
export const fetchArchiveJobsSuccess = (payload) => ({
  type: FETCH_ARCHIVE_JOBS_SUCCESS,
  payload,
});

export const FETCH_ARCHIVE_JOBS_FAILURE = 'FETCH_ARCHIVE_JOBS_FAILURE';
export const fetchArchiveJobsFailure = (payload) => ({
  type: FETCH_ARCHIVE_JOBS_FAILURE,
  payload,
});

export const FETCH_ARCHIVE_TASKS = 'FETCH_ARCHIVE_TASKS';
export const fetchArchiveTasks = (successCallback) => ({
  type: FETCH_ARCHIVE_TASKS,
  payload: { successCallback },
});

export const FETCH_ARCHIVE_TASKS_SUCCESS = 'FETCH_ARCHIVE_TASKS_SUCCESS';
export const fetchArchiveTasksSuccess = (payload) => ({
  type: FETCH_ARCHIVE_TASKS_SUCCESS,
  payload,
});

export const FETCH_ARCHIVE_TASKS_FAILURE = 'FETCH_ARCHIVE_TASKS_FAILURE';
export const fetchArchiveTasksFailure = (payload) => ({
  type: FETCH_ARCHIVE_TASKS_FAILURE,
  payload,
});

export const FETCH_ARCHIVED_ENTITIES = 'FETCH_ARCHIVED_ENTITIES';
export const fetchArchivedEntities = (cb) => ({
  type: FETCH_ARCHIVED_ENTITIES,
  payload: {
    cb,
  },
});

export const FETCH_ARCHIVED_ENTITIES_FAILURE = 'FETCH_ARCHIVED_ENTITIES_FAILURE';
export const fetchArchivedEntitiesFailure = () => ({
  type: FETCH_ARCHIVED_ENTITIES_FAILURE,
});

export const SET_ACTIVE_MATCHING_ARCHIVE_SORT = 'SET_ACTIVE_MATCHING_ARCHIVE_SORT';
export const setActiveSort = (sort) => ({
  type: SET_ACTIVE_MATCHING_ARCHIVE_SORT,
  payload: {
    sort,
  },
});

export const SET_ACTIVE_MATCHING_ARCHIVE_TAB_INDEX = 'SET_ACTIVE_MATCHING_ARCHIVE_TAB_INDEX';
export const setActiveTabIndex = (index) => ({
  type: SET_ACTIVE_MATCHING_ARCHIVE_TAB_INDEX,
  payload: {
    index,
  },
});

export const DELETE_JOB = 'DELETE_JOB';
export const deleteJob = (id, callback) => ({
  type: DELETE_JOB,
  payload: { id, callback },
});

export const DELETE_JOB_SUCCESS = 'DELETE_JOB_SUCCESS';
export const deleteJobSuccess = (id) => ({
  type: DELETE_JOB_SUCCESS,
  payload: {
    id,
  },
});

export const DELETE_JOB_FAILURE = 'DELETE_JOB_FAILURE';
export const deleteJobFailure = (errorMsg) => ({
  type: DELETE_JOB_FAILURE,
  payload: {
    errorMsg,
  },
});

export const DELETE_TASK = 'DELETE_TASK';
export const deleteTask = (id, callback) => ({
  type: DELETE_TASK,
  payload: { id, callback },
});

export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  payload: {
    id,
  },
});

export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';
export const deleteTaskFailure = (errorMsg) => ({
  type: DELETE_TASK_FAILURE,
  payload: {
    errorMsg,
  },
});

export const FETCH_ARCHIVE_FILTER_LOCATIONS = 'FETCH_ARCHIVE_FILTER_LOCATIONS';
export const fetchArchiveFilterLocations = (cb) => ({
  type: FETCH_ARCHIVE_FILTER_LOCATIONS,
  payload: {
    cb,
  },
});

export const FETCH_ARCHIVE_FILTER_LOCATIONS_SUCCESS = 'FETCH_ARCHIVE_FILTER_LOCATIONS_SUCCESS';
export const fetchArchiveFilterLocationsSuccess = (locations) => ({
  type: FETCH_ARCHIVE_FILTER_LOCATIONS_SUCCESS,
  payload: {
    locations,
  },
});

export const FETCH_ARCHIVE_FILTER_LOCATIONS_FAILURE = 'FETCH_ARCHIVE_FILTER_LOCATIONS_FAILURE';
export const fetchArchiveFilterLocationsFailure = () => ({
  type: FETCH_ARCHIVE_FILTER_LOCATIONS_FAILURE,
});

export const CHECK_MATCHING_ARCHIVE_LOCATION = 'CHECK_MATCHING_ARCHIVE_LOCATION';
export const checkMatchingArchiveLocations = (locationId) => ({
  type: CHECK_MATCHING_ARCHIVE_LOCATION,
  payload: {
    locationId,
  },
});

export const APPLY_MATCHING_ARCHIVE_FILTER = 'APPLY_MATCHING_ARCHIVE_FILTER';
export const applyMatchingArchiveFilter = (locations, accounts, currentTab, cb) => ({
  type: APPLY_MATCHING_ARCHIVE_FILTER,
  payload: {
    locations,
    accounts,
    currentTab,
    cb,
  },
});

export const APPLY_MATCHING_ARCHIVE_FILTER_SUCCESS = 'APPLY_MATCHING_ARCHIVE_FILTER_SUCCESS';
export const applyMatchingArchiveFilterSuccess = (entities, currentTab) => ({
  type: APPLY_MATCHING_ARCHIVE_FILTER_SUCCESS,
  payload: {
    entities,
    currentTab,
  },
});

export const APPLY_MATCHING_ARCHIVE_FILTER_FAILURE = 'APPLY_MATCHING_ARCHIVE_FILTER_FAILURE';
export const applyMatchingArchiveFilterFailure = () => ({
  type: APPLY_MATCHING_ARCHIVE_FILTER_FAILURE,
});

export const RESET_MATCHING_ARCHIVE_FILTER = 'RESET_MATCHING_ARCHIVE_FILTER';
export const resetMatchingArchiveFilter = (currentTab, cb) => ({
  type: RESET_MATCHING_ARCHIVE_FILTER,
  payload: {
    currentTab,
    cb,
  },
});

export const FETCH_LOCATIONS_JOBS_TASKS = 'FETCH_LOCATIONS_JOBS_TASKS';
export const fetchLocationsJobsTask = (callback) => ({
  type: FETCH_LOCATIONS_JOBS_TASKS,
  callback,
});

export const SET_LOCATIONS_JOBS_TASKS = 'SET_LOCATIONS_JOBS_TASKS';
export const setLocationsJobsTask = (locations) => ({
  type: SET_LOCATIONS_JOBS_TASKS,
  locations,
});

export const SET_ARCHIVE_ENTITY_ITEM = 'SET_ARCHIVE_ENTITY_ITEM';
export const setArchiveEntityItem = (entity) => ({
  type: SET_ARCHIVE_ENTITY_ITEM,
  payload: {
    entity,
  },
});

export const RESET_MATCHING_ARCHIVE = 'RESET_MATCHING_ARCHIVE';
export const resetMatchingArchive = () => ({
  type: RESET_MATCHING_ARCHIVE,
});

export const CLOSE_ARCHIVE_ERROR_POPUP = 'CLOSE_ARCHIVE_ERROR_POPUP';
export const closeArchiveErrorPopup = () => ({
  type: CLOSE_ARCHIVE_ERROR_POPUP,
});

export const CHECK_ARCHIVE_ACCOUNT_FILTER = 'CHECK_ARCHIVE_ACCOUNT_FILTER';
export const checkArchiveAccountFilter = (accountId) => ({
  type: CHECK_ARCHIVE_ACCOUNT_FILTER,
  payload: {
    accountId,
  },
});
