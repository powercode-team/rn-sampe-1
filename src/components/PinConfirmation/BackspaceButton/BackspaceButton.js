import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export const BackspaceButton = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapperButton}>
        <Ionicons name="md-backspace" color="#626262" size={32} />
      </View>
    </TouchableOpacity>
  </View>
);

BackspaceButton.propTypes = {
  onPress: propTypes.func.isRequired,
};

export default BackspaceButton;
