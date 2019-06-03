import { StyleSheet, Platform } from 'react-native';
import { fonts, dimensions, colors, shadows } from './../../../styles/base';

const halfScreen = dimensions.screenWidth / 2;

const styles = StyleSheet.create({
  contentWrapper: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: Platform.OS === 'ios' ? 60 : 110,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusRow: {
    flexDirection: 'row',
  },
  statusBlock: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  blueText: {
    color: colors.primary,
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  status: {
    color: colors.text,
    fontFamily: fonts.normal,
    fontSize: 15,
    marginLeft: 5,
  },
  statusImage: {
    width: 24,
    height: 20,
  },
  centeringWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIcon: {
    color: colors.text,
    fontFamily: fonts.icons,
    fontSize: 18,
  },
  rejectionInfoContainer: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: fonts.medium,
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
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementsWrapper: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  requirementsTitle: {
    fontFamily: fonts.medium,
    color: colors.primary,
    fontSize: 20,
    marginRight: 5,
  },
  matchedInfo: {
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 14,
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

  comment: {
    fontFamily: fonts.normal,
    fontSize: 15,
    color: colors.text,
    marginBottom: 20,
  },
  matchedSkills: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  relatedSkills: {},
  skillsHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  smallText: {
    color: colors.text,
    fontFamily: fonts.normal,
    fontSize: 12,
  },
  skillRowWrapper: {
    width: '100%',
  },
  skillRow: {
    paddingVertical: 15,
  },
  skillName: {
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
    marginLeft: 5,
  },
  arrowDown: {
    position: 'absolute',
    right: 16,
    color: colors.textLight,
  },
  skillRowLevelsWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background,
    overflow: 'hidden',
    borderBottomColor: colors.textLight,
  },
  subSkillRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  skillInfo: {
    flexDirection: 'row',
  },
  percentageBlock: {
    paddingVertical: 5,
    // paddingHorizontal: 10,
    width: 45,
    borderRadius: 10,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    color: colors.background,
    fontFamily: fonts.normal,
    fontSize: 14,
  },
  decisionBlock: {
    position: 'absolute',
    width: dimensions.screenWidth,
    bottom: 0,
    zIndex: 10,
    height: 50,
    // paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.textLight,
    ...shadows.bottomButtons,
  },
  activeButtonWrapper: {
    width: halfScreen - 20,
    height: 35,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondary,
  },
  disabledButtonWrapper: {
    width: halfScreen - 20,
    height: 35,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dadada',
  },
  wrapperLoader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButtonText: {
    fontSize: 16,
    color: colors.secondary,
    fontFamily: fonts.normal,
  },
  disabledButtonText: {
    fontSize: 16,
    // fontFamily: fonts.bold,
  },
  // NEW
  visibleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelsWrapper: {
    marginRight: 10,
  },
  labelView: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 2,
    backgroundColor: colors.grey,
  },
  labelText: {
    color: colors.background,
  },
  scoreBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 2,
    marginRight: 5,
  },
  skillRowDetailsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  wrapperChildSkills: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 20,
  },
  childSkillInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingRight: 3,
  },
  wrapperSubSkillInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelsRelatedWrapper: {
    marginRight: 0,
    minWidth: 69,
  },
  labelRelatedView: {
    paddingVertical: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.grey,
    paddingHorizontal: 10,
    borderRadius: 2,
  },
  labelRelatedText: {
    color: colors.grey,
  },
  descriptionWrapper: {
    paddingHorizontal: 10,
  },
});

export default styles;
