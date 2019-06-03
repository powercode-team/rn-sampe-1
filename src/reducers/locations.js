import {
  ADD_USER_LOCATION_SUCCESS,
  FETCH_USER_LOCATIONS_SUCCESS,
  SET_LOCATION_RADIUS_SUCCESS,
  DELETE_USER_LOCATION_SUCCESS,
} from '../actions/locations';
import { LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  locations: [],
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_LOCATION_SUCCESS: {
      return { ...state, locations: [...state.locations.concat(action.payload)] };
    }
    case FETCH_USER_LOCATIONS_SUCCESS: {
      return {
        ...state,
        locations: action.payload,
      };
    }
    case DELETE_USER_LOCATION_SUCCESS: {
      const newLocations = state.locations.filter((location) => location.id !== action.payload);
      return { ...state, locations: newLocations };
    }
    case SET_LOCATION_RADIUS_SUCCESS: {
      const oldLocationObjectIndex = state.locations.findIndex((location) => location.id === action.payload.id);
      const oldLocationObject = state.locations[oldLocationObjectIndex];
      const newLocationObject = { ...oldLocationObject, distance_for_search: action.payload.distance_for_search };
      state.locations.splice(oldLocationObjectIndex, 1, newLocationObject);
      return { ...state, locations: [...state.locations] };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default locationsReducer;
