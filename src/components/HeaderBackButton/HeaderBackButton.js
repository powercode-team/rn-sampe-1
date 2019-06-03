import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { colors } from './../../styles/base';

const HeaderBackButton = ({ goTo, color, title }, { t }) => (
  <TouchableOpacity onPress={goTo}>
    <View style={styles.wrapper}>
      {title.length ? (
        <Text style={[styles.title, { color }]}>{t(title)}</Text>
      ) : (
        <Icon name="angle-left" size={34} color={color} />
      )}
    </View>
  </TouchableOpacity>
);

HeaderBackButton.defaultProps = {
  color: colors.white,
  title: '',
};

HeaderBackButton.propTypes = {
  goTo: propTypes.func.isRequired,
  color: propTypes.string,
  title: propTypes.string,
};
HeaderBackButton.contextTypes = {
  t: propTypes.func.isRequired,
};
export default HeaderBackButton;
