import React from 'react';
import propTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

const SubstituteList = ({ children, showFoundUsers }, { t }) => (
  <View style={styles.wrapper}>
    <View style={styles.headerWrapper}>
      <Text style={styles.headerTitle}>{t('List of HR employees')}</Text>
    </View>
    <View style={styles.wrapperContent}>
      {showFoundUsers ? <Text style={styles.notFountMsg}>{t('User not found')}</Text> : children}
    </View>
  </View>
);

SubstituteList.propTypes = {
  children: propTypes.node.isRequired,
  showFoundUsers: propTypes.bool.isRequired,
};

SubstituteList.contextTypes = {
  t: propTypes.func.isRequired,
};

export default SubstituteList;
