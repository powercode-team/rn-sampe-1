import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  candidateItem: {
    paddingLeft: 5,
    paddingVertical: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
  },
  starWrapper: {
    paddingLeft: 15,
    paddingRight: 5,
  },
  starIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    color: '#fe9900',
    fontFamily: fonts.icons,
    fontSize: 16,
  },
  infoWrapper: {
    marginLeft: 10,
  },
  date: {
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 12,
  },
  name: {
    fontSize: 15,
    maxWidth: 200,
    // paddingRight: 30,
    color: colors.primary,
    fontFamily: fonts.normal,
  },
  iconsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    borderRadius: 5,
  },
  labelBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelView: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  labelText: {
    color: colors.background,
  },
  description: {
    color: colors.text,
  },
  soloDescription: {
    color: colors.text,
    marginRight: 10,
  },
  forwardIcon: {
    alignSelf: 'center',
  },
});

export default styles;
