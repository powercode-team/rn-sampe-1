import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapperHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.screenHeight * 0.25,
  },
  headerText: {
    fontFamily: fonts.normal,
    fontSize: 17,
    color: colors.text,
    maxWidth: 250,
    textAlign: 'center',
  },
  wrapperInput: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    paddingVertical: 15,
    paddingLeft: 25,
    paddingRight: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 17,
  },
  placeholder: {
    fontSize: 17,
    fontFamily: fonts.normal,
  },
  wrapperClearIconContainer: {
    position: 'absolute',
    right: 10,
    top: 3,
  },
  wrapperClearIcon: {
    padding: 15,
  },
  buttonContainer: {
    width: '100%',
  },
  touchable: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    height: 40,
    marginTop: 10,
    marginHorizontal: 10,
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
  icon: {
    fontFamily: fonts.icons,
    fontSize: 16,
  },
});

export default styles;
