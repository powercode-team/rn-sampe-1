import React from 'react';
import propTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';

import FeatherIcons from 'react-native-vector-icons/Feather';

import { colors } from '../../../styles/base';

import styles from './styles';

const SubstituteItem = ({ email, onPress }) => (
  <TouchableOpacity style={styles.wrapper} onPress={onPress}>
    <Text style={styles.email}>{email}</Text>
    <FeatherIcons name="plus" size={28} color={colors.primary} />
  </TouchableOpacity>
);

SubstituteItem.propTypes = {
  email: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
};
export default SubstituteItem;
