export const SIGN_UP_REQUEST = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
});
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
export const signUpError = () => ({
  type: SIGN_UP_ERROR,
});
export const signUp = (fields, afterRequest) => ({
  type: SIGN_UP_REQUEST,
  payload: {
    body: fields,
    afterRequest,
  },
});
export const CONFIRM_HR_MEMBERSHIP = 'CONFIRM_HR_MEMBERSHIP';
export const confirmHrMembership = (data, isFromSettings, afterRequest) => ({
  type: CONFIRM_HR_MEMBERSHIP,
  payload: {
    body: data,
    isFromSettings,
    afterRequest,
  },
});

export const CONFIRM_HR_MEMBERSHIP_SUCCESS = 'CONFIRM_HR_MEMBERSHIP_SUCCESS';
export const hrMembershipSuccess = () => ({
  type: CONFIRM_HR_MEMBERSHIP_SUCCESS,
});

export const CONFIRM_HR_MEMBERSHIP_FAILURE = 'CONFIRM_HR_MEMBERSHIP_FAILURE';
export const hrMembershipFailure = () => ({
  type: CONFIRM_HR_MEMBERSHIP_FAILURE,
});
