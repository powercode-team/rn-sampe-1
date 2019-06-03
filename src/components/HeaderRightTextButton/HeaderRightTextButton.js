import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

const HeaderRightTextButton = ({ text, action, isLeft }, { t }) => (
  <TouchableOpacity style={[styles.wrapper, isLeft ? { paddingLeft: 15 } : { paddingLeft: 25 }]} onPress={action}>
    <Text style={styles.text}>{t(text)}</Text>
  </TouchableOpacity>
);

HeaderRightTextButton.defaultProps = {
  action: () => {},
};

HeaderRightTextButton.propTypes = {
  text: propTypes.string.isRequired,
  action: propTypes.func,
  isLeft: propTypes.bool,
};
HeaderRightTextButton.contextTypes = {
  t: propTypes.func.isRequired,
};
export default HeaderRightTextButton;
