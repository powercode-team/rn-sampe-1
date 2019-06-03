import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  email: {
    fontFamily: fonts.icons,
    fontSize: 15,
    color: colors.text,
  },
});

export default styles;
