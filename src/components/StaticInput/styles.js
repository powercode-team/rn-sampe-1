import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.background,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  label: {
    fontFamily: fonts.normal,
    color: colors.primary,
    fontSize: 12,
    width: '100%',
  },
  inputText: {
    width: '100%',
    fontFamily: fonts.normal,
    color: colors.text,
    marginVertical: 5,
  },
});

export default styles;
