import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    paddingHorizontal: 15,
  },
  wrapperInfo: {
    flexDirection: 'row',
  },
  wrapperIcon: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 35,
  },
  icon: {
    fontFamily: fonts.icons,
    fontSize: 15,
    color: colors.text,
  },
  wrapperLocationName: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  locationText: {
    fontSize: 12,
    color: colors.text,
    fontFamily: fonts.icons,
    fontWeight: '400',
  },
  nameText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '400',
    fontFamily: fonts.normal,
  },
  wrapperTimeToSingle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    color: colors.primary,
    fontSize: 12,
    paddingHorizontal: 10,
    fontFamily: fonts.normal,
    marginTop: -6,
  },
  swipeout: {
    backgroundColor: colors.background,
  },
  type: {
    fontSize: 12,
    color: colors.text,
    fontFamily: fonts.normal,
  },
  backgroundWrapper: {
    backgroundColor: colors.red,
  },
  backgroundButton: {
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    bottom: 0,
    top: 0,
    right: 0,
    alignItems: 'center',
  },
  backgroundText: {
    color: colors.background,
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  deleteIcon: {
    fontFamily: fonts.icons,
    color: colors.background,
    fontSize: 22,
    marginRight: 15,
  },
  deleteButton: {
    marginRight: 10,
  },
  scoreBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelsWrapper: {
    marginRight: 10,
  },
  thumbWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 2,
  },
  labelBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelView: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 2,
  },
  labelText: {
    color: colors.background,
  },
  forwardIcon: {
    alignSelf: 'center',
  },
  itemIcon: {
    width: 18,
    height: 16,
  },
});

export default styles;
