import { StyleSheet } from 'react-native';
import { colors } from './../../styles/base';

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    bottom: 5,
  },
  gradientWrapper: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.5,
    backgroundColor: colors.secondary,
  },
  touchable: {
    width: '100%',
  },
  buttonText: {
    color: colors.background,
  },
});

export default styles;
