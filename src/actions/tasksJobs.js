export const FETCH_ALL_JOBS = 'FETCH_ALL_JOBS';
export const fetchAllJobs = (successCallback) => ({
  type: FETCH_ALL_JOBS,
  payload: { successCallback },
});

export const FETCH_ALL_JOBS_SUCCESS = 'FETCH_ALL_JOBS_SUCCESS';
export const fetchAllJobsSuccess = (payload) => ({
  type: FETCH_ALL_JOBS_SUCCESS,
  payload,
});

export const FETCH_ALL_JOBS_FAILURE = 'FETCH_ALL_JOBS_FAILURE';
export const fetchAllJobsFailure = (payload) => ({
  type: FETCH_ALL_JOBS_FAILURE,
  payload,
});

export const FETCH_ALL_TASKS = 'FETCH_ALL_TASKS';
export const fetchAllTasks = (successCallback) => ({
  type: FETCH_ALL_TASKS,
  payload: { successCallback },
});

export const FETCH_ALL_TASKS_SUCCESS = 'FETCH_ALL_TASKS_SUCCESS';
export const fetchAllTasksSuccess = (payload) => ({
  type: FETCH_ALL_TASKS_SUCCESS,
  payload,
});

export const FETCH_ALL_TASKS_FAILURE = 'FETCH_ALL_TASKS_FAILURE';
export const fetchAllTasksFailure = (payload) => ({
  type: FETCH_ALL_TASKS_FAILURE,
  payload,
});

export const SORT_TASKS_OR_JOBS = 'SORT_TASKS_OR_JOBS';
export const sortTasksOrJob = (whatSort, sortBy) => ({
  type: SORT_TASKS_OR_JOBS,
  sortBy,
  whatSort,
});

export const CREATE_TASK = 'CREATE_TASK';
export const createTask = (data, callback) => ({
  type: CREATE_TASK,
  payload: { data, callback },
});

export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const createTaskSuccess = (payload) => ({
  type: CREATE_TASK_SUCCESS,
  payload,
});

export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';
export const createTaskFailure = (error) => ({
  type: CREATE_TASK_FAILURE,
  payload: { error },
});

export const CREATE_JOB = 'CREATE_JOB';
export const createJob = (data, callback) => ({
  type: CREATE_JOB,
  payload: { data, callback },
});

export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const createJobSuccess = (payload) => ({
  type: CREATE_JOB_SUCCESS,
  payload,
});

export const CREATE_JOB_FAILURE = 'CREATE_JOB_FAILURE';
export const createJobFailure = (error) => ({
  type: CREATE_JOB_FAILURE,
  payload: { error },
});

export const UPDATE_JOB = 'UPDATE_JOB';
export const updateJob = (jobData, callback) => ({
  type: UPDATE_JOB,
  payload: { jobData, callback },
});

export const UPDATE_JOB_SUCCESS = 'UPDATE_JOB_SUCCESS';
export const updateJobSuccess = (updatedJob) => ({
  type: UPDATE_JOB_SUCCESS,
  payload: { ...updatedJob },
});

export const UPDATE_JOB_FAILURE = 'UPDATE_JOB_FAILURE';
export const updateJobFailure = (error) => ({
  type: UPDATE_JOB_FAILURE,
  payload: { error },
});

export const UPDATE_TASK = 'UPDATE_TASK';
export const updateTask = (taskData, callback) => ({
  type: UPDATE_TASK,
  payload: { taskData, callback },
});

export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const updateTaskSuccess = (updatedTask) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: { ...updatedTask },
});

export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  payload: { error },
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

export const SET_FIRST_MOUNT_STATUS = 'SET_FIRST_MOUNT_STATUS';
export const setFirstMountStatus = () => ({
  type: SET_FIRST_MOUNT_STATUS,
});

export const SET_ACTIVE_ACTIVITIES_TAB_INDEX = 'SET_ACTIVE_ACTIVITIES_TAB_INDEX';
export const setActivesActivitiesTabIndex = (index) => ({
  type: SET_ACTIVE_ACTIVITIES_TAB_INDEX,
  payload: {
    index,
  },
});

