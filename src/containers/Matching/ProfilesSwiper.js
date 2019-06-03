import React, { Component } from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import propTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';

import HeaderBackButton from './../../components/HeaderBackButton/HeaderBackButton';
import AcceptanceScreen from './AcceptanceScreen';
import HeaderRightTextButton from './../../components/HeaderRightTextButton/HeaderRightTextButton';
import ValidationError from '../../components/ValidationError/ValidationError';
import { dimensions, colors } from './../../styles/base';

import {
  setUserInReview,
  fetchSelectedUserSkills,
  checkAndClearSwipeableList,
  clearMatchingInfo,
  clearUserInReview,
  setSwipeItemIndex,
  markCandidateAsViewed,
} from '../../actions/matching';
import { selectOrganizedRelatedSkills } from '../../selectors/matching';

const popupMessageArr = (type) => [
  `User rejected for the ${type.toLowerCase()}`,
  `User unrejected for the ${type.toLowerCase()}`,
  `${type} invitation sent`,
  'Declined',
  'Undeclined',
];

class ProfilesSwiper extends Component {
  static navigationOptions = ({ navigation }) => {
    const isPristine = navigation.state.params && navigation.state.params.isPristine;
    const backFunc = isPristine ? navigation.goBack : navigation.state.params && navigation.state.params.resetFunc;

    const throttledNavigate = _.throttle(navigation.navigate, 300, { trailing: false });

    let title = '';
    if (navigation.state.params !== undefined) {
      const strLength = navigation.state.params.title.length;
      title = strLength > 21 ? `${navigation.state.params.title.substr(0, 21)}...` : navigation.state.params.title;
    }
    const type = navigation.state.params.type === 'Jobs' ? 'Edit job' : 'Edit task';
    const createWhat = navigation.state.params.type === 'Jobs' ? 'Job' : 'Task';
    return {
      headerLeft: <HeaderBackButton goTo={() => backFunc()} />,
      headerRight: (
        <HeaderRightTextButton
          text={type}
          action={() => throttledNavigate('CreateForm', { createWhat, isEdit: true })}
        />
      ),
      screenTitle: navigation.state.params && title,
    };
  };

  static propTypes = {
    navigation: propTypes.object.isRequired,
    candidates: propTypes.array.isRequired,
    skillLevels: propTypes.array.isRequired,
    relatedSkills: propTypes.array.isRequired,
    activeItemId: propTypes.number,
    setUserInReview: propTypes.func.isRequired,
    fetchSelectedUserSkills: propTypes.func.isRequired,
    checkAndClearSwipeableList: propTypes.func.isRequired,
    clearMatchingInfo: propTypes.func.isRequired,
    clearUserInReview: propTypes.func.isRequired,
    swipeItemIndex: propTypes.number,
    setSwipeItemIndex: propTypes.func.isRequired,
    markCandidateAsViewed: propTypes.func.isRequired,
    dirtyUserObject: propTypes.object.isRequired,
  };

  static contextTypes = {
    t: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.swiperRef = React.createRef();
    this.lastAutoScroll = false;
  }

  state = {
    popupMessage: '',
    validationModalVisible: false,
    isPristine: true,
    isUpdatingStateProfile: false,
    isUIBlocked: false,
  };

