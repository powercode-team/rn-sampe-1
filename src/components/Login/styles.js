import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: dimensions.screenHeight,
    backgroundColor: colors.background,
  },
  image: {
    width: dimensions.screenWidth,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    width: 100,
    height: 80,
  },
  headerText: {
    marginTop: 10,
    color: colors.background,
    fontSize: 36,
    fontFamily: fonts.normal,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  form: {
    paddingTop: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.normal,
    color: colors.primary,
    marginVertical: 12,
  },
  inputWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: colors.background,
    shadowOpacity: 0,
  },
  inputContainer: {
    width: '88%',
  },
  inputText: {
    fontSize: 16,
    fontFamily: fonts.normal,
    color: colors.primary,
  },
  input: {
    height: 40,
    width: '100%',
    padding: 0,
    fontFamily: fonts.normal,
    fontSize: 16,
  },
  clearIcon: {
    paddingTop: 30,
    paddingBottom: 0,
    padding: 15,
  },
  buttonContainer: {},
  loginButton: {
    marginTop: 30,
    backgroundColor: colors.primaryGrey,
    padding: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  touchable: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
  batonBottomText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
  forgotPassword: {
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  footer: {
    paddingBottom: 20,
    marginBottom: 10,
  },
  forgotPassBtn: {
    marginTop: 0,
  },
  divider: {
    position: 'absolute',
    // marginHorizontal: 10,
    bottom: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    top: 1,
    height: 1,
    backgroundColor: colors.textLight,
    flexGrow: 1,
  },
  signUpButton: {
    backgroundColor: colors.secondary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontFamily: fonts.icons,
    fontSize: 16,
    paddingTop: 30,
    paddingBottom: 0,
    padding: 15,
  },
});

export default styles;
