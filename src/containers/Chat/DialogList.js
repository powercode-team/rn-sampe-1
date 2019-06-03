import React, { Component } from 'react';
import { View } from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

import { translateTitle } from '../../translations/navigation';

import { setPopupState, fetchAllTheads, setThreadId, deleteThread } from '../../actions/chat';

import DialogList from '../../components/DialogList/DialogList';
import ValidationError from '../../components/ValidationError/ValidationError';

import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

class DialogListContainer extends Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    setPopupState: propTypes.func.isRequired,
    fetchAllTheads: propTypes.func.isRequired,
    theads: propTypes.array.isRequired,
    isPopupVisible: propTypes.bool.isRequired,
    popupMessage: propTypes.string.isRequired,
    setThreadId: propTypes.func.isRequired,
    deleteThread: propTypes.func.isRequired,
    lang: propTypes.string.isRequired,
    currentUserId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    return {
      headerLeft: <View />,
      headerTitle: <HeaderTitle text={translateTitle(lang, 'Chats')} />,
      headerRight: <View />,
    };
  };

  state = {
    isRefreshingList: true,
  };

  componentDidMount() {
    this.onFocus = this.props.navigation.addListener('didFocus', () => {
      this.setState({ isRefreshingList: true });
      this.fetchAllTheads();
    });
    this.props.navigation.setParams({ lang: this.props.lang });
  }

  componentWillUnmount() {
    this.onFocus.remove();
  }

  onUpdateDialogList = () => {
    this.fetchAllTheads();
  };

  onDeleteDialog = (id) => {
    this.props.deleteThread(id, () => {});
  };

  onSelectDialog = (dialog) => {
    this.props.setThreadId(dialog.id);
    this.throttledNavigate('chat');
  };

  fetchAllTheads = () => this.props.fetchAllTheads(this.completeFetchAllTheads);

  completeFetchAllTheads = (success) => {
    if (!success) {
      setTimeout(() => this.props.setPopupState(false, ''), 3000);
    }
    this.setState({ isRefreshingList: false });
    this.props.navigation.setParams({ isShowBageOnChatTab: true });
  };

  throttledNavigate = throttle(this.props.navigation.navigate, 300, {
    trailing: false,
  });

  render() {
    const { theads, isPopupVisible, popupMessage, currentUserId } = this.props;
    return (
      <React.Fragment>
        <DialogList
          dialogs={theads}
          isRefreshingList={this.state.isRefreshingList}
          onUpdateList={this.onUpdateDialogList}
          onDeleteDialog={this.onDeleteDialog}
          onSelectDialog={this.onSelectDialog}
          currentUserId={currentUserId}
        />
        <ValidationError isVisible={isPopupVisible} message={popupMessage} isBottom />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  theads: state.chat.theads,
  isPopupVisible: state.chat.isPopupVisible,
  popupMessage: state.chat.popupMessage,
  lang: state.i18nState.lang,
  currentUserId: state.user.id,
});

const mapDispatchToProps = {
  setPopupState,
  fetchAllTheads,
  setThreadId,
  deleteThread,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogListContainer);
