import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

const RelatedSkillRow = ({ skillObj }) => (
  <View style={styles.skillRow}>
    <View style={styles.visibleRow}>
      <View style={styles.skillInfo}>
        <Text numberOfLines={1} style={styles.skillName}>
          {skillObj.parent_skill_name}
        </Text>
      </View>
    </View>
  </View>
);

RelatedSkillRow.propTypes = {
  skillObj: propTypes.object.isRequired,
};

export default RelatedSkillRow;
