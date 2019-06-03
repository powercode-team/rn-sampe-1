import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.medium,
    color: colors.primary,
    fontSize: 20,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  sliderContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 35,
  },
  selectLabel: {
    width: '100%',
    fontSize: 12,
    color: colors.text,
    fontFamily: fonts.normal,
    marginBottom: 7,
  },
  selectValue: {
    height: 30,
    width: '90%',
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
  sliderSelectedStyle: {
    height: 2,
    backgroundColor: colors.textLight,
  },
  sliderUnselectedStyle: {
    height: 5,
    backgroundColor: colors.secondary,
  },
  sliderContainerStyle: {
    width: '100%',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerStyle: {
    borderWidth: 1,
    borderColor: colors.secondary,
    elevation: 0,
    backgroundColor: colors.background,
    width: 24,
    height: 24,
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
  wrapperInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    paddingVertical: 15,
    paddingLeft: 15,
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
    fontSize: 20,
  },
});

export default styles;
