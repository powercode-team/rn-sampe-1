export const FILL_USER_PROFILE = 'FILL_USER_PROFILE';
export const fillUserProfile = (fields) => ({
  type: FILL_USER_PROFILE,
  payload: fields,
});

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const changePassword = (fields, afterRequest) => ({
  type: CHANGE_PASSWORD,
  payload: {
    data: fields,
    afterRequest,
  },
});

export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const changePasswordSuccess = () => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const changePasswordFailure = () => ({
  type: CHANGE_PASSWORD_FAILURE,
});

export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = (fields, afterRequest) => ({
  type: UPDATE_USER,
  payload: {
    body: fields,
    afterRequest,
  },
});

export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const updateUserSuccess = (payload) => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});

export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE,
});

export const UPDATE_AVATAR = 'UPDATE_AVATAR';
export const updateAvatar = (fields, afterRequest) => ({
  type: UPDATE_AVATAR,
  payload: {
    body: fields,
    afterRequest,
  },
});

export const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS';
export const updateAvatarSuccess = (fields) => ({
  type: UPDATE_AVATAR_SUCCESS,
  payload: fields,
});

export const UPDATE_AVATAR_FAILURE = 'UPDATE_AVATAR_FAILURE';
export const updateAvatarFailure = () => ({
  type: UPDATE_AVATAR_FAILURE,
});

export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
export const fetchUserProfile = (afterRequest) => ({
  type: FETCH_USER_PROFILE,
  payload: {
    afterRequest,
  },
});

export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const fetchUserProfileSuccess = (fields) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  payload: fields,
});

export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
export const fetchUserProfileFailure = () => ({
  type: FETCH_USER_PROFILE_FAILURE,
});

export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const fetchUserData = (afterRequest) => ({
  type: FETCH_USER_DATA,
  payload: {
    afterRequest,
  },
});

export const FETCH_USER_DATA_SUCCESS = 'FETCH_USER_DATA_SUCCESS';
export const fetchUserDataSuccess = () => ({
  type: FETCH_USER_DATA_SUCCESS,
});

export const FETCH_USER_DATA_FAILURE = 'FETCH_USER_DATA_FAILURE';
export const fetchUserDataFailure = () => ({
  type: FETCH_USER_DATA_FAILURE,
});

export const DELETE_USER_AVATAR = 'DELETE_USER_AVATAR';
export const deleteUserAvatar = (fileName, afterRequest) => ({
  type: DELETE_USER_AVATAR,
  payload: {
    fileName,
    afterRequest,
  },
});

export const DELETE_USER_AVATAR_SUCCESS = 'DELETE_USER_AVATAR_SUCCESS';
export const deleteUserAvatarSuccess = () => ({
  type: DELETE_USER_AVATAR_SUCCESS,
});

export const DELETE_USER_AVATAR_FAILURE = 'DELETE_USER_AVATAR_FAILURE';
export const deleteUserAvatarFailure = () => ({
  type: DELETE_USER_AVATAR_FAILURE,
});

export const DEACTIVATE_ACCOUNT = 'DEACTIVATE_ACCOUNT';
export const deactivateAccount = (password, callback) => ({
  type: DEACTIVATE_ACCOUNT,
  payload: { password, callback },
});

export const CHANGE_PUBLIC_STATUS = 'CHANGE_PUBLIC_STATUS';
export const changePublicStatus = (currentStatus, callback) => ({
  type: CHANGE_PUBLIC_STATUS,
  payload: { currentStatus, callback },
});

export const CHANGE_PUBLIC_STATUS_SUCCESS = 'CHANGE_PUBLIC_STATUS_SUCCESS';
export const changePublicStatusSuccess = (newStatus) => ({
  type: CHANGE_PUBLIC_STATUS_SUCCESS,
  payload: { newStatus },
});

export const CHANGE_VACATION_MODE_STATUS = 'CHANGE_VACATION_MODE_STATUS';
export const changeVacationModeStatus = (status, substituteId, callback) => ({
  type: CHANGE_VACATION_MODE_STATUS,
  payload: { status, substituteId, callback },
});

export const CHANGE_VACATION_MODE_STATUS_SUCCESS = 'CHANGE_VACATION_MODE_STATUS_SUCCESS';
export const changeVacationModeStatusSuccess = (status, substitutes) => ({
  type: CHANGE_VACATION_MODE_STATUS_SUCCESS,
  payload: { status, substitutes },
});
