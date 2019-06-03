import { AppRegistry } from 'react-native';
import App from './App';
import bgMessaging from './src/bgMessaging';

AppRegistry.registerComponent('PeopleLink', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
