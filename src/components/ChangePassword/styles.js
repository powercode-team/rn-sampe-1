import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  changePasswordMainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingTop: 15,
  },
  menuName: {
    fontSize: 16,
    fontFamily: fonts.normal,
    color: colors.text,
  },
  clearIcon: {
    position: 'absolute',
    right: 15,
    top: 30,
  },
  inputContainer: {
    width: '100%',
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: colors.background,
    shadowOpacity: 0,
  },
  headerText: {
    paddingLeft: 5,
    color: colors.text,
    fontSize: 18,
    fontFamily: fonts.normal,
  },
  passInput: {
    padding: 5,
    color: colors.text,
    width: '95%',
    fontSize: 15,
    fontFamily: fonts.normal,
  },
});

export default styles;
