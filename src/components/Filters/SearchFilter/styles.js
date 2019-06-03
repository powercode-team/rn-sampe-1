import { StyleSheet, Platform } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    marginTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 60 : 110,
  },
  scrollableContainer: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    zIndex: 1,
  },
  sectionWrapper: {
    flexDirection: 'column',
  },
  title: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    color: colors.text,
    fontSize: 20,
    fontFamily: fonts.medium,
  },
  wrapperInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    paddingVertical: 15,
    paddingLeft: 25,
    paddingRight: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontFamily: fonts.normal,
    color: colors.text,
    padding: 0,
    fontSize: 15,
    flex: 1,
  },
  wrapperClearIconContainer: {
    position: 'absolute',
    right: 10,
    top: 4,
  },
  wrapperClearIcon: {
    padding: 15,
  },
  iconInput: {
    color: colors.text,
    marginRight: 15,
    fontFamily: fonts.icons,
    fontSize: 18,
  },
});

export default styles;
