import { StackNavigator } from 'react-navigation';

import transitionConfig from './transition-config';
import DialogListContainer from './../containers/Chat/DialogList';
import ChatContainer from './../containers/Chat/Chat';
import ChatProfileContainer from '../containers/Chat/ChatProfile';
import ChatMatchingContainer from '../containers/Chat/ChatMatching';
import ChatOfferContainer from '../containers/Chat/ChatOffer';

const ChatsNavigator = StackNavigator(
  {
    dialogList: { screen: DialogListContainer },
    chat: {
      screen: ChatContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    profile: {
      screen: ChatProfileContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    matching: {
      screen: ChatMatchingContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    offer: {
      screen: ChatOfferContainer,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  {
    initialRouteName: 'dialogList',
    transitionConfig,
    headerMode: 'none',
  },
);

export default ChatsNavigator;
