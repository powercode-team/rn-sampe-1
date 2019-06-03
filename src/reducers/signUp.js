import { CONFIRM_HR_MEMBERSHIP_SUCCESS } from '../actions/signUp';
import { LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  isHrTeamMember: false,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIRM_HR_MEMBERSHIP_SUCCESS: {
      return { ...state, isHrTeamMember: true };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default signUpReducer;
