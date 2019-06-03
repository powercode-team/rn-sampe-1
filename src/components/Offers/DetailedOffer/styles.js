import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../../styles/base';

const halfScreen = dimensions.screenWidth / 2;

const styles = StyleSheet.create({
  contentWrapper: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.background,
    paddingBottom: 60,
    // paddingTop: 10,
  },
  container: {
    backgroundColor: colors.background,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },
  offerTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: 3,
  },
  locationWrapper: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 2,
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 14,
  },
  date: {
    color: colors.secondary,
    fontFamily: fonts.normal,
    fontSize: 14,
    marginBottom: 5,
  },
  rejectionInfoContainer: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: 20,
    marginBottom: 25,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.primary,
    marginBottom: 10,
  },
  comment: {
    fontFamily: fonts.normal,
    fontSize: 15,
    color: colors.text,
    marginBottom: 20,
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 11,
    marginBottom: 25,
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontFamily: fonts.icons,
    fontSize: 48,
    color: colors.text,
  },
  iconName: {
    fontSize: 10,
    fontFamily: fonts.normal,
  },
  descriptionWrapper: {
    paddingHorizontal: 10,
  },
  requirements: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
    paddingHorizontal: 15,
  },
  requirementsTitle: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: fonts.bold,
    marginBottom: 20,
  },
  skillNameWrapper: {
    marginBottom: 15,
  },
  skillName: {
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 15,
  },
  wrapperIcon: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  entityIcon: {
    fontFamily: fonts.icons,
    fontSize: 16,
    color: colors.text,
  },
  decisionBlock: {
    position: 'absolute',
    width: dimensions.screenWidth,
    bottom: 0,
    zIndex: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.textLight,
  },
  activeButtonWrapper: {
    width: halfScreen - 20,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondary,
  },
  disabledButtonWrapper: {
    width: halfScreen - 20,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dadada',
  },
  staticInputContainer: {
    elevation: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  wrapperLoader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButtonText: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: fonts.bold,
  },
  disabledButtonText: {
    fontSize: 16,
    color: '#dadada',
    fontFamily: fonts.bold,
  },
});

export default styles;