  componentDidMount() {
    // const username = this.props.candidates[this.props.swipeItemIndex] &&
    //   this.props.candidates[this.props.swipeItemIndex].is_public
    //   ? this.props.candidates[this.props.swipeItemIndex].username
    //   : this.context.t('Private profile');
    // let username;
    // if (
    //   this.props.candidates[this.props.swipeItemIndex] &&
    //   this.props.candidates[this.props.swipeItemIndex].is_public
    // ) {
    //   // show
    //   ({ username } = this.props.candidates[this.props.swipeItemIndex]);
    // } else if (
    //   this.props.candidates[this.props.swipeItemIndex] &&
    //   !this.props.candidates[this.props.swipeItemIndex].is_public &&
    //   this.props.candidates[this.props.swipeItemIndex].is_visible
    // ) {
    //   // show
    //   ({ username } = this.props.candidates[this.props.swipeItemIndex]);
    // } else {
    //   // hide
    //   username = this.context.t('Private profile');
    // }

    this.props.navigation.setParams({
      resetFunc: this.resetNavigation,
      isPristine: this.state.isPristine,
      // title: username,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isPristine !== nextState.isPristine) {
      this.props.navigation.setParams({ isPristine: nextState.isPristine });
    }
    return true;
  }

  componentWillUnmount() {
    this.props.clearUserInReview();
  }

  onIndexChange = (i) => {
    const newUser = this.props.candidates[i];
    let newUserName;
    if (newUser.is_public) {
      // show
      newUserName = newUser.username;
    } else if (!newUser.is_public && newUser.is_visible) {
      // show
      newUserName = newUser.username;
    } else {
      // hide
      newUserName = this.context.t('Private profile');
    }
    // const newUserName = newUser && newUser.is_public ? newUser.username : this.context.t('Private profile');

    this.props.setUserInReview(newUser);

    if (newUser && newUser.user_id) {
      this.props.fetchSelectedUserSkills(newUser && newUser.user_id);
    }

    this.props.checkAndClearSwipeableList();

    this.props.navigation.setParams({ title: newUserName });

    const currentIndex = this.lastAutoScroll ? i - 1 : i;
    this.lastAutoScroll = false;

    if (
      newUser &&
      (newUser.offer_status === 'declined' ||
        newUser.offer_status === 'rejected' ||
        newUser.offer_status === 'accepted')
    ) {
      this.props.markCandidateAsViewed(
        this.props.navigation.state.params.type,
        this.props.activeItemId,
        newUser.user_id,
      );
    }

    this.props.setSwipeItemIndex(currentIndex);
  };

  setUpdatingStateProfile = (state) => this.setState({ isUpdatingStateProfile: state });

  setPristineToFalse = () => {
    this.setState({ isPristine: false });
  };

  openPopupModal = (messId) => {
    this.setState({
      popupMessage: popupMessageArr(this.props.navigation.state.params.type.slice(0, -1))[messId],
      validationModalVisible: true,
    });
    setTimeout(() => {
      this.setState({ popupMessage: '', validationModalVisible: false });
    }, 2000);
  };

  resetNavigation = () => {
    if (this.state.isPristine) return;
    const listener = () => {
      this.props.navigation.pop(2);
      BackHandler.removeEventListener('hardwareBackPress', listener);
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', listener);
    console.log('index in swiper', this.props.navigation.state.params.index);

    this.props.navigation.navigate('Matching', { index: this.props.navigation.state.params.index });
    this.props.clearMatchingInfo();
  };

  scrollToSlide = () => {
    const { swipeItemIndex, candidates } = this.props;
    const countUsers = candidates.length;
    console.log('countUsers', countUsers);
    if (countUsers === 1) {
      this.props.navigation.goBack();
    } else {
      const scrollBy = countUsers === swipeItemIndex + 1 ? -1 : 1;
      this.lastAutoScroll = Boolean(scrollBy > 0);
      this.swiperRef.current.scrollBy(scrollBy, true);
    }
  };

  changeUIBlockerModalState = (newState) => {
    this.setState({ isUIBlocked: newState });
  };
  render() {
    const { candidates, skillLevels, activeItemId, relatedSkills, navigation, dirtyUserObject } = this.props;
    return (
      <React.Fragment>
        <Modal visible={this.state.isUIBlocked} style={{ padding: 0, margin: 0 }}>
          <View pointerEvents="none" style={{ width: dimensions.screenWidth, height: dimensions.screenHeight }} />
        </Modal>
        <Swiper
          showsButtons={false}
          horizontal
          key={candidates.length}
          loop={false}
          index={this.props.swipeItemIndex}
          onIndexChanged={this.onIndexChange}
          loadMinimal
          loadMinimalSize={2}
          style={{ backgroundColor: colors.background }}
          showsPagination={false}
          ref={this.swiperRef}
          scrollEnabled={!this.state.isUIBlocked}
        >
          {candidates.map((userObj) => {
            let isVisible;
            if (userObj.is_public) {
              // show
              isVisible = true;
            } else if (!userObj.is_public && userObj.is_visible) {
              // show
              isVisible = true;
            } else {
              // hide
              isVisible = false;
            }
            return (
              <AcceptanceScreen
                setUpdatingStateProfile={this.setUpdatingStateProfile}
                isUpdatingStateProfile={this.state.isUpdatingStateProfile}
                showPrivateInfo={isVisible}
                key={userObj.user_id}
                skillLevels={skillLevels}
                userInReview={userObj}
                dirtyUserObject={dirtyUserObject}
                activeItemId={activeItemId}
                relatedSkills={relatedSkills}
                navigation={navigation}
                setPristineToFalse={this.setPristineToFalse}
                scrollToSlide={this.scrollToSlide}
                openPopupModal={this.openPopupModal}
                changeUIBlockerModalState={this.changeUIBlockerModalState}
                isMatching
              />
            );
          })}
        </Swiper>

        <ValidationError isVisible={this.state.validationModalVisible} message={this.state.popupMessage} isBottom />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  skillLevels: state.initialData.skillLevels,
  relatedSkills: selectOrganizedRelatedSkills(state),
  activeItemId: state.matching.activeItem.id,
  candidates: state.matching.swipeableUsers,
  dirtyUserObject: state.matching.dirtyUserObject,
  swipeItemIndex: state.matching.swipeItemIndex,
});

const mapDispatchToProps = {
  setUserInReview,
  fetchSelectedUserSkills,
  checkAndClearSwipeableList,
  clearMatchingInfo,
  clearUserInReview,
  setSwipeItemIndex,
  markCandidateAsViewed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilesSwiper);
