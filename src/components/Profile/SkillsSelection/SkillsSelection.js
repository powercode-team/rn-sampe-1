import React from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, ActivityIndicator, ScrollView } from 'react-native';
import propTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';

import { findIndex } from 'lodash';

import SkillRow from './../../SkillRow/SkillRow';
import ExpandedSkillRow from './../../ExpandedSkillRow/ExpandedSkillRow';
import styles from './styles';
import { colors } from './../../../styles/base';

class SkillsSelection extends React.Component {
  checkAlreadySelectedSkill = (skillId) => {
    const index = findIndex(this.props.alreadyAddedSkills, (item) => item.skill_id === skillId);
    return index !== -1;
  };

  renderItemRelated = (item, index) =>
    (this.props.expanded ? (
      <ExpandedSkillRow
        key={String(item.related_id)}
        skillName={item.related_skill_name}
        disableSwipeout
        onAddPress={() => this.props.addRelatedSkill(item)}
        isAlreadySelected={this.checkAlreadySelectedSkill(item.related_id)}
      />
    ) : (
      <SkillRow
        key={String(item.related_id)}
        skillName={item.related_skill_name}
        knowledgeLevel={null}
        disableLevelIndicator
        disableSwipeout
        levelPressEnhancer={(level) => this.props.addRelatedSkill(item, level)}
        skillRowPressEnhancer={(state) => {
          this.props.changeRelatedSkillState(index, state);
        }}
        isAlreadySelected={this.checkAlreadySelectedSkill(item.related_id)}
        isRowOpened={this.props.relatedSkills[index].isOpened}
      />
    ));

  renderItemAll = (item, index) =>
    (this.props.expanded ? (
      <ExpandedSkillRow
        skillName={item.skill_name}
        key={String(item.skill_id)}
        disableSwipeout
        disableAdding={false}
        onAddPress={() => this.props.addSkill(item)}
        isAlreadySelected={this.checkAlreadySelectedSkill(item.skill_id)}
      />
    ) : (
      <SkillRow
        skillName={item.skill_name}
        key={String(item.skill_id)}
        knowledgeLevel={null}
        disableLevelIndicator
        disableSwipeout
        levelPressEnhancer={(level) => this.props.addSkill(item, level)}
        isAlreadySelected={this.checkAlreadySelectedSkill(item.skill_id)}
        skillRowPressEnhancer={(state) => {
          this.props.changeAllSkillState(index, state);
        }}
        isRowOpened={this.props.allSkills[index].isOpened}
      />
    ));

  renderItemAdded = (item, index) =>
    (this.props.expanded ? (
      <ExpandedSkillRow
        key={String(item.skill_id)}
        skillName={item.skill_name}
        disableAdding
        onDeletePress={() => this.props.removeSkill(item.skill_id)}
      />
    ) : (
      <SkillRow
        key={String(item.skill_id)}
        skillName={item.skill_name}
        knowledgeLevel={item.skill_level}
        onDeletePress={() => this.props.removeSkill(item.skill_id)}
        levelPressEnhancer={(level) => this.props.onSkillLevelChange(item.skill_id, level)}
        skillRowPressEnhancer={(state) => this.props.changeAddedSkillState(index, state)}
        isRowOpened={this.props.addedSkills[index].isOpened}
      />
    ));

