import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, FlatList, TouchableOpacity, Platform } from 'react-native';
import propTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';

import Message from './Message/Message';
import WrapperTextInput from './WrapperTextInput/WrapperTextInput';
import ServiceMessage from './ServiceMessage/ServiceMessage';

import styles from './styles';
import { colors } from './../../styles/base';

import serviceMessageTypes from '../../constants/serviceMessageTypes';

class Chat extends Component {
  static propTypes = {
    inputValue: propTypes.string.isRequired,
    messages: propTypes.array.isRequired,
    onInputTextChanged: propTypes.func.isRequired,
    onSendMessage: propTypes.func.isRequired,
    clearInputText: propTypes.func.isRequired,
    userId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    currentThread: propTypes.object.isRequired,
    navigateFromItemName: propTypes.func.isRequired,
    onFlatListEndReached: propTypes.func.isRequired,
    offerIsDelete: propTypes.bool.isRequired,
    interlocutorName: propTypes.string.isRequired,
  };

  static contextTypes = {
    t: propTypes.func.isRequired,
  };

  keyExtractor = (item) => String(item.id);

  renderMessage = ({ item }) => {
    const message = item.text;
    if (message && message.length) {
      const isMyMessage = Boolean(item.user_id === this.props.userId);
      const isNoSent = item.isNoSent ? item.isNoSent : false;

      if (item.is_service) {
        const { currentThread } = this.props;

        let msgText = '';
        const displayMasterName = currentThread.master
          ? `${currentThread.master.first_name} ${currentThread.master.last_name}`
          : '';
        if (item.type === serviceMessageTypes.THREAD_COPY_CREATED.type) {
          msgText = this.context.t(serviceMessageTypes.THREAD_COPY_CREATED.message, { username: displayMasterName });
        } else if (item.type === serviceMessageTypes.MASTER_GOES_VACATION.type) {
          msgText = this.context.t(serviceMessageTypes.MASTER_GOES_VACATION.message, {
            username: displayMasterName,
          });
        }

        return <ServiceMessage message={msgText} date={item.formattedDate} showDate={item.showDate} />;
      }

      return (
        <Message
          message={message}
          date={item.formattedDate}
          isMyMessage={isMyMessage}
          showDate={item.showDate}
          isNoSent={isNoSent}
        />
      );
    }
    return null;
  };

  render() {
    const {
      messages,
      inputValue,
      onInputTextChanged,
      clearInputText,
      onSendMessage,
      currentThread,
      navigateFromItemName,
      onFlatListEndReached,
      offerIsDelete,
      interlocutorName,
    } = this.props;

    const { t } = this.context;

    const isIOS = Platform.OS === 'ios';

    const hasInterlocutorLeftChat =
      currentThread.is_deleted_by_creator ||
      currentThread.is_deleted_by_candidate ||
      currentThread.interlocutor_is_deactivate ||
      offerIsDelete;

    const isInterlocutorOnVacation = currentThread.is_locked;
    const lockedChatMessage = hasInterlocutorLeftChat ? `${interlocutorName} ${t('has left the chat')}` : '';

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={65}
        behavior={isIOS ? 'padding' : null}
        style={styles.keyboardWrapper}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={navigateFromItemName}>
            <View style={styles.wrapperJobLink}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.jobName}>
                {currentThread.activity_name}
              </Text>
              <Icon name="angle-right" size={24} color={colors.secondary} />
            </View>
          </TouchableOpacity>

          <FlatList
            onEndReached={onFlatListEndReached}
            onEndReachedThreshold={1}
            initialNumToRender={20}
            data={messages}
            renderItem={this.renderMessage}
            keyExtractor={this.keyExtractor}
            keyboardShouldPersistTaps="never"
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.containerFlatList}
            inverted
          />

          {hasInterlocutorLeftChat || isInterlocutorOnVacation ? (
            <View style={styles.wrapperReadOnlyText}>
              <Text style={styles.readOnlyText}>{lockedChatMessage}</Text>
            </View>
          ) : (
            <WrapperTextInput
              inputValue={inputValue}
              onChangeText={onInputTextChanged}
              onSendMessage={onSendMessage}
              clearInputText={clearInputText}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Chat;
