import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
  },
  inputsContainer: {
    flex: 1,
    paddingBottom: 15,
  },
  inputWrapper: {
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    marginBottom: 0,
  },
  input: {
    color: colors.text,
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  selectWrapper: {
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: colors.background,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },
  selectLabel: {
    width: '100%',
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.normal,
    fontWeight: '400',
    marginBottom: 7,
  },
  selectValue: {
    paddingVertical: 0,
    paddingLeft: 0,
    height: 30,
    width: '90%',
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
  checkboxButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 15,
  },
  memberText: {
    width: '85%',
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
  },
  hrMembershipInfo: {
    fontFamily: fonts.normal,
    fontSize: 12,
    color: colors.textLight,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
});

export default styles;
