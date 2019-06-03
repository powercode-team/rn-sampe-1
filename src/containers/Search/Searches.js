import React, { Component } from 'react';
import { BackHandler, Animated, View } from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
// import { setLanguage } from 'redux-i18n';

import {
  fetchAllJobs,
  fetchAllTasks,
  sortTasksOrJob,
  setFirstMountStatus,
  archiveEntity,
  setActivesActivitiesTabIndex,
  showSearchesPopup,
  closeSearchesPopup,
} from '../../actions/tasksJobs';
import { setActiveTabIndex as setMatchingArchiveIndex } from './../../actions/matchingArchive';

import { selectAppliedStatus } from '../../selectors/activities';

import { getUserId } from '../../selectors/user';

import { setActiveItem, setActiveTabIndex, fullMatchingFilterReset, clearMatchingInfo } from '../../actions/matching';
import { retrieveDeviceToken, updateDeviceToken } from '../../actions/notifications';
import { setThreadId, fetchAllTheads, setLastViewedRoute } from '../../actions/chat';
import { initializeChannel } from '../../actions/socketConnection';
import { fetchOffers, setOffersTabIndex } from '../../actions/offers';

import { fetchUserProfile } from '../../actions/user';

import SearchPeopleHeader from '../../components/SearchPeople/SearchPeopleHeader/SearchPeopleHeader';
import SearchList from '../../components/SearchPeople/SearchList/SearchList';
import DropdownSortBy from '../../components/SearchPeople/DropdownSortBy/DropdownSortBy';
import ValidationError from '../../components/ValidationError/ValidationError';
import SearchTabs from '../../components/SearchPeople/SearchTabs/SearchTabs';
import { translateTitle } from './../../translations/navigation';
import HeaderRightTextButton from './../../components/HeaderRightTextButton/HeaderRightTextButton';

const sortByItems = [
  {
    name: 'location',
    text: 'Location',
  },
  {
    name: 'postingDate',
    text: 'Posting date',
  },
  {
    name: 'alphabet',
    text: 'Alphabet',
  },
  {
    name: 'category',
    text: 'Category',
  },
];

