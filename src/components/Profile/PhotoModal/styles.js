import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  backgroundView: {
    width: dimensions.screenWidth,
    height: dimensions.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  background: {
    width: dimensions.screenWidth,
    flex: 1,
  },
  modalView: {
    paddingHorizontal: 15,
    paddingBottom: 35,
    paddingTop: 10,
    width: dimensions.screenWidth,
    alignSelf: 'center',
    backgroundColor: colors.background,
  },
  header: {
    paddingVertical: 10,
  },
  title: {
    fontFamily: fonts.normal,
    fontWeight: '400',
    fontSize: 18,
    color: colors.text,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    color: colors.text,
    marginRight: 25,
    fontSize: 20,
    fontFamily: fonts.icons,
  },
  buttonName: {
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 15,
  },
});

export default styles;
