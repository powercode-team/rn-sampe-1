import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  wrapperButton: {
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 70,
    minHeight: 70,
  },
  text: {
    fontFamily: fonts.normal,
    color: colors.text,
  },
  number: {
    fontSize: 36,
  },
  letters: {
    fontSize: 15,
  },
});

export default styles;
