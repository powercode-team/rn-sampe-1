import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';
import { colors } from './../../styles/base';

export const SkillLevelBar = ({ knowledgeLevel, label, levels, isActive }, { t }) => {
  if (knowledgeLevel > 4) return null;
  const textColor = { color: isActive ? colors.primary : colors.text };
  return (
    <View style={styles.barItem}>
      <View style={styles.barWrapper}>
        {levels.map((level, i) => {
          const index = level.skill_level_id + 1;
          const filled = index <= knowledgeLevel;
          const fillingActiveColor = isActive ? colors.primary : colors.text;
          const fillingDisabledColor = isActive ? colors.primary : colors.textLight;
          const blockStyles = isActive ? [styles.block, { borderColor: fillingDisabledColor }] : styles.block;
          const filledBlockStyles = isActive
            ? [styles.filledBlock, { backgroundColor: fillingActiveColor }]
            : styles.filledBlock;

          return (
            <View key={index} style={styles.verticalBarItem}>
              {levels.map((item, j) => (
                <View
                  key={item.skill_level_id}
                  style={[j <= i ? blockStyles : styles.invisibleBlock, filled ? filledBlockStyles : {}]}
                />
              ))}
            </View>
          );
        })}
      </View>
      {label && <Text style={[styles.barLabel, textColor]}>{t(label)}</Text>}
    </View>
  );
};

SkillLevelBar.propTypes = {
  knowledgeLevel: propTypes.number.isRequired,
  label: propTypes.string,
  levels: propTypes.array.isRequired,
  isActive: propTypes.bool.isRequired,
};
SkillLevelBar.contextTypes = {
  t: propTypes.func.isRequired,
};
export default SkillLevelBar;
