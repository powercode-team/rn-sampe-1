import { StyleSheet } from 'react-native';
import { dimensions, fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  keyboardWrapper: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapperJobLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  jobName: {
    fontSize: 15,
    color: colors.primary,
    fontFamily: fonts.normal,
    width: dimensions.screenWidth * 0.8,
  },
  containerFlatList: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  wrapperReadOnlyText: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.textLight,
  },
  readOnlyText: {
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
    padding: 20,
    textAlign: 'center',
  },
});

export default styles;
