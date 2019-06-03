import React from 'react';
import { View } from 'react-native';

import propTypes from 'prop-types';

import SkillsSelection from './../../../containers/Profile/SkillsSelection';
import SkillRow from './../../SkillRow/SkillRow';

const ProfileSkills = ({
  toggleHeaderState,
  isHeaderVisible,
  existingSkills,
  navigation,
  openLoadingModal,
  setSkillLevel,
  closeLoadingModal,
  deleteUserSkill,
  skillsRowsStates,
  changeSkillRowState,
}) => (
  <React.Fragment>
    <SkillsSelection
      toggleHeaderState={toggleHeaderState}
      isHeaderVisible={isHeaderVisible}
      existingSkills={existingSkills}
      expanded={false}
      navigation={navigation}
    />
    {isHeaderVisible ? (
      <View>
        {existingSkills.map((skill, index) => (
          <SkillRow
            key={skill.skill_id}
            skillName={skill.skill_name}
            knowledgeLevel={skill.skill_level_id + 1}
            onlyLevelPressEnhancer
            levelPressEnhancer={(level) => {
              openLoadingModal();
              setSkillLevel({ skill_id: skill.skill_id, skill_level_id: level - 1 }, () => {
                setTimeout(() => {
                  closeLoadingModal();
                }, 400);
              });
            }}
            skillRowPressEnhancer={(state) => changeSkillRowState(state, index)}
            isRowOpened={skillsRowsStates[index]}
            onDeletePress={() => {
              openLoadingModal();
              deleteUserSkill(skill.skill_id, () => {
                setTimeout(() => {
                  closeLoadingModal();
                }, 400);
              });
            }}
          />
        ))}
      </View>
    ) : null}
  </React.Fragment>
);

ProfileSkills.propTypes = {
  toggleHeaderState: propTypes.func.isRequired,
  isHeaderVisible: propTypes.bool.isRequired,
  existingSkills: propTypes.array.isRequired,
  deleteUserSkill: propTypes.func.isRequired,
  setSkillLevel: propTypes.func.isRequired,
  openLoadingModal: propTypes.func.isRequired,
  closeLoadingModal: propTypes.func.isRequired,
  navigation: propTypes.object.isRequired,
  skillsRowsStates: propTypes.array.isRequired,
  changeSkillRowState: propTypes.func.isRequired,
};

export default ProfileSkills;
