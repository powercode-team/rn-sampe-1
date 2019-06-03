import { StyleSheet } from 'react-native';
import { fonts, dimensions, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    borderRadius: 10,
    width: dimensions.screenWidth * 0.85,
    marginBottom: 5,
  },
  message: {
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  messageToMe: {
    backgroundColor: '#F8F8F8',
    alignSelf: 'flex-start',
  },
  wrapperDate: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 11,
    color: colors.text,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: fonts.normal,
  },
  wrapperDateToMe: {
    width: dimensions.screenWidth * 0.85,
    alignSelf: 'flex-end',
  },
  isNoSentBg: {
    backgroundColor: 'rgba(248, 248, 248, 0.3)',
  },
  isNoSentText: {
    color: 'rgba(98, 98, 98, 0.3)',
  },
  isNoSentTextWhite: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  sendingText: {
    fontSize: 11,
    color: 'rgba(98, 98, 98, 0.3)',
    fontFamily: fonts.normal,
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
});

export default styles;
