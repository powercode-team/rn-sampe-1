import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  noChatsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.normal,
    color: colors.text,
  },
});

export default styles;
