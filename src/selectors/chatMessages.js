import { createSelector } from 'reselect';

const numberOfMessagesToRender = (state) => state.chat.messagesCount;
const allMessages = (state) => state.chat.messages;

export const getMessagesSelector = createSelector(
  [allMessages, numberOfMessagesToRender],
  (messages, count) => messages.slice(0, count),
);
