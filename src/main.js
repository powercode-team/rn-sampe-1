import React from 'react';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import I18n from 'redux-i18n';
import { translations } from './translations/translations';

import store from './store';
import AppNavigator from './navigators/app-navigator';
import IsConnected from './containers/NetConnection';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Setting a timer']);

const Main = () => (
  <React.Fragment>
    <Provider store={store}>
      <I18n translations={translations}>
        <AppNavigator />
        <IsConnected store={store} />
      </I18n>
    </Provider>
  </React.Fragment>
);

export default Main;
