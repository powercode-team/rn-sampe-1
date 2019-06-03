import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import { colors } from './../../styles/base';

export const LocationRadius = ({ radius, isCompact, isCurrentRadius }) => {
  const label = isCompact ? radius : `${radius} km`;
  return (
    <View style={styles.radiusItem}>
      <View style={styles.radiusWrapper}>
        <Icon name="location-pin" color={isCurrentRadius ? colors.primary : colors.text} size={18} />
      </View>
      {radius && (
        <Text
          style={[
            styles.radiusLabel,
            { fontSize: isCompact ? 12 : 14, color: isCurrentRadius ? colors.primary : colors.text },
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

LocationRadius.propTypes = {
  radius: propTypes.number.isRequired,
  isCompact: propTypes.bool,
  isCurrentRadius: propTypes.bool.isRequired,
};

export default LocationRadius;
