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
  arrowDown: {
    position: 'absolute',
    right: 16,
    color: colors.secondary,
  },
  verticalBarItem: {
    maxHeight: 25,
    justifyContent: 'flex-end',
    marginRight: 1,
  },
  block: {
    width: 5,
    height: 5,
    marginTop: 1,
    backgroundColor: colors.textLight,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },
  filledBlock: {
    width: 5,
    height: 5,
    marginTop: 1,
    backgroundColor: colors.text,
  },
  invisibleBlock: {
    display: 'none',
  },
  barLabel: {
    fontSize: 14,
    fontFamily: fonts.normal,
    color: colors.text,
  },
  skillRowLevelsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.background,
    overflow: 'hidden',
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
});

export default styles;
