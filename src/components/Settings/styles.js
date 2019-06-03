import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.background,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: colors.background,
  },
  languageRow: { justifyContent: 'flex-start' },
  buttonText: {
    fontFamily: fonts.normal,
    fontSize: 15,
    color: colors.text,
  },
  description: {
    fontFamily: fonts.normal,
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 15,
  },
  switchButton: {
    flexDirection: 'column',
  },
  boldText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: fonts.normal,
    color: colors.primary,
    marginLeft: 10,
  },

  wrapperSubstitute: {
    flexDirection: 'column',
  },
  substituteTitle: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.fonts,
    marginBottom: 5,
    marginTop: 10,
  },
  substituteEmail: {
    fontFamily: fonts.normal,
    fontSize: 15,
    color: colors.fonts,
    marginBottom: 15,
  },
});

export default styles;
