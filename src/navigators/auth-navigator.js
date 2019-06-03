import React from 'react';
import { StackNavigator } from 'react-navigation';

import HeaderBackButton from './../components/HeaderBackButton/HeaderBackButton';
import HeaderTitle from './../components/HeaderTitle/HeaderTitle';

import LoginScreen from '../containers/Login';
import SignUpScreen from '../containers/SignUp';
import PasswordRecoveryScreen from '../containers/PasswordRecovery/PasswordRecovery';
import NewPasswordScreen from '../containers/PasswordRecovery/NewPassword';
import TermsOfUseScreen from '../containers/TermsOfUse';

import transitionConfig from './transition-config';
import { colors } from './../styles/base';

const authNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
        headerTitle: <HeaderTitle text="Sign up" />,
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: colors.primary,
          elevation: 0,
        },
      }),
    },
    PasswordRecovery: {
      screen: PasswordRecoveryScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
        headerTitle: <HeaderTitle text="Forgot password?" />,
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: colors.primary,
          elevation: 0,
        },
      }),
    },
    NewPassword: {
      screen: NewPasswordScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
        headerTitle: <HeaderTitle text="New password" />,
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          borderBottomWidth: 0,
        },
      }),
    },
    AuthTermsOfUse: {
      screen: TermsOfUseScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
        headerTitle: <HeaderTitle text="Terms of Use & Privacy" />,
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          borderBottomWidth: 0,
        },
      }),
    },
  },
  {
    initialRouteName: 'Login',
    transitionConfig,
    headerMode: 'none',
  },
);

export default authNavigator;
