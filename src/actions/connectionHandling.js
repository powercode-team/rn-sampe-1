export const TOGGLE_CONNECTION_ERROR_MODAL = 'TOGGLE_CONNECTION_ERROR_MODAL';
export const toggleConnectionErrorModal = (state, position) => ({
  type: TOGGLE_CONNECTION_ERROR_MODAL,
  payload: {
    position,
    state,
  },
});
