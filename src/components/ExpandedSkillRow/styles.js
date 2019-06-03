import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  skillRowContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  skillRowWrapper: {
    width: '100%',
  },
  skillRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  barItem: {
    alignItems: 'center',
  },
  barWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  skillName: {
    width: '80%',
    fontFamily: fonts.normal,
    fontSize: 15,
    marginLeft: 0,
    color: colors.text,
  },
  plusWrapper: {
    position: 'absolute',
    right: 16,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalBarItem: {
    width: 3,
    height: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    marginRight: 2,
  },
  barLabel: {
    fontSize: 14,
    fontFamily: fonts.normal,
    color: colors.text,
  },
  expandedContentWrapper: {
    backgroundColor: colors.background,
  },
  skillRowLevelsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  mandatoryContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  buttonRow: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.normal,
    color: colors.text,
  },
  starIcon: {
    color: colors.text,
  },
  description: {
    fontSize: 11,
    color: colors.textLight,
    fontFamily: fonts.normal,
  },
  addButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButtonText: {
    paddingRight: 15,
    paddingLeft: 25,
    paddingVertical: 10,
    fontFamily: fonts.normal,
    fontWeight: '400',
    color: colors.primary,
  },
  backgroundWrapper: {
    backgroundColor: colors.secondary,
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
});

export default styles;
