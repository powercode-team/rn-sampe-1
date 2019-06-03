import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { colors } from './../../../styles/base';

const SelectableRow = ({ value, isActive, onPress }, { t }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.wrapper}>
      <View style={[styles.defaultChecker, isActive ? styles.checkerActive : styles.checkerNotActive]}>
        {isActive ? <IconFontAwesome name="check" size={16} color={colors.background} /> : null}
      </View>
      <Text style={styles.value}>{t(value)}</Text>
    </View>
  </TouchableOpacity>
);

SelectableRow.propTypes = {
  value: propTypes.string.isRequired,
  isActive: propTypes.bool,
  onPress: propTypes.func.isRequired,
};
SelectableRow.contextTypes = {
  t: propTypes.func.isRequired,
};
export default SelectableRow;
