export const INITIALIZE_CHANNEL = 'INITIALIZE_CHANNEL';
export const initializeChannel = (setParams) => ({
  type: INITIALIZE_CHANNEL,
  payload: {
    setParams,
  },
});

export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';
export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
});

export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const receivedNewMessage = () => ({
  type: RECEIVED_NEW_MESSAGE,
});

export const THREAD_DELETED_BY_INTERLOCUTOR = 'THREAD_DELETED_BY_INTERLOCUTOR';
export const threadDeletedByInterlocator = (threadId) => ({
  type: THREAD_DELETED_BY_INTERLOCUTOR,
  payload: { threadId },
});
