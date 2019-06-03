import React, { Component } from 'react';
import { AppState, Keyboard, Platform, SafeAreaView } from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttle } from 'lodash';
import { translateTitle } from '../../translations/navigation';
import { getMessagesSelector } from '../../selectors/chatMessages';

import {
  sendMessage,
  fetchThread,
  setPopupState,
  setCurrentActivities,
  setInterlocutorId,
  setCurrentUserType,
  viewMessages,
  setNumberOfMessages,
  joinThread,
  leaveThread,
  setLastViewedRoute,
} from '../../actions/chat';

import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import HeaderRightTextButton from '../../components/HeaderRightTextButton/HeaderRightTextButton';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

import ValidationError from '../../components/ValidationError/ValidationError';
import Chat from '../../components/Chat/Chat';
import LoadingModal from './../../components/LoadingModal/LoadingModal';

import { dimensions } from './../../styles/base';

class ChatContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    const maxNumberOfLetters = Math.floor((dimensions.screenWidth * 0.65) / 12);
    let title = '';
    if (navigation.state.params && navigation.state.params.title !== undefined) {
      const strLength = navigation.state.params.title.length;
      title =
        strLength > maxNumberOfLetters
          ? `${navigation.state.params.title.substr(0, maxNumberOfLetters)}...`
          : navigation.state.params.title;
    }
    return {
      headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
      headerTitle: <HeaderTitle text={title} />,
      headerRight: (
        <HeaderRightTextButton
          action={navigation.state.params && navigation.state.params.navigateToProfile}
          text={translateTitle(lang, 'Profile')}
        />
      ),
    };
  };

  static propTypes = {
    sendMessage: propTypes.func.isRequired,
    messages: propTypes.array.isRequired,
    currentThread: propTypes.object.isRequired,
    userId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    isPopupVisible: propTypes.bool.isRequired,
    popupMessage: propTypes.string.isRequired,
    currentThreadId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    offerId: propTypes.oneOfType([propTypes.number, propTypes.string]),
    fetchThread: propTypes.func.isRequired,
    setPopupState: propTypes.func.isRequired,
    navigation: propTypes.object.isRequired,
    setCurrentActivities: propTypes.func.isRequired,
    currentUserType: propTypes.string.isRequired,
    currentActivityType: propTypes.string.isRequired,
    setInterlocutorId: propTypes.func.isRequired,
    setCurrentUserType: propTypes.func.isRequired,
    viewMessages: propTypes.func.isRequired,
    setNumberOfMessages: propTypes.func.isRequired,
    messagesCount: propTypes.number.isRequired,
    allMessagesLength: propTypes.number.isRequired,
    countMyMessages: propTypes.number.isRequired,
    joinThread: propTypes.func.isRequired,
    leaveThread: propTypes.func.isRequired,
    setLastViewedRoute: propTypes.func.isRequired,
    lang: propTypes.string.isRequired,
  };
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  state = {
    inputValue: '',
    validationErrorPosition: 'bottom',
    isLoadingModalVisible: false,
  };

  componentDidMount() {
    this.showLoadingModal();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    AppState.addEventListener('change', this.handleAppStateChange);
    this.onBlur = this.props.navigation.addListener('didBlur', () => {
      this.props.setLastViewedRoute(false);
    });

    this.props.navigation.setParams({ navigateToProfile: this.navigateToProfile, lang: this.props.lang });
    this.props.fetchThread(this.props.currentThreadId, this.completeFetchThread);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isPopupVisible && !this.props.isPopupVisible) {
      setTimeout(() => this.props.setPopupState(false, ''), 1000);
    }
  }

  componentWillUnmount() {
    this.onBlur.remove();
    this.props.leaveThread(this.props.currentThreadId, this.props.userId);
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onInputTextChanged = (text) => this.setState({ inputValue: text });
  onSend = () => {
    const { currentThreadId, userId, countMyMessages } = this.props;
    const trimmedInput = this.state.inputValue.trim();
    if (!trimmedInput) return;
    const message = {
      threadId: currentThreadId,
      message: trimmedInput,
      msg_number: countMyMessages + 1,
      userId,
    };

    this.props.sendMessage(message);
    this.setState({ inputValue: '' });
  };

  onFlatListEndReached = () => {
    let nextCount = this.props.messagesCount + 15;
    const messageCount = this.props.messages.length;

    if (this.props.messagesCount < this.props.allMessagesLength) {
      this.props.setNumberOfMessages(nextCount);
    } else if (nextCount > this.props.allMessagesLength) {
      nextCount = messageCount;
      this.props.setNumberOfMessages(nextCount);
    } else if (this.props.messagesCount === messageCount) {
      return null;
    }
  };

  getOfferIdAndType = (thread) => {
    const tmpObj = { type: '', id: '', activityId: '', offerIsDelete: false };
    if (thread.job_offer_id !== null) {
      tmpObj.type = 'job';
      tmpObj.id = thread.job_offer_id;
      tmpObj.activityId = thread.job_id;
    } else if (thread.task_offer_id !== null) {
      tmpObj.type = 'task';
      tmpObj.id = thread.task_offer_id;
      tmpObj.activityId = thread.task_id;
    } else {
      tmpObj.offerIsDelete = true;
    }

    return tmpObj;
  };

  getUserTypeAndInterlocutorId = (currentThread) => {
    const info = { currentUserType: '', interlocutorId: '' };
    if (currentThread.creator_id !== null && currentThread.creator_id === this.props.userId) {
      info.currentUserType = 'creator';
      info.interlocutorId = currentThread.candidate_id;
    } else if (currentThread.candidate_id !== null && currentThread.candidate_id === this.props.userId) {
      info.currentUserType = 'candidate';
      info.interlocutorId = currentThread.creator_id;
    }
    return info;
  };

  setThreadType = () => {
    const threadType = this.getOfferIdAndType(this.props.currentThread);
    this.props.setCurrentActivities(threadType.activityId, threadType.type, threadType.id);
  };

  setUserInfo = () => {
    const usersInfo = this.getUserTypeAndInterlocutorId(this.props.currentThread);
    this.props.setInterlocutorId(usersInfo.interlocutorId);
    this.props.setCurrentUserType(usersInfo.currentUserType);
  };
  keyboardDidShow = () => {
    this.setState({ validationErrorPosition: 'top' });
  };
  keyboardDidHide = () => {
    this.setState({ validationErrorPosition: 'bottom' });
  };
  handleAppStateChange = (newState) => {
    if (newState === 'background') {
      this.props.setLastViewedRoute('chat');
    } else {
      this.props.setLastViewedRoute(false);
    }
  };
  navigateToProfile = () => {
    const { currentThread } = this.props;
    // if (!messages.length) return;
    if (currentThread.interlocutor_is_deactivate) {
      this.props.setPopupState(
        true,
        `${currentThread.interlocutor_name || 'User'} has deleted all his skills or his entire profile`,
      );
    } else {
      let isVisible;
      if (this.props.currentThread.is_public_interlocutor) {
        // show
        isVisible = true;
      } else if (
        !this.props.currentThread.is_public_interlocutor &&
        this.props.currentThread.is_visible &&
        !this.props.currentThread.interlocutor_is_deactivate
      ) {
        // show
        isVisible = true;
      } else {
        // hide
        isVisible = false;
      }
      this.props.navigation.navigate('profile', { isVisible });
    }
  };

  completeFetchThread = (success) => {
    if (success) {
      // const username = this.props.currentThread.is_public_interlocutor
      //   ? this.props.currentThread.interlocutor_name
      //   : this.context.t('Private profile');
      let username;
      if (this.props.currentThread.is_public_interlocutor) {
        // show
        username = this.props.currentThread.interlocutor_name;
      } else if (
        !this.props.currentThread.is_public_interlocutor &&
        this.props.currentThread.is_visible &&
        !this.props.currentThread.interlocutor_is_deactivate
      ) {
        // show
        username = this.props.currentThread.interlocutor_name;
      } else {
        // hide
        username = this.context.t('Private profile');
      }

      this.props.navigation.setParams({ title: username });
      this.setUserInfo();
      this.setThreadType();
      const dataForSocketConnection = this.createDataForSocketConnection();
      this.props.joinThread(dataForSocketConnection);

      const filtredMsg = this.props.messages.filter((msg) => msg.user_id !== this.props.userId && !msg.is_viewed);
      const messageIds = filtredMsg.map((msg) => msg.id);
      if (messageIds.length) this.props.viewMessages(messageIds);
    }
    this.hideLoadingModal();
  };

  createDataForSocketConnection = () => ({
    activityType: this.props.currentActivityType,
    offerId: this.props.offerId,
    senderId: this.props.userId,
    threadId: this.props.currentThread.id,
  });

  throttledNavigate = throttle(this.props.navigation.navigate, 300, {
    trailing: false,
  });

  navigateToActivity = (goTo) => this.throttledNavigate(goTo, { title: this.props.currentThread.activity_name });

  navigateFromItemName = () => {
    const { currentUserType, currentThread } = this.props;
    // if (!messages.length) return;
    const offerData = this.getOfferIdAndType(currentThread);

    if (currentThread.interlocutor_is_deactivate || !currentThread.is_interlocutor_matched) {
      this.props.setPopupState(
        true,
        `${currentThread.interlocutor_name || 'User'} has deleted all his skills or his entire profile`,
      );
    } else if (offerData.offerIsDelete) {
      // const username = currentThread.is_public_interlocutor
      //   ? currentThread.interlocutor_name
      //   : this.context.t('Private profile');
      let username;
      if (currentThread.is_public_interlocutor) {
        // show
        username = currentThread.interlocutor_name;
      } else if (
        !currentThread.is_public_interlocutor &&
        currentThread.is_visible &&
        !currentThread.interlocutor_is_deactivate
      ) {
        // show
        username = currentThread.interlocutor_name;
      } else {
        // hide
        username = this.context.t('Private profile');
      }

      this.props.setPopupState(true, `${username} has declined this offer`);
    } else if (currentUserType === 'creator') {
      this.navigateToActivity('matching');
    } else if (currentUserType === 'candidate') {
      this.navigateToActivity('offer');
    }
  };
  showLoadingModal = () => {
    this.setState({ isLoadingModalVisible: true });
  };
  hideLoadingModal = () => {
    this.setState({ isLoadingModalVisible: false });
  };
  clearInputText = () => this.setState({ inputValue: '' });

  render() {
    // console.log('STATE', this.state);
    // console.log('PROPS', this.props);
    const { messages, userId, isPopupVisible, popupMessage, currentThread } = this.props;

    // const interlocutorName = currentThread.is_public_interlocutor
    //   ? currentThread.interlocutor_name
    //   : this.context.t('Private profile');
    let interlocutorName;
    if (currentThread.is_public_interlocutor) {
      // show
      interlocutorName = currentThread.interlocutor_name;
    } else if (
      !currentThread.is_public_interlocutor &&
      currentThread.is_visible &&
      !currentThread.interlocutor_is_deactivate
    ) {
      // show
      interlocutorName = currentThread.interlocutor_name;
    } else {
      // hide
      interlocutorName = this.context.t('Private profile');
    }

    const offerData = this.getOfferIdAndType(currentThread);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <LoadingModal visible={this.state.isLoadingModalVisible} closeModal={() => this.hideLoadingModal()} />
        <Chat
          messages={messages}
          onInputTextChanged={this.onInputTextChanged}
          onSendMessage={this.onSend}
          inputValue={this.state.inputValue}
          clearInputText={this.clearInputText}
          userId={userId}
          currentThread={currentThread}
          navigateFromItemName={this.navigateFromItemName}
          onFlatListEndReached={this.onFlatListEndReached}
          offerIsDelete={offerData.offerIsDelete}
          interlocutorName={interlocutorName}
        />
        <ValidationError
          isVisible={isPopupVisible}
          message={popupMessage}
          isBottom={Platform.OS === 'android' ? true : this.state.validationErrorPosition === 'bottom'}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  currentThread: state.chat.currentThread,
  messages: getMessagesSelector(state),
  socketDisconnect: state.chat.socketDisconnect,
  userId: state.user.id,
  isPopupVisible: state.chat.isPopupVisible,
  popupMessage: state.chat.popupMessage,
  currentThreadId: state.chat.currentThreadId,
  currentUserSkills: state.chat.currentUserSkills,
  offerId: state.chat.offerId,
  currentActivityType: state.chat.currentActivityType,
  currentUserType: state.chat.currentUserType,
  interlocutorId: state.chat.interlocutorId,
  currentActivityId: state.chat.currentActivityId,
  messagesCount: state.chat.messagesCount,
  allMessagesLength: state.chat.messages.length,
  countMyMessages: state.chat.countMyMessages,
  lang: state.i18nState.lang,
});

const mapDispatchToProps = {
  sendMessage,
  fetchThread,
  setPopupState,
  setCurrentActivities,
  setInterlocutorId,
  setCurrentUserType,
  viewMessages,
  setNumberOfMessages,
  joinThread,
  leaveThread,
  setLastViewedRoute,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainer);
