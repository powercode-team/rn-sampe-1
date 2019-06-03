import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  locationSelectionContainer: {
    flex: 1,
    marginBottom: 10,
  },
  locationInputWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  wrapperLabel: {
    // paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  searchIcon: {
    color: colors.text,
    marginRight: 15,
    fontFamily: fonts.icons,
    fontSize: 18,
  },
  searchInput: {
    fontFamily: fonts.normal,
    color: colors.text,
    padding: 0,
    fontSize: 15,
  },
  clearIconWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  clearIcon: {},
  cancelButton: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  citiesContainer: {
    flex: 1,
  },
  cancelText: {
    color: colors.primary,
    fontSize: 15,
    fontFamily: fonts.normal,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
  label: {
    width: '100%',
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.normal,
    fontWeight: '400',
    marginBottom: 7,
  },
  citiesHeader: {
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.textLight,
    borderBottomColor: colors.textLight,
  },
  wrapperInput: {
    flexGrow: 2,
    padding: 0,
  },
  citiesTitle: {
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts.normal,
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    padding: 15,
  },
  cityText: {
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
  },
  textNotFoundSkills: {
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
  },
  addedLocationListHeader: {
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingRight: 30,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  noLocations: {
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: fonts.normal,
    color: '#000',
  },
});

export default styles;
