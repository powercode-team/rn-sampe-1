import { StyleSheet } from 'react-native';
import { colors } from './../../../styles/base';

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
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBottomLine: {
    height: 1.6,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.secondary,
  },
});

export default styles;
