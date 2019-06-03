import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
  },
  wrapperContent: {
    flex: 1,
  },
  wrapperButton: {
    padding: 10,
    backgroundColor: colors.background,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  applyButton: {
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
});

export default styles;
