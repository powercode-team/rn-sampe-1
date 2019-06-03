import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';
import SkillLevelBar from './../../SkillRow/SkillLevelBar';

export const SimpleSkillRow = ({ knowledgeLevel, skillLevels, skillName, requiredScore }) => (
  <View style={styles.skillRow}>
    <View style={styles.leftBlock}>
      <SkillLevelBar knowledgeLevel={knowledgeLevel + 1} isActive={false} levels={skillLevels} />
      <Text numberOfLines={1} style={styles.skillName}>
        {skillName}
      </Text>
    </View>
    {requiredScore || requiredScore === 0 ? (
      <View style={styles.requiredScoreWrapper}>
        <SkillLevelBar knowledgeLevel={requiredScore + 1} isActive levels={skillLevels} />
      </View>
    ) : null}
  </View>
);

SimpleSkillRow.propTypes = {
  skillLevels: propTypes.array.isRequired,
  knowledgeLevel: propTypes.number.isRequired,
  skillName: propTypes.string.isRequired,
  requiredScore: propTypes.number,
};

export default SimpleSkillRow;
