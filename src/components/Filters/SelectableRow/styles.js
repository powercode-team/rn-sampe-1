import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  defaultChecker: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
    height: 22,
    marginRight: 15,
    borderRadius: 4,
  },
  checkerActive: {
    backgroundColor: colors.primary,
  },
  checkerNotActive: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.text,
  },
  value: {
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
});

export default styles;
