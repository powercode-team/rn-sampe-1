import { StackNavigator } from 'react-navigation';
import AuthNavigator from './auth-navigator';
import MainTabNavigation from './main-tab-nav';
import DetectAuth from '../containers/DetectAuth';

const AppNavigator = StackNavigator(
  {
    Auth: { screen: AuthNavigator },
    Main: { screen: MainTabNavigation },
    DetectAuth: {
      screen: DetectAuth,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: 'DetectAuth',
  },
);

export default AppNavigator;
