import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { translateTitle } from '../../translations/navigation';
import { fetchUserInfo, fetchUserProfileSkills } from '../../actions/chat';

import ValidationError from '../../components/ValidationError/ValidationError';
import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

import CompactProfile from './../../components/Matching/CompactProfile/CompactProfile';
import LoadingModal from './../../components/LoadingModal/LoadingModal';
import { colors } from './../../styles/base';

class ChatProfileContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    return {
      headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
      headerTitle: <HeaderTitle text={translateTitle(lang, 'Profile')} />,
      headerRight: <View />,
    };
  };

  static propTypes = {
    navigation: propTypes.object.isRequired,
    currentThread: propTypes.object.isRequired,
    userId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    fetchUserInfo: propTypes.func.isRequired,
    fetchUserProfileSkills: propTypes.func.isRequired,
    isPopupVisible: propTypes.bool.isRequired,
    popupMessage: propTypes.string.isRequired,
    currentUserProfile: propTypes.object.isRequired,
    skillLevels: propTypes.array.isRequired,
    lang: propTypes.string.isRequired,
    currentUserSkills: propTypes.array.isRequired,
  };

  state = {
    isLoadingModalVisible: false,
  };

  componentDidMount() {
    this.showLoadingModal();
    let profileUserId;
    if (this.props.userId !== this.props.currentThread.creator_id) {
      profileUserId = this.props.currentThread.creator_id;
    } else if (this.props.userId !== this.props.currentThread.candidate_id) {
      profileUserId = this.props.currentThread.candidate_id;
    }
    this.props.navigation.setParams({ lang: this.props.lang });
    this.props.fetchUserInfo(profileUserId);
    this.props.fetchUserProfileSkills(profileUserId, this.hideLoadingModal);
  }
  showLoadingModal = () => {
    this.setState({ isLoadingModalVisible: true });
  };
  hideLoadingModal = () => {
    this.setState({ isLoadingModalVisible: false });
  };

  render() {
    const { isPopupVisible, popupMessage, currentUserProfile, skillLevels, currentUserSkills } = this.props;

    const user = {
      ...currentUserProfile,
      username: `${currentUserProfile.first_name || ''} ${currentUserProfile.last_name || ''}`,
    };
    user.is_visible = this.props.navigation.state.params.isVisible;
    return (
      <React.Fragment>
        <LoadingModal visible={this.state.isLoadingModalVisible} closeModal={() => this.hideLoadingModal()} />
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          {Object.keys(currentUserProfile).length ? (
            <CompactProfile
              onAvatarPress={() => {}}
              skills={currentUserSkills}
              skillLevels={skillLevels}
              user={user}
              isMatching={false}
            />
          ) : null}
          <ValidationError isVisible={isPopupVisible} message={popupMessage} isBottom />
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  isPopupVisible: state.chat.isPopupVisible,
  popupMessage: state.chat.popupMessage,
  currentUserProfile: state.chat.currentUserProfile,
  currentThread: state.chat.currentThread,
  skillLevels: state.initialData.skillLevels,
  currentUserSkills: state.chat.currentUserSkills,
  lang: state.i18nState.lang,
});

const mapDispatchToProps = {
  fetchUserInfo,
  fetchUserProfileSkills,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatProfileContainer);
