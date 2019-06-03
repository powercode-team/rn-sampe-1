import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  wrapperContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: colors.lightGrey,
  },
  headerTitle: {
    fontFamily: fonts.icons,
    fontSize: 15,
    color: colors.text,
  },
  notFountMsg: {
    fontFamily: fonts.icons,
    fontSize: 15,
    color: colors.text,
  },
});

export default styles;
