import { StyleSheet } from 'react-native';
import { colors } from './../../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 120,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.textLight,
  },
  iconPlus: {
    marginRight: 15,
  },
  wrapperInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textLight,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperCross: {
    padding: 10,
  },
  wrapperSendBtn: {
    width: 36,
    height: 36,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginLeft: 15,
  },
  iconSendBtn: {
    transform: [{ rotate: '45deg' }],
    marginRight: 4,
  },
});

export default styles;
