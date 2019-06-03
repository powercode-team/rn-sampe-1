import { StyleSheet, Platform } from 'react-native';
import { fonts, dimensions, colors } from './../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inputsContainer: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
    height: 0.1 * dimensions.screenHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnButton: {
    position: 'absolute',
    top: 15,
    left: 0,
  },
  returnButtonIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: colors.secondary,
  },
  title: {
    paddingBottom: 30,
    textAlign: 'center',
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 18,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  inputWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: colors.background,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    elevation: 1,
  },
  label: {
    width: '100%',
    fontSize: 12,
    color: colors.textLight,
    fontFamily: fonts.normal,
    paddingLeft: 10,
  },
  checkboxButton: {
    width: '100%',
    elevation: 1,
    backgroundColor: colors.background,
  },
  checkboxButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 15,
  },
  memberText: {
    width: '85%',
    fontSize: 15,
    color: colors.primary,
    fontFamily: fonts.normal,
  },
  hrMembershipInfo: {
    fontFamily: fonts.normal,
    fontSize: 12,
    color: colors.textLight,
    paddingHorizontal: 15,
  },
  nextButton: {
    width: '100%',
  },
  nextButtonWrapper: {
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: colors.secondary,
  },
  opacity: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledNextButton: {
    opacity: 0.6,
  },
  nextButtonText: {
    fontFamily: fonts.normal,
    color: colors.background,
    fontSize: 15,
  },
  infoIcon: {
    color: colors.secondary,
  },
  backgroundView: {
    width: dimensions.screenWidth,
    height: dimensions.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 0.85 * dimensions.screenWidth,
    maxHeight: 0.9 * dimensions.screenHeight,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: colors.background,
    elevation: 3,
  },
  modalTitle: {
    fontFamily: fonts.normal,
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 15,
  },
  modalMessage: {
    fontFamily: fonts.normal,
    color: colors.text,
  },
  scrollView: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  modalButtonWrapper: {},
  modalButtonText: {
    fontFamily: fonts.normal,
    fontSize: 16,
    color: colors.secondary,
  },
  wrapperNextBtn: {
    padding: 8,
  },
  termsWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 15,
  },
  defaultChecker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
    height: 22,
    marginRight: 10,
  },
  checkerActive: {
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  checkerNotActive: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#323232',
    borderRadius: 2,
  },
  termsOfUse: {
    color: '#323232',
    width: '85%',
    marginTop: -3,
  },
  termsOfUseStyled: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
});

export default styles;
