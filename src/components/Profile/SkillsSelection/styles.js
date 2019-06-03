import { StyleSheet } from 'react-native';
import { fonts, colors } from './../../../styles/base';

const styles = StyleSheet.create({
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textLight,
  },
  searchIcon: {
    color: colors.text,
    fontFamily: fonts.icons,
    fontSize: 18,
  },
  searchInput: {
    // width: '65%',
    flexGrow: 3,
    fontFamily: fonts.normal,
    fontSize: 15,
    padding: 0,
    color: colors.text,
    // height: 58,
  },
  searchInputBtn: {
    flexGrow: 3,
    fontFamily: fonts.normal,
    fontSize: 15,
    padding: 0,
    paddingVertical: 15,
    color: colors.textLight,
  },
  clearIconWrapper: {
    // width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  clearIcon: {},
  saveButton: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  cancelButton: {
    // width: '15%',
    marginLeft: 20,
    justifyContent: 'center',
  },
  cancelText: {
    color: colors.secondary,
    alignSelf: 'flex-end',
    fontFamily: fonts.normal,
    fontSize: 15,
  },
  skillsListHeader: {
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.textLight,
    borderBottomColor: colors.textLight,
  },
  addedSkillsListHeader: {
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
  skillsListTitle: {
    color: colors.text,
    fontSize: 15,
    fontFamily: fonts.normal,
  },
  skillsSelectionWrapper: {
    flex: 1,
  },
  allSkillsContainer: {
    // marginBottom: 60,
    flex: 1,
  },
  relatedSkillsContainer: {
    marginBottom: 60,
    flex: 1,
  },
  textNotFoundSkills: {
    fontSize: 15,
    color: colors.text,
    fontFamily: fonts.normal,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default styles;
