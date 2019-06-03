import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: colors.background,
    marginBottom: 10,
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  wrapperLabel: {
    width: '100%',
  },
  label: {
    width: '100%',
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.normal,
    fontWeight: '400',
  },
  input: {
    paddingVertical: 0,
    paddingLeft: 0,
    height: 30,
    width: '80%',
    color: colors.text,
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  wrapperClearIcon: {
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  icon: {
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
    fontFamily: fonts.icons,
    fontSize: 16,
  },
});

export default styles;
