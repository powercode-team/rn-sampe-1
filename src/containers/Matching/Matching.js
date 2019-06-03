import React, { Component } from 'react';
import { View, Animated, AppState } from 'react-native';
import propTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import HeaderBackButton from './../../components/HeaderBackButton/HeaderBackButton';
import HeaderRightTextButton from './../../components/HeaderRightTextButton/HeaderRightTextButton';

import FilterRow from './../../components/SearchPeople/SearchPeopleHeader/SearchPeopleHeader';
import MatchingTabs from '../../components/Matching/MatchingTabs/MatchingTabs';
import SortingDropDown from './../../components/SearchPeople/DropdownSortBy/DropdownSortBy';
import CandidatesMatching from '../../components/Matching/CandidatesMatching';
import { dimensions, colors } from './../../styles/base';

import {
  clearActiveItem,
  fetchMatchingJob,
  fetchMatchingTask,
  setUserInReview,
  clearMatchingInfo,
  fetchSelectedUserSkills,
  updateMatchingForJob,
  updateMatchingForTask,
  inviteAllCandidates,
  setMatchingSortingType,
  setSwipeableCandidates,
  setSwipeItemIndex,
  markCandidateAsViewed,
  setActivityDataForFilter,
  setActiveTabIndex,
  resetFilter,
  filterMatchingUsers,
} from '../../actions/matching';
import { setLastViewedRoute } from '../../actions/chat';

import {
  selectAcceptedUnViewedCount,
  selectRejectedUnViewedCount,
  selectActiveTab,
  selectCandidates,
  selectActiveItemType,
  selectAppliedStatus,
} from '../../selectors/matching';

class MatchingContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'Main',
        }),
      ],
    });

    const throttledNavigate = _.throttle(navigation.navigate, 300, { trailing: false });
    const navigateBack = () => {
      // TODO do something with it. Right now active item is not being cleared
      // navigation.state.params.clearSelectedItem();
      if (navigation.state.params && navigation.state.params.fromPush) {
        navigation.setParams({ fromPush: false });
        navigation.goBack();
      } else {
        navigation.dispatch(resetAction);
      }
    };

    const maxNumberOfLetters = Math.floor(((dimensions.screenWidth - 0.3) * dimensions.screenWidth) / 12);
    let title = 'Matching';

    if (navigation.state.params && navigation.state.params.title) {
      const strLength = navigation.state.params.title.length;
      title =
        strLength > maxNumberOfLetters
          ? `${navigation.state.params.title.substr(0, maxNumberOfLetters)}...`
          : navigation.state.params.title;
    }
    const type = navigation.state.params && navigation.state.params.type;

    return {
      screenTitle: title,
      headerLeft: <HeaderBackButton goTo={navigateBack} />,
      headerRight: (
        <HeaderRightTextButton
          text={`Edit ${type && type.toLowerCase()}`}
          action={() => throttledNavigate('CreateForm', { createWhat: type, isEdit: true })}
        />
      ),
    };
  };

  static propTypes = {
    navigation: propTypes.object.isRequired,
    activeItem: propTypes.object,
    clearActiveItem: propTypes.func,
    fetchMatchingTask: propTypes.func,
    fetchMatchingJob: propTypes.func,
    setUserInReview: propTypes.func.isRequired,
    clearMatchingInfo: propTypes.func.isRequired,
    fetchSelectedUserSkills: propTypes.func.isRequired,
    updateMatchingForTask: propTypes.func.isRequired,
    updateMatchingForJob: propTypes.func.isRequired,
    inviteAllCandidates: propTypes.func.isRequired,
    currentSorting: propTypes.string.isRequired,
    setMatchingSortingType: propTypes.func.isRequired,
    setSwipeableCandidates: propTypes.func.isRequired,
    setSwipeItemIndex: propTypes.func.isRequired,
    markCandidateAsViewed: propTypes.func.isRequired,
    acceptedUsersCount: propTypes.number,
    rejectedUsersCount: propTypes.number,
    setActivityDataForFilter: propTypes.func.isRequired,
    isRefreshing: propTypes.bool,
    setLastViewedRoute: propTypes.func.isRequired,
    tabs: propTypes.array.isRequired,
    activeTabIndex: propTypes.number.isRequired,
    setActiveTabIndex: propTypes.func.isRequired,
    activeTab: propTypes.string.isRequired,
    candidates: propTypes.array.isRequired,
    activeItemType: propTypes.string.isRequired,
    isFilterActive: propTypes.bool.isRequired,
    resetFilter: propTypes.func.isRequired,
    seniorities: propTypes.array.isRequired,
    filterMatchingUsers: propTypes.func.isRequired,
    filterState: propTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.counter = 0;
    this.tabsCoordinates = [{ width: 0, left: 0 }, { width: 0, left: 0 }, { width: 0, left: 0 }];
  }

  state = {
    sortingOptions: [
      {
        name: 'alphabet',
        text: 'Alphabet',
      },
    ],
    isSortingDropDownOpen: false,
    animationLeft: new Animated.Value(0),
    animationWidth: 0,
    loading: true,
    layoutFinished: false,
  };

  componentDidMount() {
    const { navigation, activeItem: selectedItem, activeItemType, clearActiveItem: clearItem } = this.props;
    navigation.setParams({
      title: selectedItem && selectedItem.title,
      clearSelectedItem: clearItem,
      type: activeItemType,
    });

    if (navigation.state.params && navigation.state.params.needUpdate) {
      this.updateMatchingItem();
      navigation.setParams({ needUpdate: false });
    } else {
      if (selectedItem && !Object.keys(selectedItem).length) return;
      this.updateMatchingItem();
    }
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.layoutFinished) this.onTabPress(this.props.activeTabIndex, false);
  }

  componentWillUnmount() {
    this.props.clearMatchingInfo();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onTabLayout = (event, index) => {
    const { width } = event.nativeEvent.layout;
    this.tabsCoordinates[index].width = width;
    if (this.counter === 2) {
      this.tabsCoordinates[1].left = this.tabsCoordinates[0].width;
      this.tabsCoordinates[2].left = this.tabsCoordinates[0].width + this.tabsCoordinates[1].width;
      this.setState({ animationWidth: new Animated.Value(this.tabsCoordinates[0].width), layoutFinished: true });
    }
    this.counter = this.counter + 1;
  };

  onTabPress = (i, shouldUpdateState = true) => {
    if (shouldUpdateState) this.props.setActiveTabIndex(i);
    if (this.state.layoutFinished) this.setState({ layoutFinished: null });
    Animated.parallel([
      Animated.timing(this.state.animationLeft, {
        toValue: this.tabsCoordinates[i].left,
        duration: 400,
      }),
      Animated.timing(this.state.animationWidth, {
        toValue: this.tabsCoordinates[i].width,
        duration: 400,
      }),
    ]).start();
  };

  onItemPress = (item) => {
    const { candidates, activeItem, activeItemType } = this.props;
    const index = candidates.findIndex((userObj) => userObj.user_id === item.user_id);
    this.props.setUserInReview(item);
    this.props.fetchSelectedUserSkills(item.user_id);
    this.props.setSwipeableCandidates(candidates);
    this.props.setSwipeItemIndex(index);
    if (item.offer_status === 'declined' || item.offer_status === 'rejected' || item.offer_status === 'accepted') {
      this.props.markCandidateAsViewed(`${activeItemType}s`, activeItem.id, item.user_id);
    }
    this.throttledNavigate('ProfilesSwiper', {
      type: `${activeItemType}s`,
      title: activeItem.title,
      index: this.props.activeTabIndex,
    });
  };

  onSortingOptionsPress = (item) => {
    this.props.setMatchingSortingType(item.name);
    this.setModalState('isSortingDropDownOpen', false);
  };

  setModalState = (name, state) => {
    this.setState({ [name]: state });
  };

  handleAppStateChange = (newState) => {
    if (newState === 'background') {
      this.props.setLastViewedRoute('matching');
    } else {
      this.props.setLastViewedRoute(false);
    }
  };

  fetchMatchingJob = () => {
    const { activeItemType, fetchMatchingJob: fetchJob, fetchMatchingTask: fetchTask, activeItem } = this.props;
    const fetchFunc = activeItemType === 'Job' ? fetchJob : fetchTask;
    fetchFunc(activeItem.id, () => this.setState({ loading: false }));
  };

  updateMatchingItem = () => {
    const {
      activeItemType,
      updateMatchingForTask: updateTask,
      updateMatchingForJob: updateJob,
      activeItem,
    } = this.props;
    const updateFunc = activeItemType === 'Job' ? updateJob : updateTask;
    updateFunc(activeItem.id, () => this.setState({ loading: false }));
  };
  throttledNavigate = _.throttle(this.props.navigation.navigate, 500, {
    trailing: false,
  });

  fetchFilteredUsers = () => {
    const { filterState, activeItemType, filterMatchingUsers: filterUsers, activeItem } = this.props;
    const senioritiesNames = filterState.appliedSeniorities
      .filter((item) => item.seniority_level_name !== 'All' && item.isActive)
      .map((item) => item.seniority_level_name);
    filterUsers(activeItemType.toLowerCase(), activeItem.id, 0, senioritiesNames);
  };

  navigateToFilter = () => {
    const { activeItemType, activeTab, seniorities } = this.props;
    this.props.setActivityDataForFilter(`${activeItemType.toLowerCase()}`, activeTab.toLowerCase(), seniorities);
    this.props.resetFilter();
    this.throttledNavigate('MatchingFilters');
  };

  inviteAll = () => {
    this.setState({ loading: true });
    this.props.inviteAllCandidates(this.props.activeItemType.toLowerCase(), this.props.activeItem.id, () => {
      this.setState({ loading: false });
    });
  };

  renderContent = () => {
    const { candidates, activeTab, activeItem, isFilterActive } = this.props;

    return (
      <CandidatesMatching
        candidates={candidates}
        type={activeTab.toLowerCase()}
        onItemPress={this.onItemPress}
        isLoading={this.state.loading || this.props.isRefreshing}
        fetchMatchingItem={isFilterActive ? this.fetchFilteredUsers : this.updateMatchingItem}
        isInviteBtnVisible={activeTab === 'New'}
        inviteAllCandidates={this.inviteAll}
        isMassMailingEnabled={activeItem && activeItem.is_mass_mailing}
      />
    );
  };
  render() {
    const { currentSorting, rejectedUsersCount, acceptedUsersCount, tabs, isFilterActive } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, paddingBottom: 50 }}>
        <MatchingTabs
          tabs={tabs}
          activeTabIndex={this.props.activeTabIndex}
          onTabPress={this.onTabPress}
          animationLeft={this.state.animationLeft}
          animationWidth={this.state.animationWidth}
          onTabLayout={this.onTabLayout}
          acceptedUsersCount={acceptedUsersCount}
          rejectedUsersCount={rejectedUsersCount}
        />
        <FilterRow
          handlerSortByDropdown={(state) => this.setModalState('isSortingDropDownOpen', state)}
          isSortOpen={this.state.isSortingDropDownOpen}
          navigateToFilter={this.navigateToFilter}
          isFilterActive={isFilterActive}
        />
        {this.state.isSortingDropDownOpen && (
          <SortingDropDown
            items={this.state.sortingOptions}
            filterBy={(item) => this.onSortingOptionsPress(item)}
            closeDropDown={(state) => this.setModalState('isSortingDropDownOpen', state)}
            selectedSorting={currentSorting}
            isMatchingComponent
          />
        )}
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isErrorModalVisible: state.matching.isErrorModalVisible,
  errorModalMsg: state.matching.errorModalMsg,
  activeItem: state.matching.activeItem,
  acceptedUsersCount: selectAcceptedUnViewedCount(state),
  rejectedUsersCount: selectRejectedUnViewedCount(state),
  currentSorting: state.matching.sorting,
  isRefreshing: state.matching.isRefreshing,
  tabs: state.matching.tabs,
  activeTabIndex: state.matching.activeTabIndex,
  activeTab: selectActiveTab(state),
  candidates: selectCandidates(state),
  activeItemType: selectActiveItemType(state),
  isFilterActive: selectAppliedStatus(state),
  filterState: state.matching.filter,
  seniorities: state.initialData.seniorities,
});

const mapDispatchToProps = {
  clearActiveItem,
  fetchMatchingJob,
  fetchMatchingTask,
  setUserInReview,
  clearMatchingInfo,
  fetchSelectedUserSkills,
  updateMatchingForJob,
  updateMatchingForTask,
  inviteAllCandidates,
  setMatchingSortingType,
  setSwipeableCandidates,
  setSwipeItemIndex,
  markCandidateAsViewed,
  setActivityDataForFilter,
  setLastViewedRoute,
  setActiveTabIndex,
  resetFilter,
  filterMatchingUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchingContainer);
