import { StyleSheet, Platform } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 15,
    paddingRight: 35,
    paddingVertical: Platform.OS === 'ios' ? 5 : 7,
  },
  title: {
    fontSize: 15,
    fontFamily: fonts.normal,
    fontWeight: '400',
    color: colors.primary,
  },
});

export default styles;
