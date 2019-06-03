import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  tabButton: {
    flexGrow: 1,
  },
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerWrapper: {
    // width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBottomLine: {
    height: 1.6,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.secondary,
  },
  tabText: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.primary,
    textAlign: 'center',
  },
  blueDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    top: 8,
    right: -10,
    backgroundColor: colors.secondary,
  },
});

export default styles;
