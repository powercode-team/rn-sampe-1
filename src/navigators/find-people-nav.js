import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import transitionConfig from './transition-config';

import HeaderBackButton from '../components/HeaderBackButton/HeaderBackButton';
import SearchesContainer from './../containers/Search/Searches';
import ChooseCreate from '../containers/ChooseCreate';
import CreateForm from '../containers/CreateForm';
import Matching from '../containers/Matching/Matching';
import CompactProfile from '../containers/Matching/CompactProfile';
import ProfilesSwiperScreen from '../containers/Matching/ProfilesSwiper';
import SearchFiltersContainer from '../containers/Search/Filters';
import MatchingFiltersContainer from '../containers/Matching/Filters';
import { translateTitle } from '../translations/navigation';
import MatchingArchiveNav from './matching-archive-nav';

const FindPeopleNavigation = StackNavigator(
  {
    FindPeopleTabs: {
      screen: SearchesContainer,
    },
    СhooseСreate: {
      screen: ChooseCreate,
      navigationOptions: ({ navigation }) => {
        const isHr = navigation.getParam('isHr');
        const lang = navigation.getParam('lang');
        const title = isHr ? 'Create job or task' : 'Create';
        return {
          screenTitle: lang ? translateTitle(lang, title) : title,
          headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
          headerRight: <View />,
        };
      },
    },
    CreateForm: { screen: CreateForm },
    Matching: { screen: Matching },
    ProfilesSwiper: { screen: ProfilesSwiperScreen },
    CompactProfile: { screen: CompactProfile },
    SearchFilters: {
      screen: SearchFiltersContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    MatchingFilters: {
      screen: MatchingFiltersContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    MatchingArchive: { screen: MatchingArchiveNav },
  },
  {
    initialRouteName: 'FindPeopleTabs',
    transitionConfig,
    headerMode: 'none',
  },
);

const defaultGetStateForAction = FindPeopleNavigation.router.getStateForAction;

FindPeopleNavigation.router.getStateForAction = (action, state) => {
  if (
    action &&
    action.type === 'Navigation/NAVIGATE' &&
    state &&
    state.routes[state.index].routeName === 'ProfilesSwiper' &&
    action.routeName !== 'CompactProfile' &&
    action.routeName !== 'Searches' &&
    action.routeName !== 'Invitations' &&
    action.routeName !== 'Chats' &&
    action.routeName !== 'Profile' &&
    action.routeName !== 'Settings'
  ) {
    // const matchingRouteName = state && `${state.routes[state.index].params.type}Matching`;
    const oldRoutesLength = state.routes.length;
    const newRoutes = state.routes.filter((routeObj) => routeObj.routeName !== 'ProfilesSwiper');
    const obj = {
      ...state,
      routes: newRoutes,
      index: oldRoutesLength - newRoutes.length,
    };
    return defaultGetStateForAction(action, obj);
  }
  if (
    action &&
    action.type === 'Navigation/NAVIGATE' &&
    state &&
    state.routes[state.index].routeName === 'CreateForm' &&
    action.routeName === 'Matching'
  ) {
    // const matchingRouteName = state && `${state.routes[state.index].params.type}Matching`;
    const oldRoutesLength = state.routes.length;
    const newRoutes = state.routes.filter((routeObj) => routeObj.routeName !== 'CreateForm');
    const obj = {
      ...state,
      routes: newRoutes,
      index: oldRoutesLength - newRoutes.length,
    };
    return defaultGetStateForAction(action, obj);
  }
  return defaultGetStateForAction(action, state);
};

export default FindPeopleNavigation;
