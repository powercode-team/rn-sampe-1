import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Interactable from 'react-native-interactable';

import styles from './styles';
import SkillLevelBar from './SkillLevelBar';
import { dimensions, colors } from './../../styles/base';

class SkillRow extends Component {
  static propTypes = {
    knowledgeLevel: propTypes.number,
    skillName: propTypes.string.isRequired,
    levelPressEnhancer: propTypes.func,
    skillRowPressEnhancer: propTypes.func,
    onDeletePress: propTypes.func,
    disableSwipeout: propTypes.bool,
    disableLevelIndicator: propTypes.bool,
    onlyLevelPressEnhancer: propTypes.bool,
    skillLevels: propTypes.array.isRequired,
    isAlreadySelected: propTypes.bool,
    isRowOpened: propTypes.bool,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.knowledgeLevel !== prevState.knowledgeLevel) {
      return { knowledgeLevel: nextProps.knowledgeLevel };
    }
    return null;
  }

  state = {
    knowledgeLevel: this.props.knowledgeLevel,
    isOpened: false,
    levelsRowHeight: new Animated.Value(0),
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isRowOpened && !this.props.isRowOpened) {
      this.toggleRowState(false);
    }
  }
  // set skill knowledge level
  onLevelPress = (level) => {
    if (!this.props.disableLevelIndicator && this.props.onlyLevelPressEnhancer) {
      this.toggleRowState(false);
    } else if (!this.props.disableLevelIndicator) {
      this.setState({ knowledgeLevel: level });
      this.toggleRowState(false);
    }
    if (this.props.levelPressEnhancer) this.props.levelPressEnhancer(level);
  };
  onRowPress = (toggleState) => {
    Keyboard.dismiss();
    this.toggleRowState(toggleState);
    if (this.props.skillRowPressEnhancer) this.props.skillRowPressEnhancer(toggleState);
  };
  onDrawerSnap = (event) => {
    if (event.nativeEvent.id === 'dragged') this.props.onDeletePress();
  };
  // open/close skill row
  toggleRowState = (state) => {
    Animated.timing(this.state.levelsRowHeight, {
      toValue: state ? 1 : 0,
      duration: 400,
    }).start();
    this.setState({ isOpened: state });
  };
  renderMainContent = () => {
    const { knowledgeLevel, isOpened, levelsRowHeight } = this.state;
    const { skillName, disableLevelIndicator, skillLevels, isAlreadySelected } = this.props;
    const iconName = isOpened ? 'ios-arrow-up' : 'ios-arrow-down';
    return (
      <View style={styles.skillRowContainer}>
        <TouchableOpacity style={styles.skillRowWrapper} activeOpacity={1} onPress={() => this.onRowPress(!isOpened)}>
          <View style={styles.skillRow}>
            {!disableLevelIndicator && knowledgeLevel && (
              <SkillLevelBar knowledgeLevel={knowledgeLevel} levels={skillLevels} isActive={false} />
            )}
            {isAlreadySelected ? (
              <FeatherIcon name="check" size={22} color={colors.primary} style={{ marginRight: 10 }} />
            ) : null}
            <Text numberOfLines={1} style={[styles.skillName, knowledgeLevel ? { marginLeft: 5, width: '70%' } : {}]}>
              {skillName}
            </Text>
            <Icon name={iconName} size={22} style={styles.arrowDown} />
          </View>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.skillRowLevelsWrapper,
            {
              height: levelsRowHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 50],
              }),
            },
          ]}
        >
          {skillLevels.map((level) => {
            const index = level.skill_level_id + 1;
            const onPress = () => this.onLevelPress(index);
            const isActive = this.state.knowledgeLevel === index;
            return (
              <TouchableOpacity
                key={`${skillName}${level.skill_level_name}${index}`}
                activeOpacity={0.6}
                onPress={onPress}
              >
                <SkillLevelBar
                  knowledgeLevel={index}
                  label={level.skill_level_name}
                  levels={skillLevels}
                  isActive={isActive}
                />
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    );
  };
  render() {
    const { disableSwipeout } = this.props;
    return disableSwipeout ? (
      this.renderMainContent()
    ) : (
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundButton}>
          <Text style={styles.deleteIcon}>{'\ue824'}</Text>
        </View>
        <Interactable.View
          horizontalOnly
          snapPoints={[{ x: 0 }, { x: -dimensions.screenWidth, id: 'dragged' }]}
          boundaries={{ left: -dimensions.screenWidth, right: 0, bounce: 0.5 }}
          dragWithSpring={{ tension: 2000, damping: 0.5 }}
          animatedNativeDriver
          onSnap={this.onDrawerSnap}
        >
          {this.renderMainContent()}
        </Interactable.View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  skillLevels: state.initialData.skillLevels,
});

export default connect(mapStateToProps)(SkillRow);