  render() {
    const {
      inputValue,
      onInputChange,
      clearField,
      isHeaderVisible,
      onInputFocus,
      allSkills,
      addedSkills,
      relatedSkills,
      onStartShouldSetResponderCaptureNested,
      skillsAreBeingFetched,
      isAddedSkillsContainerOpened,
      toggleAddedSkillsContainerState,
    } = this.props;
    return (
      <React.Fragment>
        <View style={[styles.searchInputWrapper, isHeaderVisible ? {} : { paddingVertical: 15 }]}>
          <TouchableWithoutFeedback onPress={onInputFocus}>
            <View style={[{ paddingRight: 15 }, isHeaderVisible ? { paddingVertical: 15 } : {}]}>
              <Text style={styles.searchIcon}>{'\ue807'}</Text>
            </View>
          </TouchableWithoutFeedback>
          {isHeaderVisible ? (
            <TouchableWithoutFeedback onPress={onInputFocus}>
              <View style={{ flex: 1 }}>
                <Text style={styles.searchInputBtn}>{this.context.t('Add skills...')}</Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TextInput
              style={styles.searchInput}
              onChangeText={onInputChange}
              autoFocus={!isHeaderVisible}
              // onFocus={onInputFocus}
              value={inputValue}
              placeholder={this.context.t('Add skills...')}
              placeholderTextColor={colors.textLight}
              underlineColorAndroid="transparent"
            />
          )}

          <View style={styles.clearIconWrapper}>
            {Boolean(inputValue) && (
              <MaterialIcon onPress={clearField} style={styles.clearIcon} name="cancel" size={16} color="#858585" />
            )}
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          // refreshControl={
          //   <RefreshControl
          //     refreshing={skillsAreBeingFetched}
          //     enabled={false}
          //     progressViewOffset={30}
          //   />
          // }
        >
          {!isHeaderVisible && (
            <View style={styles.skillsSelectionWrapper}>
              {Boolean(addedSkills.length) && (
                <View>
                  <TouchableWithoutFeedback onPress={toggleAddedSkillsContainerState}>
                    <View style={styles.addedSkillsListHeader}>
                      <Text style={styles.skillsListTitle}>{this.context.t('Skills added').toUpperCase()}</Text>
                      <IonicIcon
                        name={isAddedSkillsContainerOpened ? 'ios-arrow-up' : 'ios-arrow-down'}
                        size={22}
                        color={colors.secondary}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  {isAddedSkillsContainerOpened && (
                    <View onStartShouldSetResponderCapture={onStartShouldSetResponderCaptureNested}>
                      {addedSkills.map((skill, i) => this.renderItemAdded(skill, i))}
                    </View>
                  )}
                </View>
              )}
              {Boolean(relatedSkills.length) && (
                <View style={styles.relatedSkillsContainer}>
                  <View style={styles.skillsListHeader}>
                    <Text style={styles.skillsListTitle}>{this.context.t('Related skills').toUpperCase()}</Text>
                  </View>
                  <View>{relatedSkills.map((skill, i) => this.renderItemRelated(skill, i))}</View>
                </View>
              )}
              {!relatedSkills.length && (
                <View style={styles.allSkillsContainer}>
                  <View style={[styles.skillsListHeader, addedSkills.length ? {} : { borderTopWidth: 0 }]}>
                    <Text style={styles.skillsListTitle}>{this.context.t('List of skills').toUpperCase()}</Text>
                  </View>
                  {skillsAreBeingFetched ? (
                    <View style={{ marginTop: 20 }}>
                      <ActivityIndicator size={1} color="#000" />
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      {allSkills.length === 0 && !skillsAreBeingFetched && inputValue.length > 0 ? (
                        <Text style={styles.textNotFoundSkills}>{this.context.t('No skills found')}</Text>
                      ) : (
                        allSkills.map((skill, index) => this.renderItemAll(skill, index))
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </React.Fragment>
    );
  }
}

SkillsSelection.propTypes = {
  inputValue: propTypes.string.isRequired,
  onInputChange: propTypes.func.isRequired,
  clearField: propTypes.func.isRequired,
  isHeaderVisible: propTypes.bool.isRequired,
  onInputFocus: propTypes.func.isRequired,
  allSkills: propTypes.array.isRequired,
  addedSkills: propTypes.array.isRequired,
  relatedSkills: propTypes.array.isRequired,
  addSkill: propTypes.func.isRequired,
  addRelatedSkill: propTypes.func.isRequired,
  removeSkill: propTypes.func.isRequired,
  onSkillLevelChange: propTypes.func.isRequired,
  onStartShouldSetResponderCaptureNested: propTypes.func,
  expanded: propTypes.bool.isRequired,
  alreadyAddedSkills: propTypes.array.isRequired,
  changeRelatedSkillState: propTypes.func.isRequired,
  changeAllSkillState: propTypes.func.isRequired,
  skillsAreBeingFetched: propTypes.bool.isRequired,
  isAddedSkillsContainerOpened: propTypes.bool.isRequired,
  toggleAddedSkillsContainerState: propTypes.func.isRequired,
  changeAddedSkillState: propTypes.func.isRequired,
};

SkillsSelection.contextTypes = {
  t: propTypes.func.isRequired,
};

export default SkillsSelection;
