export const FETCH_USER_LOCATIONS = 'FETCH_USER_LOCATIONS';
export const fetchUserLocations = (afterRequest) => ({
  type: FETCH_USER_LOCATIONS,
  payload: {
    afterRequest,
  },
});

export const FETCH_USER_LOCATIONS_SUCCESS = 'FETCH_USER_LOCATIONS_SUCCESS';
export const fetchUserLocationsSuccess = (fields) => ({
  type: FETCH_USER_LOCATIONS_SUCCESS,
  payload: fields,
});

export const FETCH_USER_LOCATIONS_FAILURE = 'FETCH_USER_LOCATIONS_FAILURE';
export const fetchUserLocationsFailure = () => ({
  type: FETCH_USER_LOCATIONS_FAILURE,
});

export const ADD_USER_LOCATION = 'ADD_USER_LOCATION';
export const addUserLocation = (fields, afterRequest) => ({
  type: ADD_USER_LOCATION,
  payload: {
    body: fields,
    afterRequest,
  },
});

export const ADD_USER_LOCATION_SUCCESS = 'ADD_USER_LOCATION_SUCCESS';
export const addUserLocationSuccess = (fields) => ({
  type: ADD_USER_LOCATION_SUCCESS,
  payload: fields,
});

export const ADD_USER_LOCATION_FAILURE = 'ADD_USER_LOCATION_FAILURE';
export const addUserLocationFailure = () => ({
  type: ADD_USER_LOCATION_FAILURE,
});

export const SET_LOCATION_RADIUS = 'SET_LOCATION_RADIUS';
export const setLocationRadius = (fields, afterRequest) => ({
  type: SET_LOCATION_RADIUS,
  payload: {
    body: fields,
    afterRequest,
  },
});

export const SET_LOCATION_RADIUS_SUCCESS = 'SET_LOCATION_RADIUS_SUCCESS';
export const setLocationRadiusSuccess = (fields) => ({
  type: SET_LOCATION_RADIUS_SUCCESS,
  payload: fields,
});

export const SET_LOCATION_RADIUS_FAILURE = 'SET_LOCATION_RADIUS_FAILURE';
export const setLocationRadiusFailure = () => ({
  type: SET_LOCATION_RADIUS_FAILURE,
});

export const DELETE_USER_LOCATION = 'DELETE_USER_LOCATION';
export const deleteUserLocation = (locationId, afterRequest) => ({
  type: DELETE_USER_LOCATION,
  payload: {
    afterRequest,
    locationId,
  },
});

export const DELETE_USER_LOCATION_SUCCESS = 'DELETE_USER_LOCATION_SUCCESS';
export const deleteUserLocationSuccess = (locationId) => ({
  type: DELETE_USER_LOCATION_SUCCESS,
  payload: locationId,
});

export const DELETE_USER_LOCATION_FAILURE = 'DELETE_USER_LOCATION_FAILURE';
export const deleteUserLocationFailure = () => ({
  type: DELETE_USER_LOCATION_FAILURE,
});
