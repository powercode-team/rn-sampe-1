import { StyleSheet, Platform } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 7 : 15,
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.normal,
    fontWeight: '400',
    color: colors.white,
  },
});

export default styles;
