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
    alignSelf: 'center',
    backgroundColor: colors.background,
    elevation: 3,
  },
  header: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  title: {
    color: colors.background,
    fontFamily: fonts.normal,
    fontWeight: '400',
    fontSize: 18,
  },
  body: {
    padding: 15,
  },
  message: {
    fontFamily: fonts.normal,
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  buttonContainer: {},
  button: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
});

export default styles;
