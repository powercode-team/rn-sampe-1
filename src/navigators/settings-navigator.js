import React from 'react';
import { StackNavigator } from 'react-navigation';

import { translateTitle } from '../translations/navigation';

import transitionConfig from './transition-config';

import SettingsScreen from '../containers/Settings/Settings';
import ChangePasswordScreen from '../containers/ChangePassword';
import DeactivateAccountContainer from '../containers/DeactivateAccount';
import TermsOfUseContainer from '../containers/TermsOfUse';
import SubstituteSearchScreen from '../containers/Settings/SubstituteSearch';

import HeaderBackButton from '../components/HeaderBackButton/HeaderBackButton';
import HeaderRightTextButton from '../components/HeaderRightTextButton/HeaderRightTextButton';
import HeaderTitle from '../components/HeaderTitle/HeaderTitle';

const SettingsNavigator = StackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => {
        const lang = navigation.getParam('lang');
        const title = lang ? translateTitle(lang, 'Settings') : 'Settings';
        return {
          headerTitle: <HeaderTitle text={title} />,
          headerLeft: null,
        };
      },
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: ({ navigation }) => {
        const lang = navigation.getParam('lang');
        const title = lang ? translateTitle(lang, 'Change password') : 'Change password';
        return {
          headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
          headerRight: (
            <HeaderRightTextButton
              text={translateTitle(lang, 'Save')}
              action={() => navigation.state.params.onSave()}
            />
          ),
          headerTitle: <HeaderTitle text={title} />,
        };
      },
    },
    DeactivateAccount: {
      screen: DeactivateAccountContainer,
    },
    TermsOfUse: {
      screen: TermsOfUseContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    SubstituteSearch: {
      screen: SubstituteSearchScreen,
    },
  },
  {
    initialRouteName: 'Settings',
    transitionConfig,
    headerMode: 'none',
  },
);
export default SettingsNavigator;
