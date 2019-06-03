import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../styles/base';

const styles = StyleSheet.create({
  passwordRecoveryMainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  header: {
    width: '100%',
    height: 0.25 * dimensions.screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginLeft: '5%',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 15,
  },
  loginButton: {
    height: 40,
    marginTop: 15,
    padding: 10,
    width: '95%',
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.normal,
  },
  textMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.primary,
    fontFamily: fonts.medium,
  },
  inputContainer: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: colors.background,
    shadowOpacity: 0,
  },
  mailText: {
    paddingLeft: 5,
    color: colors.textLight,
    marginTop: 10,
    fontSize: 12,
  },
  emailInput: {
    color: '#525252',
    height: 40,
    width: '95%',
    paddingLeft: 5,
    fontFamily: fonts.normal,
  },
  emailInputText: {
    paddingLeft: 5,
    color: '#525252',
    fontFamily: fonts.normal,
    marginTop: 5,
  },
  touchable: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
  checkIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
});

export default styles;
