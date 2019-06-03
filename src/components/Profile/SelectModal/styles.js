import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  backgroundView: {
    width: dimensions.screenWidth,
    height: dimensions.screenHeight,
    // backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalStyles: {
    padding: 0,
    margin: 0,
  },
  background: {
    width: dimensions.screenWidth,
    flex: 1,
  },
  wrapperScrollView: {
    width: dimensions.screenWidth,
    alignSelf: 'center',
    backgroundColor: colors.background,
    maxHeight: dimensions.screenHeight * 0.8,
  },
  modalView: {
    paddingHorizontal: 15,
    paddingBottom: 35,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  optionsContainer: {},
  optionButton: {
    paddingVertical: 15,
  },
  optionText: {
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 15,
  },
});

export default styles;
