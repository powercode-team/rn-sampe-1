import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';
import { colors } from './../../../styles/base';

export const Tab = ({ tabName, count, isActive, onPress, onTabLayout }) => (
  <TouchableOpacity style={{ flexGrow: 1 }} onPress={onPress}>
    <View onLayout={(e) => onTabLayout(e)} style={styles.tab}>
      <View style={styles.innerWrapper}>
        <Text style={[styles.tabText, isActive ? { color: colors.secondary } : {}]}>{tabName}</Text>
        {count ? <View style={styles.blueDot} /> : null}
      </View>
    </View>
  </TouchableOpacity>
);

Tab.propTypes = {
  tabName: propTypes.string.isRequired,
  count: propTypes.number,
  isActive: propTypes.bool.isRequired,
  onPress: propTypes.func.isRequired,
  onTabLayout: propTypes.func.isRequired,
};

export default Tab;
