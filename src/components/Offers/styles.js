import { StyleSheet, Platform } from 'react-native';
import { colors, fonts, dimensions } from './../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  noInvitations: {
    color: colors.text,
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  list: {
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 60 : 110,
  },
  emptyWrapper: {
    minHeight: dimensions.screenHeight * 0.35,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default styles;
