import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  leftBlock: {
    flexDirection: 'row',
  },
  skillName: {
    width: '87%',
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
    marginLeft: 10,
  },
  requiredScoreWrapper: {
    alignSelf: 'flex-end',
  },
});

export default styles;
