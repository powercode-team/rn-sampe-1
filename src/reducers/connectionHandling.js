import { TOGGLE_CONNECTION_ERROR_MODAL } from '../actions/connectionHandling';

const initialState = {
  isConnectionModalVisible: false,
  position: 'bottom',
};

export const connectionHandlingReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CONNECTION_ERROR_MODAL: {
      const resultObj = { isConnectionModalVisible: action.payload.state };
      if (action.payload.position) resultObj.position = action.payload.position;
      return { ...state, ...resultObj };
    }
    default: {
      return state;
    }
  }
};

export default connectionHandlingReducer;