class SearchesContainer extends Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    fetchAllJobs: propTypes.func.isRequired,
    allJobs: propTypes.array.isRequired,
    fetchAllTasks: propTypes.func.isRequired,
    allTasks: propTypes.array.isRequired,
    sortTasksOrJob: propTypes.func.isRequired,
    isHr: propTypes.bool.isRequired,
    archiveEntity: propTypes.func.isRequired,
    isErrorModalVisible: propTypes.bool.isRequired,
    errorModalMsg: propTypes.string.isRequired,
    fetchUserProfile: propTypes.func.isRequired,
    setActiveItem: propTypes.func.isRequired,
    retrieveDeviceToken: propTypes.func.isRequired,
    updateDeviceToken: propTypes.func.isRequired,
    setThreadId: propTypes.func.isRequired,
    fetchOffers: propTypes.func.isRequired,
    initializeChannel: propTypes.func.isRequired,
    fetchAllTheads: propTypes.func.isRequired,
    lastViewedRoute: propTypes.oneOfType([propTypes.string, propTypes.bool]).isRequired,
    alreadyMounted: propTypes.bool.isRequired,
    setFirstMountStatus: propTypes.func.isRequired,
    setLastViewedRoute: propTypes.func.isRequired,
    langX: propTypes.string.isRequired,
    setActiveTabIndex: propTypes.func.isRequired,
    setOffersTabIndex: propTypes.func.isRequired,
    fullMatchingFilterReset: propTypes.func.isRequired,
    clearMatchingInfo: propTypes.func.isRequired,
    isFilterApplied: propTypes.bool.isRequired,
    setActivesActivitiesTabIndex: propTypes.func.isRequired,
    activeTabIndex: propTypes.number.isRequired,
    tabs: propTypes.array.isRequired,
    jobsFilter: propTypes.object.isRequired,
    tasksFilter: propTypes.object.isRequired,
    userId: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    closeSearchesPopup: propTypes.func.isRequired,
    setMatchingArchiveIndex: propTypes.func.isRequired,
    showSearchesPopup: propTypes.func.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    return {
      screenTitle: lang ? translateTitle(lang, 'Create Post') : 'Create Post',
      headerLeft: <View />,
      headerRight: (
        <HeaderRightTextButton
          text="Archive"
          action={navigation.state.params && navigation.state.params.navigateToArchive}
        />
      ),
      tabBarVisible: true,
    };
  };

  constructor(props) {
    super(props);
    this.counter = 0;
    this.tabsCoordinates = [{ width: 0, left: 0 }, { width: 0, left: 0 }];
  }

  state = {
    sortByDropdownIsShow: false,
    firstLoading: true,
    isRefreshingList: true,
    selectedSorting: 'location',
    animationLeft: new Animated.Value(0),
    animationWidth: 0,
  };

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backListener);

    if (!this.props.alreadyMounted) {
      this.props.fetchOffers(() => {
        // it is necessary for navigation router state update,
        // so that it could see new offers in redux state and display blue dot
        this.props.navigation.setParams({ reset: 'navigationState' });
      });

      this.props.fetchAllTheads(() => this.props.navigation.setParams({ isShowBageOnChatTab: true }));

      this.props.fetchUserProfile(() => {
        this.getDataAfterDetectUserRole();
        this.props.initializeChannel(this.props.navigation.setParams);
        this.lastHrState = this.props.isHr;
      });

      this.props.retrieveDeviceToken();

      this.onTokenRefreshListener = firebase.messaging().onTokenRefresh((fcmToken) => {
        this.props.updateDeviceToken(fcmToken);
      });
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        const { notification } = notificationOpen;
        // console.log('nitification aaaa', notification);
        this.onNotificationPress(notification);
      });

      const notificationOpen = await firebase.notifications().getInitialNotification();
      // console.log('notificationOpen', notificationOpen);
      if (notificationOpen) {
        const { notification } = notificationOpen;
        this.onNotificationPress(notification);
      }
      this.props.setFirstMountStatus();
    } else {
      this.lastHrState = this.props.isHr;
      this.getDataAfterDetectUserRole();
    }
    // console.log('language is', this.props.langX);
    this.props.navigation.setParams({ lang: this.props.langX, navigateToArchive: this.navigateToArchive });
  }

  componentDidUpdate(prevProps) {
    if (this.props.langX !== prevProps.langX) {
      // console.log('now language is', this.props.langX);
      this.props.navigation.setParams({ lang: this.props.langX });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backListener);
  }

  onNotificationPress = (notification) => {
    const { type } = notification._data;
    if (type === 'submitted offer' || type === 'canceled offer') {
      this.props.setOffersTabIndex(type === 'submitted offer' ? 2 : 3);
      const resetAction = NavigationActions.reset({
        key: 'Invitations',
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Invitations' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
    if (type === 'new message') {
      // we need this to handle a case when user closes the app or puts it into background while being on a chat
      // (ChatContainer) screen; in that case, without this statement, our chat would break (chat component will be
      // unmounted, leaveThread function would fire, then we would rebuild our stack, including Chat component, and
      // reconnect to the same chat room, but messaging would break). To fix this, we started to track lastViewedScreen
      // in redux store, that updates only in the case of application going background FROM(!!) chat screen.
      // So we are checking if last screen before going background is Chat, then we just drop last screen
      // (Searches in this case), and return to our previous Chat screen, without rerendering it and without
      // reconnecting to chat room. lastViewedScreen logic is located in ChatContainer component;
      if (this.props.lastViewedRoute === 'chat') {
        this.props.navigation.goBack();
      } else {
        const threadId = JSON.parse(notification._data.thread_id);
        this.props.setThreadId(threadId);
        const resetAction = NavigationActions.reset({
          key: 'Chats',
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'dialogList' }),
            NavigationActions.navigate({ routeName: 'chat' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }
    if (type === 'accepted offer' || type === 'declined offer') {
      if (this.props.lastViewedRoute === 'matching') {
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'Main',
            }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
        this.props.setLastViewedRoute(false);
      }
      const offer = JSON.parse(notification._data.activity);
      this.props.setActiveItem(offer);
      this.props.setActiveTabIndex(type === 'accepted offer' ? 0 : 2);
      const navigationAction = NavigationActions.navigate({
        routeName: 'Searches',
        action: NavigationActions.navigate({
          routeName: 'Matching',
          params: { title: offer.title, fromPush: true },
        }),
      });
      this.props.navigation.dispatch(navigationAction);
    }
  };

  onTabPress = (i) => {
    if (this.props.isHr) {
      this.props.setActivesActivitiesTabIndex(i);
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
    }
  };

  onTabLayout = (event, index) => {
    const { width } = event.nativeEvent.layout;
    this.tabsCoordinates[index].width = width;
    if (this.counter === 1) {
      this.tabsCoordinates[1].left = this.tabsCoordinates[0].width;
      this.setState({ animationWidth: new Animated.Value(this.tabsCoordinates[0].width) });
      if (this.props.activeTabIndex === 1) {
        Animated.parallel([
          Animated.timing(this.state.animationLeft, {
            toValue: this.tabsCoordinates[1].left,
            duration: 400,
          }),
          Animated.timing(new Animated.Value(this.tabsCoordinates[0].width), {
            toValue: this.tabsCoordinates[1].width,
            duration: 400,
          }),
        ]).start();
      }
    }
    this.counter = this.counter + 1;
  };

  onItemPress = (item) => {
    this.props.setActiveItem(item);
    this.props.setActiveTabIndex(0);
    this.props.fullMatchingFilterReset();
    this.props.clearMatchingInfo();
    this.resetTabIndex();
    this.throttledNavigate('Matching');
  };

  onCreatePress = () => {
    this.props.setActiveTabIndex(0);
    this.props.clearMatchingInfo();
    this.navigateToCreate();
  };

  getDataAfterDetectUserRole() {
    if (this.props.isHr) {
      this.props.fetchAllJobs(() => this.hideLoadingModal());
    } else {
      // this.setState({ activeTabIndex: 1 });
      this.props.setActivesActivitiesTabIndex(1);
    }
    this.props.fetchAllTasks(() => this.hideLoadingModal());
    this.setState({ firstLoading: false });
  }

  getCurrentType = () => (this.props.tabs[this.props.activeTabIndex] === 'Jobs' ? 'job' : 'task');
  setInteractableRef = (item, node) => {
    // push object with job/task id, type and node itself to the complete list
    // check if it is already there, if yes - do not do anything
    // multiple calls occur because of multiple rerenders
    const type = Object.prototype.hasOwnProperty.call(item, 'contract_type_id') ? 'Job' : 'Task';
    if (!this.refsList.find((obj) => obj.id === item.id && obj.type === type)) {
      this.refsList.push({ id: item.id, node, type });
    }
  };
  resetTabIndex = () => {
    const { isHr, activeTabIndex } = this.props;
    if (isHr && activeTabIndex === 0) {
      this.props.setActivesActivitiesTabIndex(0);
      Animated.parallel([
        Animated.timing(this.state.animationLeft, {
          toValue: this.tabsCoordinates[0].left,
          duration: 400,
        }),
        Animated.timing(this.state.animationWidth, {
          toValue: this.tabsCoordinates[0].width,
          duration: 400,
        }),
      ]).start();
    } else {
      this.props.setActivesActivitiesTabIndex(1);
    }
  };
  navigateToArchive = () => {
    this.props.setMatchingArchiveIndex(0);
    this.props.navigation.navigate('MatchingArchive');
  };
  refsList = [];
  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, { trailing: false });

  backListener = () => {
    this.props.navigation.goBack();
    // return true;
  };

  navigateToFilter = () => this.throttledNavigate('SearchFilters', { fromTab: this.getCurrentType() });

  handlerSortByDropdown = (show) => this.setState({ sortByDropdownIsShow: show });

  filterSortBy(selected) {
    const whatSort = `all${this.props.tabs[this.props.activeTabIndex]}`;
    this.props.sortTasksOrJob(whatSort, selected.name);
    this.setState({ sortByDropdownIsShow: false, selectedSorting: selected.name });
  }

  navigateToCreate() {
    this.setState({ sortByDropdownIsShow: false });
    this.throttledNavigate('СhooseСreate');
  }

  detectDataForRender() {
    let dataForRender = [];
    if (this.props.isHr && this.props.activeTabIndex === 0) {
      dataForRender = this.props.allJobs || [];
    } else {
      dataForRender = this.props.allTasks || [];
    }
    return dataForRender;
  }

  updateList() {
    this.setState({ isRefreshingList: true });
    if (this.props.jobsFilter.isApplied || this.props.tasksFilter.isApplied) {
      setTimeout(() => this.setState({ isRefreshingList: false }), 800);
      return;
    }
    if (this.props.isHr && this.props.activeTabIndex === 0) {
      this.props.fetchAllJobs(() => this.setState({ isRefreshingList: false }));
    } else {
      this.props.fetchAllTasks(() => this.setState({ isRefreshingList: false }));
    }
  }

  archiveEntity = (entity) => {
    this.setState({ isRefreshingList: true });
    const type = this.props.tabs[this.props.activeTabIndex].slice(0, -1);
    this.props.archiveEntity(entity.id, type, (err) => {
      this.setState({ isRefreshingList: false });
      if (err) {
        this.refsList.find((item) => item.id === entity.id && item.type === type).node.snapTo({ index: 0 });
      } else {
        this.props.showSearchesPopup(`Success! \n ${type} archived`);
      }
      setTimeout(() => this.props.closeSearchesPopup(), 4000);
    });
  };

  closeErrorModal() {
    const action = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    });
    this.props.navigation.dispatch(action);
  }

  hideLoadingModal() {
    if (this.props.isErrorModalVisible) {
      setTimeout(() => this.setState({ isRefreshingList: false }), 800);
    } else {
      setTimeout(() => this.setState({ isRefreshingList: false }), 800);
    }
  }

  render() {
    const { isFilterApplied, tabs, isHr, activeTabIndex, userId } = this.props;

    const tabType = tabs[activeTabIndex] === 'Jobs' ? 'job' : 'task';

    return (
      <React.Fragment>
        {!this.state.firstLoading ? (
          <SearchTabs
            tabs={isHr ? tabs : [tabs[1]]}
            activeTabIndex={activeTabIndex}
            onTabPress={this.onTabPress}
            onTabLayout={this.onTabLayout}
            animationLeft={this.state.animationLeft}
            animationWidth={this.state.animationWidth}
          />
        ) : null}

        <SearchPeopleHeader
          isFilterActive={isFilterApplied}
          navigateToFilter={this.navigateToFilter}
          isSortOpen={this.state.sortByDropdownIsShow}
          handlerSortByDropdown={(show) => this.handlerSortByDropdown(show)}
        />

        <SearchList
          data={this.detectDataForRender()}
          notFound={this.state.notFound}
          goToCreate={this.onCreatePress}
          archiveEntity={this.archiveEntity}
          updateList={() => this.updateList()}
          isRefreshingList={this.state.isRefreshingList}
          loading={this.state.isRefreshingList}
          onItemPress={this.onItemPress}
          activityType={tabType}
          currentUserId={userId}
          setInteractableRef={this.setInteractableRef}
        />

        {this.state.sortByDropdownIsShow ? (
          <DropdownSortBy
            items={sortByItems}
            closeDropDown={this.handlerSortByDropdown}
            filterBy={(selected) => this.filterSortBy(selected)}
            selectedSorting={this.state.selectedSorting}
          />
        ) : null}
        <ValidationError message={this.props.errorModalMsg} isVisible={this.props.isErrorModalVisible} isBottom />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  tabs: state.tasksJobs.tabs,
  allJobs: state.tasksJobs.allJobs,
  allTasks: state.tasksJobs.allTasks,
  isErrorModalVisible: state.tasksJobs.isErrorModalVisible,
  errorModalMsg: state.tasksJobs.errorModalMsg,
  isHr: state.user.isHr,
  lastViewedRoute: state.chat.isChatLastViewedRoute,
  alreadyMounted: state.tasksJobs.mounted,
  langX: state.i18nState.lang,
  isFilterApplied: selectAppliedStatus(state),
  activeTabIndex: state.tasksJobs.activeTabIndex,
  jobsFilter: state.tasksJobs.jobsFilter,
  tasksFilter: state.tasksJobs.tasksFilter,
  userId: getUserId(state),
});

const mapDispatchToProps = {
  fetchUserProfile,
  fetchAllJobs,
  fetchAllTasks,
  sortTasksOrJob,
  archiveEntity,
  setActiveItem,
  retrieveDeviceToken,
  updateDeviceToken,
  setThreadId,
  fetchOffers,
  initializeChannel,
  fetchAllTheads,
  setFirstMountStatus,
  setLastViewedRoute,
  setActiveTabIndex,
  setOffersTabIndex,
  fullMatchingFilterReset,
  clearMatchingInfo,
  setActivesActivitiesTabIndex,
  showSearchesPopup,
  closeSearchesPopup,
  setMatchingArchiveIndex,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchesContainer);
