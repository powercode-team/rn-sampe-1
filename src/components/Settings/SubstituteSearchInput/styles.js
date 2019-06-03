import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  iconInput: {
    color: colors.text,
    marginRight: 15,
    fontFamily: fonts.icons,
    fontSize: 18,
  },
  input: {
    fontFamily: fonts.normal,
    color: colors.text,
    padding: 0,
    fontSize: 15,
    flex: 1,
  },
});

export default styles;
