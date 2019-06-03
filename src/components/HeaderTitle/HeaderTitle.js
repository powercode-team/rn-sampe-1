import React from 'react';
import { Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';
import { colors, dimensions } from '../../styles/base';

// const TITLE_WITH = dimensions.screenWidth * 0.5;
const MAX_NUMBER_OF_LETTERS = Math.floor((dimensions.screenWidth * 0.5) / 12);
console.log('MAX_NUMBER_OF_LETTERS', MAX_NUMBER_OF_LETTERS);

const cutTitle = (title) =>
  (title.length > MAX_NUMBER_OF_LETTERS ? `${title.substr(0, MAX_NUMBER_OF_LETTERS)}...` : title);

const HeaderTitle = ({ text, color }, { t }) => (
  <Text style={[styles.title, { color }]} numberOfLines={1}>
    {t(cutTitle(text))}
  </Text>
);

HeaderTitle.defaultProps = {
  color: colors.white,
  text: '',
};

HeaderTitle.propTypes = {
  text: propTypes.string,
  color: propTypes.string,
};

HeaderTitle.contextTypes = {
  t: propTypes.func.isRequired,
};
export default HeaderTitle;
