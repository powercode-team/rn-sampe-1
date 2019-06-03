import {
  FILL_USER_PROFILE,
  UPDATE_USER_SUCCESS,
  UPDATE_AVATAR_SUCCESS,
  FETCH_USER_PROFILE_SUCCESS,
  DELETE_USER_AVATAR_SUCCESS,
  CHANGE_PUBLIC_STATUS_SUCCESS,
  CHANGE_VACATION_MODE_STATUS_SUCCESS,
} from '../actions/user';
import { LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  city: '',
  country: '',
  education: '',
  seniority: '',
  gender: '',
  dateOfBirth: null,
  picture: '',
  profession: '',
  phone: '',
  roomId: '',
  isHr: false,
  isPublic: true,
  isInVacation: false,
  isActiveSubstitute: false,
  substitutes: [],
  masters: [],
};

function updateNecessaryFields(fields, userState) {
  const resultObj = {};
  const keys = Object.keys(fields);
  keys.forEach((field) => {
    switch (field) {
      case 'first_name': {
        resultObj.firstName = fields[field];
        break;
      }
      case 'last_name': {
        resultObj.lastName = fields[field];
        break;
      }
      case 'is_hr': {
        resultObj.isHr = fields[field];
        break;
      }
      case 'date_of_birth': {
        resultObj.dateOfBirth = fields[field];
        break;
      }
      case 'location_city': {
        resultObj.city = fields[field];
        break;
      }
      case 'location_country': {
        resultObj.country = fields[field];
        break;
      }
      case 'is_public': {
        resultObj.isPublic = fields[field];
        break;
      }
      case 'offer_room_uid': {
        resultObj.roomId = fields[field];
        break;
      }
      case 'is_in_vacation': {
        resultObj.isInVacation = fields[field];
        break;
      }
      case 'substitutes': {
        resultObj.substitutes = fields[field];
        break;
      }
      case 'masters': {
        resultObj.masters = fields[field];
        break;
      }
      case 'is_active_substitute': {
        resultObj.isActiveSubstitute = fields[field];
        break;
      }
      default: {
        if (field !== undefined && Object.prototype.hasOwnProperty.call(userState, field)) {
          resultObj[field] = fields[field];
        }
      }
    }
  });
  return resultObj;
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_USER_PROFILE: {
      const data = updateNecessaryFields(action.payload, state);
      return { ...state, ...data };
    }
    case UPDATE_USER_SUCCESS: {
      const data = updateNecessaryFields(action.payload, state);
      return { ...state, ...data };
    }
    case UPDATE_AVATAR_SUCCESS: {
      return { ...state, picture: action.payload };
    }
    case FETCH_USER_PROFILE_SUCCESS: {
      const data = updateNecessaryFields(action.payload, state);
      return { ...state, ...data };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    case DELETE_USER_AVATAR_SUCCESS: {
      return { ...state, picture: null };
    }
    case CHANGE_PUBLIC_STATUS_SUCCESS: {
      return { ...state, isPublic: action.payload.newStatus };
    }
    case CHANGE_VACATION_MODE_STATUS_SUCCESS: {
      return { ...state, isInVacation: action.payload.status, substitutes: action.payload.substitutes };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
