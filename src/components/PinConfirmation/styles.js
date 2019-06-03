import { StyleSheet, Platform } from 'react-native';
import { fonts, dimensions, colors } from './../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  wrapperHeader: {
    width: dimensions.screenWidth,
    paddingTop: Platform.OS === 'ios' ? dimensions.screenWidth * 0.08 : dimensions.screenWidth * 0.03,
  },
  wrapperHead: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: dimensions.screenHeight * 0.3,
  },
  wrapperPoints: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
  },
  defaultPoints: {
    width: 8,
    height: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.text,
    borderRadius: 4,
  },
  pointBg: {
    backgroundColor: colors.text,
  },
  pointWithMargin: {
    marginRight: 10,
  },
  textUnderPoints: {
    fontSize: 15,
    color: colors.text,
  },
  defaultFontFamily: {
    fontFamily: fonts.normal,
  },
  wrapperKeyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperMainButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  newRow: {
    width: dimensions.screenWidth,
  },
  wrapperBottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: dimensions.screenWidth,
  },
  emptyBtn: {
    minWidth: 70,
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

export default styles;
