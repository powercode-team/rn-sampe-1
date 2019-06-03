import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  swipeout: {
    backgroundColor: colors.background,
    marginVertical: 15,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  wrapperUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '75%',
  },
  userImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  typeName: {
    fontSize: 11,
    color: colors.text,
    marginBottom: 5,
  },
  userName: {
    fontSize: 15,
    color: colors.primary,
    marginBottom: 5,
  },
  wrapperTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 11,
    color: colors.text,
    marginRight: 10,
    marginLeft: 5,
  },
  wrapperDialogInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  },
  dialogInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  date: {
    fontSize: 11,
    color: colors.primary,
    marginBottom: 5,
  },
  fontOpenSans: {
    fontFamily: fonts.normal,
  },
  wrapperMsgCount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.secondary,
  },
  msgCount: {
    fontSize: 11,
    color: colors.background,
  },
  typeIcons: {
    fontFamily: fonts.icons,
    color: colors.text,
    fontSize: 10,
  },
  typeImg: {
    width: 13,
    height: 12,
  },
  backgroundWrapper: {
    backgroundColor: colors.red,
  },
  backgroundButton: {
    position: 'absolute',
    flexDirection: 'row',
    paddingHorizontal: 10,
    bottom: 0,
    top: 0,
    right: 0,
    alignItems: 'center',
  },
  backgroundText: {
    color: colors.background,
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  deleteButton: {
    marginRight: 10,
  },
  deleteIcon: {
    fontFamily: fonts.icons,
    color: colors.background,
    fontSize: 22,
    marginRight: 15,
  },
  wrapperAvatar: {
    width: 48,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconAvatar: {
    fontFamily: fonts.icons,
    fontSize: 38,
  },
  offerIcon: {
    width: 13,
    height: 8,
  },
});

export default styles;