export const FETCH_FILTER_LOCATIONS = 'FETCH_FILTER_LOCATIONS';
export const fetchFilterLocations = (cb) => ({
  type: FETCH_FILTER_LOCATIONS,
  payload: {
    cb,
  },
});

export const FETCH_FILTER_LOCATIONS_SUCCESS = 'FETCH_FILTER_LOCATIONS_SUCCESS';
export const fetchFilterLocationsSuccess = (locations) => ({
  type: FETCH_FILTER_LOCATIONS_SUCCESS,
  payload: {
    locations,
  },
});

export const FETCH_FILTER_LOCATIONS_FAILURE = 'FETCH_FILTER_LOCATIONS_FAILURE';
export const fetchFilterLocationsFailure = () => ({
  type: FETCH_FILTER_LOCATIONS_FAILURE,
});

export const CHECK_LOCATION_FILTER = 'CHECK_LOCATION_FILTER';
export const checkLocationFilter = (locationId) => ({
  type: CHECK_LOCATION_FILTER,
  payload: {
    locationId,
  },
});

export const APPLY_ACTIVITY_FILTER = 'APPLY_ACTIVITY_FILTER';
export const applyActivityFilter = (locations, accounts, currentTab, cb) => ({
  type: APPLY_ACTIVITY_FILTER,
  payload: {
    locations,
    accounts,
    currentTab,
    cb,
  },
});

export const APPLY_ACTIVITY_FILTER_SUCCESS = 'APPLY_ACTIVITY_FILTER_SUCCESS';
export const applyActivityFilterSuccess = (entities, currentTab) => ({
  type: APPLY_ACTIVITY_FILTER_SUCCESS,
  payload: {
    entities,
    currentTab,
  },
});

export const APPLY_ACTIVITY_FILTER_FAILURE = 'APPLY_ACTIVITY_FILTER_FAILURE';
export const applyActivityFilterFailure = () => ({
  type: APPLY_ACTIVITY_FILTER_FAILURE,
});

export const RESET_ACTIVITY_FILTER = 'RESET_ACTIVITY_FILTER';
export const resetActivityFilter = (currentTab, cb) => ({
  type: RESET_ACTIVITY_FILTER,
  payload: {
    currentTab,
    cb,
  },
});

export const CHECK_ACCOUNT_FILTER = 'CHECK_ACCOUNT_FILTER';
export const checkAccountFilter = (accountId) => ({
  type: CHECK_ACCOUNT_FILTER,
  payload: {
    accountId,
  },
});

export const SET_FILTER_ACCOUNTS = 'SET_FILTER_ACCOUNTS';
export const setFilterAccounts = (accounts) => ({
  type: SET_FILTER_ACCOUNTS,
  payload: {
    accounts,
  },
});

export const ARCHIVE_ENTITY = 'ARCHIVE_ENTITY';
export const archiveEntity = (id, type, cb) => ({
  type: ARCHIVE_ENTITY,
  payload: {
    id,
    type,
    cb,
  },
});

export const ARCHIVE_ENTITY_SUCCESS = 'ARCHIVE_ENTITY_SUCCESS';
export const archiveEntitySuccess = (id, type) => ({
  type: ARCHIVE_ENTITY_SUCCESS,
  payload: {
    id,
    type,
  },
});

export const ARCHIVE_ENTITY_FAILURE = 'ARCHIVE_ENTITY_FAILURE';
export const archiveEntityFailure = (message) => ({
  type: ARCHIVE_ENTITY_FAILURE,
  payload: {
    message,
  },
});

export const SHOW_SEARCHES_POPUP = 'SHOW_SEARCHES_POPUP';
export const showSearchesPopup = (message) => ({
  type: SHOW_SEARCHES_POPUP,
  payload: {
    message,
  },
});

export const CLOSE_SEARCHES_POPUP = 'CLOSE_SEARCHES_POPUP';
export const closeSearchesPopup = () => ({
  type: CLOSE_SEARCHES_POPUP,
});
