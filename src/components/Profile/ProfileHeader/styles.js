/* eslint no-mixed-operators: 0 */
import { StyleSheet, Platform } from 'react-native';
import { fonts, dimensions, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.background,
    marginVertical: Platform.OS === 'ios' ? 0 : 6,
  },
  titleWrapper: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.normal,
    fontSize: 16,
  },
  tabsScrollWrapper: {},
  tabsWrapper: {
    alignSelf: 'center',
    minWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
    backgroundColor: colors.background,
    zIndex: 50,
  },
  tabWrapper: {
    flexGrow: 3,
  },
  tab: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    zIndex: 60,
  },
  tabBottomLine: {
    height: 1,
    backgroundColor: colors.secondary,
  },
  tabName: {
    fontFamily: fonts.normal,
    color: colors.text,
    textAlign: 'center',
    fontSize: 16,
  },
  headerContentWrapper: {
    width: dimensions.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    paddingVertical: 30,
    maxWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    // flex: 1,
    minWidth: 80,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconWrapper: {
    position: 'absolute',
    right: 2,
    top: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    borderRadius: 10,
    backgroundColor: colors.secondary,
  },
  editIcon: {
    color: colors.background,
    fontFamily: fonts.icons,
    fontSize: 12,
  },
  starIcon: {
    position: 'absolute',
    top: -5,
    right: -16,
    color: '#fe9900',
    fontFamily: fonts.icons,
    fontSize: 16,
  },
  starIconPrivate: {
    position: 'absolute',
    top: -5,
    right: 35,
    color: '#fe9900',
    fontFamily: fonts.icons,
    fontSize: 16,
  },
  mainInfo: {
    marginLeft: 10,
    minHeight: 60,
    maxWidth: 0.9 * dimensions.screenWidth - 90,
    justifyContent: 'space-around',
  },
  name: {
    fontFamily: fonts.medium,
    // fontWeight: '300',
    color: colors.text,
    fontSize: 16,
  },
  privateMsg: {
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 14,
    maxWidth: 170,
  },
  occupation: {
    fontFamily: fonts.normal,
    color: colors.text,
    fontSize: 15,
  },
  locationWrapper: {
    left: -5,
    flexDirection: 'row',
  },
  location: {
    marginLeft: 2,
    fontFamily: fonts.normal,
    color: colors.grey,
    fontSize: 15,
  },
  iconAvatar: {
    fontFamily: fonts.icons,
    fontSize: 60,
  },
  labelWrapper: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  labelText: {
    color: colors.background,
    fontFamily: fonts.normal,
  },
});

export default styles;
