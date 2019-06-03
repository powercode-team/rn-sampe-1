import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../styles/base';

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
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.background,
    elevation: 3,
  },
  text: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: fonts.normal,
    color: '#000',
  },
});

export default styles;
