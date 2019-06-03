import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';

import AcceptanceScreen from './../../components/Matching/AcceptanceScreen/AcceptanceScreen';
import AcceptanceModal from './../../components/Offers/Modals/AcceptanceModal';

import { changeOfferStatusController } from '../../actions/matching';
import { setThreadId, setPopupState } from '../../actions/chat';
import { selectActiveTab } from './../../selectors/matching';
import { validateMessage } from './../../utils/validators';

class AcceptanceScreenContainer extends Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    skillLevels: propTypes.array.isRequired,
    activeTab: propTypes.string.isRequired,
    userInReview: propTypes.object.isRequired,
    relatedSkills: propTypes.array.isRequired,
    activeItemId: propTypes.number,
    changeOfferStatusController: propTypes.func.isRequired,
    setPristineToFalse: propTypes.func.isRequired,
    scrollToSlide: propTypes.func.isRequired,
    openPopupModal: propTypes.func.isRequired,
    setPopupState: propTypes.func.isRequired,
    setThreadId: propTypes.func.isRequired,
    changeUIBlockerModalState: propTypes.func.isRequired,
    setUpdatingStateProfile: propTypes.func.isRequired,
    dirtyUserObject: propTypes.object.isRequired,
    isUpdatingStateProfile: propTypes.bool,
    showPrivateInfo: propTypes.bool,
    offerName: propTypes.string,
    currentUserId: propTypes.oneOfType([propTypes.number, propTypes.string]),
  };

  state = {
    isAcceptanceModalVisible: false,
    isErrorModalVisible: false,
    errorMessage: 'Please Enter Message',
  };
  onAcceptPress = () => {
    if (this.props.userInReview.offer_status === 'accepted' || this.props.userInReview.offer_status === 'canceled') {
      this.setModalState('isAcceptanceModalVisible', true);
    } else {
      this.throttledOnCreateOfferPress();
    }
  };
  onSendAcceptPress = (comment) => {
    if (comment.length && validateMessage(comment)) {
      this.throttledOnCreateOfferPress(comment.trim());
      this.setModalState('isAcceptanceModalVisible', false);
    } else {
      this.setState({ isErrorModalVisible: true });
      setTimeout(() => this.setState({ isErrorModalVisible: false }), 1000);
    }
  };

  onCancelAcceptPress = () => {
    this.setModalState('isAcceptanceModalVisible', false);
  };

  onCreateOfferPress = (comment) => {
    const { navigation, activeItemId, userInReview, activeTab } = this.props;
    if (this.props.dirtyUserObject.id === this.props.userInReview.user_id) return;
    this.props.setUpdatingStateProfile(true);
    this.props.changeUIBlockerModalState(true);
    const data = {
      activeTab,
      type: navigation.state.params.type,
      instanceId: activeItemId,
      offerId: userInReview.offer_id,
      candidateId: userInReview.user_id,
      currentStatus: userInReview.offer_status,
      button: 'accept',
      comment,
      callback: (error, threadId, action) => {
        this.props.setUpdatingStateProfile(false);
        if (error) {
          this.props.changeUIBlockerModalState(false);
          return;
        }
        this.props.setPristineToFalse();
        if (action === 'pending') this.props.openPopupModal(2);
        if (action === 'submitted') {
          this.props.setThreadId(threadId);
          const navigationAction = NavigationActions.navigate({
            routeName: 'Chats',
            action: NavigationActions.navigate({ routeName: 'chat' }),
          });
          // this.props.changeUIBlockerModalState(false);
          this.props.navigation.goBack();
          this.props.navigation.dispatch(navigationAction);
          this.props.setPopupState(true, 'Accepted');
        }
        setTimeout(() => {
          this.props.scrollToSlide();
          this.props.changeUIBlockerModalState(false);
        }, 500);
      },
    };
    this.props.changeOfferStatusController(data);
  };

  onRejectOfferPress = () => {
    const { navigation, activeItemId, userInReview, activeTab } = this.props;
    if (this.props.dirtyUserObject.id === this.props.userInReview.user_id) return;
    this.props.setUpdatingStateProfile(true);
    this.props.changeUIBlockerModalState(true);
    const data = {
      activeTab,
      type: navigation.state.params.type,
      instanceId: activeItemId,
      offerId: userInReview.offer_id,
      candidateId: userInReview.user_id,
      currentStatus: userInReview.offer_status,
      button: 'decline',
      callback: (error, threadId, action) => {
        this.props.setUpdatingStateProfile(false);
        if (error) {
          this.props.changeUIBlockerModalState(false);
          return;
        }
        if (action === 'rejected') this.props.openPopupModal(0);
        if (action === 'new') this.props.openPopupModal(1);
        if (action === 'canceled') this.props.openPopupModal(3);
        if (action === 'accepted') this.props.openPopupModal(4);
        this.props.setPristineToFalse();
        setTimeout(() => {
          this.props.scrollToSlide();
          this.props.changeUIBlockerModalState(false);
        }, 500);
      },
    };
    this.props.changeOfferStatusController(data);
  };

  onAvatarPress = () => {
    this.throttledNavigate('CompactProfile', { type: this.props.navigation.state.params.type });
  };

  onChatPress = () => {
    const { threads } = this.props.userInReview;
    const { currentUserId } = this.props;

    const [activeThread] = threads.filter((thread) => thread.creator_id === currentUserId);

    // console.log('activeThread', activeThread);
    this.props.setThreadId(activeThread.id);
    const navigationAction = NavigationActions.navigate({
      routeName: 'Chats',
      action: NavigationActions.navigate({ routeName: 'chat' }),
    });
    this.props.navigation.goBack();
    this.props.navigation.dispatch(navigationAction);
  };

  setModalState = (name, state) => {
    this.setState({ [name]: state });
  };
  throttledOnCreateOfferPress = _.throttle(this.onCreateOfferPress, 300, { trailing: false });

  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, {
    trailing: false,
  });

  throttledOnRejectOfferPress = _.throttle(this.onRejectOfferPress, 300, { trailing: false });

  render() {
    return (
      <Fragment>
        <AcceptanceModal
          // offerType={this.props.activeOfferType}
          offerName={this.props.offerName}
          visible={this.state.isAcceptanceModalVisible}
          closeModal={() => this.setModalState('isAcceptanceModalVisible', false)}
          onCancelPress={this.onCancelAcceptPress}
          onSendPress={this.onSendAcceptPress}
          isErrorModalVisible={this.state.isErrorModalVisible}
          errorMessage={this.state.errorMessage}
        />
        <AcceptanceScreen
          isUpdatingStateProfile={this.props.isUpdatingStateProfile}
          showPrivateInfo={this.props.showPrivateInfo}
          onAvatarPress={this.onAvatarPress}
          matchedSkills={this.props.userInReview.matched_skills}
          relatedSkills={this.props.relatedSkills}
          skillLevels={this.props.skillLevels}
          user={this.props.userInReview}
          onCreateOfferPress={this.onAcceptPress}
          onRejectOfferPress={this.throttledOnRejectOfferPress}
          isMatching
          onChatPress={this.onChatPress}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  changeOfferStatusController,
  setThreadId,
  setPopupState,
};

const mapStateToProps = (state) => ({
  activeTab: selectActiveTab(state),
  offerName: state.matching.activeItem.title,
  currentUserId: state.user.id,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AcceptanceScreenContainer);
