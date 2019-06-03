import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import propTypes from 'prop-types';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Interactable from 'react-native-interactable';

import styles from './styles';
import { dimensions, colors } from './../../styles/base';

class ExpandedSkillRow extends Component {
  static propTypes = {
    skillName: propTypes.string.isRequired,
    onAddPress: propTypes.func,
    onDeletePress: propTypes.func,
    disableSwipeout: propTypes.bool,
    isAlreadySelected: propTypes.bool,
    disableAdding: propTypes.bool,
  };
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  onDrawerSnap = (event) => {
    if (event.nativeEvent.id === 'dragged') this.props.onDeletePress();
  };
  onAddButtonPress = () => {
    Keyboard.dismiss();
    this.props.onAddPress();
  };
  renderMainContent = () => {
    const { skillName, isAlreadySelected, disableAdding } = this.props;

    return (
      <View style={styles.skillRowContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={this.onAddButtonPress} style={styles.skillRow}>
          {isAlreadySelected ? (
            <FeatherIcon name="check" size={22} color={colors.secondary} style={{ marginRight: 10 }} />
          ) : null}
          <Text numberOfLines={1} style={styles.skillName}>
            {skillName}
          </Text>
          {!disableAdding && (
            <View style={styles.plusWrapper}>
              <FeatherIcon name="plus" size={24} color={colors.secondary} style={styles.arrowDown} />
            </View>
          )}
        </TouchableOpacity>
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

export default ExpandedSkillRow;
