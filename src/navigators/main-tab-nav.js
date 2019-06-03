import React from 'react';
/* react/prop-types: 0 */
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';

import { StyleSheet, View, Text, Dimensions } from 'react-native';

import OffersScreen from '../containers/Offers/Offers';
import ProfileScreen from '../containers/Profile/Profile';
import DetailedOfferScreen from '../containers/Offers/DetailedOffer';
import OffersSwiperScreen from '../containers/Offers/OffersSwiper';
import FiltersContainer from '../containers/Offers/Filters';

import store from './../store';
import transitionConfig from './transition-config';

import FindPeopleNavigation from './find-people-nav';

import { translateTitle } from '../translations/navigation';
import ChatsNavigator from './chats-navigator';
import SettingsNavigator from './settings-navigator';

import HeaderTitle from '../components/HeaderTitle/HeaderTitle';

import { fonts, colors } from './../styles/base';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TAB_WITH = SCREEN_WIDTH / 5;

const generateLabel = (routeName) => {
  if (routeName === 'Searches') return 'Create Post';
  if (routeName === 'Invitations') return 'Invitations';
  return routeName;
};

const styles = StyleSheet.create({
  iconStyle: { fontFamily: fonts.icons, fontSize: 22 },
  CPLabel: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    color: colors.text,
    fontWeight: '600',
    fontSize: 17,
    fontFamily: fonts.normal,
  },
  dotStyles: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    position: 'absolute',
    top: 0,
    right: -3,
    zIndex: 100,
  },
});
const navigationOptions = ({ navigation }) => {
  const { lang } = store.getState().i18nState;
  return {
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName = '';
      if (routeName === 'Searches') {
        iconName = focused ? (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue806'}</Text>
        ) : (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue807'}</Text>
        );
      } else if (routeName === 'Invitations') {
        const storeData = store.getState();
        const newOffers = storeData.offers.offers.filter((offerObj) => offerObj.offer_status === 'new' && !offerObj.is_viewed_by_candidate);
        let icon = null;
        iconName = focused ? (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue804'}</Text>
        ) : (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue805'}</Text>
        );
        if (newOffers.length && !focused) {
          icon = (
            <View>
              {iconName}
              <View style={styles.dotStyles} />
            </View>
          );
        }
        return icon || iconName;
      } else if (routeName === 'Chats') {
        const storeData = store.getState();
        iconName = focused ? (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue802'}</Text>
        ) : (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue803'}</Text>
        );

        let icon = null;
        if (storeData.chat.hasNewMessage) {
          icon = (
            <View>
              {iconName}
              <View style={styles.dotStyles} />
            </View>
          );
        }
        return icon || iconName;
      } else if (routeName === 'Profile') {
        iconName = focused ? (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue808'}</Text>
        ) : (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue809'}</Text>
        );
      } else if (routeName === 'Settings') {
        iconName = focused ? (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue800'}</Text>
        ) : (
          <Text style={[styles.iconStyle, { color: tintColor }]}>{'\ue801'}</Text>
        );
      }
      return iconName;
    },
    title: navigation.state.routeName,
    tabBarLabel: translateTitle(lang, generateLabel(navigation.state.routeName)),
    headerTintColor: colors.text,
    headerStyle: { borderBottomWidth: 0, backgroundColor: colors.primary, elevation: 0 },
  };
};

const ProfileNavigator = StackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => {
        const lang = navigation.getParam('lang');
        const title = translateTitle(lang, 'Profile');
        return {
          headerTitle: <HeaderTitle text={title} />,
        };
      },
    },
  },
  {
    initialRouteName: 'Profile',
    transitionConfig,
    headerMode: 'none',
  },
);

const OffersNavigator = StackNavigator(
  {
    Invitations: {
      screen: OffersScreen,
      navigationOptions: ({ navigation }) => {
        const lang = navigation.getParam('lang');
        const title = translateTitle(lang, 'Invitations');
        return {
          headerLeft: <View />,
          headerTitle: <HeaderTitle text={title} />,
          headerRight: <View />,
        };
      },
    },
    DetailedOffer: {
      screen: DetailedOfferScreen,
    },
    OffersSwiper: {
      screen: OffersSwiperScreen,
    },
    Filters: {
      screen: FiltersContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  {
    initialRouteName: 'Invitations',
    transitionConfig,
    headerMode: 'none',
    navigationOptions,
    tabBarOptions: {
      activeTintColor: colors.text,
      inactiveTintColor: colors.text,
      showLabel: true,
      style: {
        backgroundColor: colors.background,
      },
    },
  },
);

const mainBottomNavigation = TabNavigator(
  {
    Searches: {
      screen: FindPeopleNavigation,
      navigationOptions: ({ navigationOptions: navOptions }) => ({
        headerTitle: <HeaderTitle text={navOptions.screenTitle} />,
        headerStyle: { borderBottomWidth: 0, backgroundColor: colors.primary, elevation: 0 },
      }),
    },
    Invitations: {
      screen: OffersNavigator,
      navigationOptions: {},
    },
    Chats: {
      screen: ChatsNavigator,
    },
    Profile: {
      screen: ProfileNavigator,
    },
    Settings: {
      screen: SettingsNavigator,
    },
  },
  {
    initialRouteName: 'Searches',
    transitionConfig,
    navigationOptions,
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.white,
      showLabel: true,
      style: {
        backgroundColor: colors.greyBG,
      },
      tabStyle: {
        width: TAB_WITH,
        borderRightColor: colors.tabIcon,
        borderRightWidth: 1,
      },
      labelStyle: {
        width: TAB_WITH - 4,
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
  },
);

export default mainBottomNavigation;
