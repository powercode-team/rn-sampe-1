import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 5,
  },
  message: {
    color: colors.text,
    fontFamily: fonts.normal,
    textAlign: 'center',
    fontSize: 15,
  },
  wrapperDate: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 11,
    textAlign: 'center',
    color: colors.text,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: fonts.normal,
  },
});

export default styles;
