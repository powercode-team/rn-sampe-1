import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  tabWrapper: {
    flexGrow: 3,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    zIndex: 60,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabName: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.primary,
    textAlign: 'center',
  },
  tabsScrollWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  tabsWrapper: {
    alignSelf: 'center',
    minWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    zIndex: 50,
  },
  tabBottomLine: {
    height: 1.6,
    backgroundColor: colors.secondary,
  },
});

export default styles;
