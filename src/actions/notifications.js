export const RETRIEVE_DEVICE_TOKEN = 'RETRIEVE_DEVICE_TOKEN';
export const retrieveDeviceToken = () => ({
  type: RETRIEVE_DEVICE_TOKEN,
});

export const RETRIEVE_DEVICE_TOKEN_SUCCESS = 'RETRIEVE_DEVICE_TOKEN_SUCCESS';
export const retrieveDeviceTokenSuccess = () => ({
  type: RETRIEVE_DEVICE_TOKEN_SUCCESS,
});

export const RETRIEVE_DEVICE_TOKEN_FAILURE = 'RETRIEVE_DEVICE_TOKEN_FAILURE';
export const retrieveDeviceTokenFailure = () => ({
  type: RETRIEVE_DEVICE_TOKEN_FAILURE,
});

export const UPDATE_DEVICE_TOKEN = 'UPDATE_DEVICE_TOKEN';
export const updateDeviceToken = (token) => ({
  type: UPDATE_DEVICE_TOKEN,
  payload: {
    token,
  },
});

export const UPDATE_DEVICE_TOKEN_SUCCESS = 'UPDATE_DEVICE_TOKEN_SUCCESS';
export const updateDeviceTokenSuccess = () => ({
  type: UPDATE_DEVICE_TOKEN_SUCCESS,
});

export const UPDATE_DEVICE_TOKEN_FAILURE = 'UPDATE_DEVICE_TOKEN_FAILURE';
export const updateDeviceTokenFailure = () => ({
  type: UPDATE_DEVICE_TOKEN_FAILURE,
});
