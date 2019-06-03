import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

export const StaticInput = ({ label, value, containerStyles }, { t }) => (
  <View style={[styles.inputContainer, containerStyles]}>
    <Text style={styles.label}>{t(label)}</Text>
    <Text style={styles.inputText}>{value}</Text>
  </View>
);

StaticInput.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  containerStyles: propTypes.oneOfType([propTypes.number, propTypes.object, propTypes.array]),
};
StaticInput.contextTypes = {
  t: propTypes.func.isRequired,
};
export default StaticInput;
