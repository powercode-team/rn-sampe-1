import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  backgroundView: {
    width: dimensions.screenWidth,
    height: dimensions.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 0.9 * dimensions.screenWidth,
    alignSelf: 'center',
    backgroundColor: colors.background,
    elevation: 3,
    paddingTop: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  acceptanceModalView: {
    width: 0.9 * dimensions.screenWidth,
    alignSelf: 'center',
    backgroundColor: colors.background,
    elevation: 3,
    padding: 15,
    paddingBottom: 0,
    borderRadius: 5,
  },
  iconsContainer: {
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: fonts.medium,
    fontWeight: '400',
    fontSize: 18,
    color: colors.primary,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  headerDescription: {
    fontFamily: fonts.normal,
    fontWeight: '400',
    fontSize: 12,
    color: colors.text,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: fonts.normal,
    fontWeight: '400',
    fontSize: 18,
    color: colors.primary,
    marginBottom: 15,
  },
  commentTitle: {
    fontFamily: fonts.normal,
    fontWeight: '400',
    fontSize: 12,
    color: colors.text,
    marginBottom: 15,
  },
  iconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 15,
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
    marginBottom: 10,
  },
  commentInput: {
    width: '100%',
    height: 110,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 15,
    textAlignVertical: 'top',
    padding: 5,
  },
  decisionButtons: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonView: {
    marginLeft: 15,
    padding: 10,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontWeight: '400',
    fontSize: 15,
    color: colors.secondary,
  },
  cancelText: {
    fontFamily: fonts.medium,
    fontWeight: '400',
    fontSize: 15,
    color: colors.textLight,
  },
});

export default styles;
