import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  locationRowContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  locationRowWrapper: {
    width: '100%',
  },
  locationRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  radiusItem: {
    alignItems: 'center',
  },
  radiusWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  city: {
    fontFamily: fonts.normal,
    fontSize: 15,
    color: colors.text,
  },
  arrowDown: {
    position: 'absolute',
    right: 16,
    color: colors.secondary,
  },
  verticalBarItem: {
    width: 3,
    height: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    marginRight: 2,
  },
  radiusLabel: {
    fontSize: 14,
    fontFamily: fonts.normal,
    color: colors.text,
  },
  locationRowRadiusesWrapper: {
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
