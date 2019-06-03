import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

export const PinButton = ({ number, letters, onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => onPress(number)}>
      <View style={styles.wrapperButton}>
        <Text style={[styles.text, styles.number]}>{number}</Text>
        <Text style={[styles.text, styles.letters]}>{letters}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

PinButton.propTypes = {
  number: propTypes.number.isRequired,
  onPress: propTypes.func.isRequired,
  letters: propTypes.string,
};

PinButton.defaultProps = {
  letters: '',
};

export default PinButton;
