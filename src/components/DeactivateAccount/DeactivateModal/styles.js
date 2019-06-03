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
    width: 0.85 * dimensions.screenWidth,
    flexDirection: 'column',
    padding: 10,
    paddingBottom: 20,
    alignSelf: 'center',
    backgroundColor: colors.background,
    elevation: 3,
    borderRadius: 3,
  },
  title: {
    fontSize: 11,
    fontFamily: fonts.normal,
    color: colors.textLight,
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    fontFamily: fonts.normal,
    color: colors.text,
    marginBottom: 20,
  },
  wrapperButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttons: {
    fontSize: 15,
    fontFamily: fonts.normal,
    color: colors.secondary,
    paddingVertical: 10,
    marginRight: 30,
  },
});

export default styles;
