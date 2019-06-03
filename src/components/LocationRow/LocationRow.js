import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './styles';
import LocationRadius from './LocationRadius';
import { dimensions, colors } from './../../styles/base';

const radiuses = [10, 25, 50, 100];

class LocationRow extends Component {
  static propTypes = {
    radius: propTypes.number,
    city: propTypes.string,
    country: propTypes.string.isRequired,
    radiusPressEnhancer: propTypes.func,
    locationRowPressEnhancer: propTypes.func,
    onDeletePress: propTypes.func,
    disableDelete: propTypes.bool,
    isRowOpened: propTypes.bool,
    isAlreadyAdded: propTypes.bool,
    setErrorModalState: propTypes.func,
    // disableLevelIndicator: propTypes.bool,
    // onlyLevelPressEnhancer: propTypes.bool,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.radius !== prevState.radius) {
      return { radius: nextProps.radius };
    }
    return null;
  }

  state = {
    radius: this.props.radius,
    isOpened: false,
    levelsRowHeight: new Animated.Value(0),
  };
  componentDidUpdate(prevProps) {
    if (prevProps.isRowOpened && !this.props.isRowOpened) {
      this.toggleRowState(false);
    }
  }
  // set skill knowledge level
  onRadiusPress = (radius, isAlreadyAdded) => {
    if (isAlreadyAdded) {
      this.props.setErrorModalState(true, 'Location is already added');
      return;
    }
    if (radius === this.state.radius) return;
    this.setState({ radius });
    this.toggleRowState(false);
    if (this.props.radiusPressEnhancer) this.props.radiusPressEnhancer(radius);
  };
  onRowPress = (toggleState) => {
    if (this.props.locationRowPressEnhancer) this.props.locationRowPressEnhancer(toggleState);
    this.toggleRowState(toggleState);
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
    const { isOpened, levelsRowHeight } = this.state;
    const { city, country, radius, isAlreadyAdded } = this.props;
    const iconName = isOpened ? 'ios-arrow-up' : 'ios-arrow-down';
    return (
      <View style={styles.locationRowContainer}>
        <TouchableOpacity
          style={styles.locationRowWrapper}
          activeOpacity={1}
          onPress={() => this.onRowPress(!isOpened)}
        >
          <View style={[styles.locationRow, radius ? {} : { marginVertical: 15 }]}>
            {Boolean(isAlreadyAdded) && (
              <FeatherIcon name="check" size={22} color={colors.primary} style={{ marginRight: 10 }} />
            )}
            {radius && <LocationRadius isCompact radius={radius} isCurrentRadius={false} />}
            <Text style={[styles.city, { marginLeft: radius ? 10 : 0 }]}>
              {city}, {country}
            </Text>
            <Icon name={iconName} size={22} style={styles.arrowDown} />
          </View>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.locationRowRadiusesWrapper,
            {
              height: levelsRowHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 40],
              }),
            },
          ]}
        >
          {radiuses.map((radiusNumber, i) => {
            const index = i + 1;
            const onPress = () => this.onRadiusPress(radiusNumber, Boolean(isAlreadyAdded));
            const current = radiusNumber === this.state.radius;
            return (
              <TouchableOpacity key={`${city}${radiusNumber}${index}`} activeOpacity={0.6} onPress={onPress}>
                <LocationRadius isCurrentRadius={current} radius={radiusNumber} />
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    );
  };
  render() {
    const { disableDelete } = this.props;
    return (
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundButton}>
          <Text style={styles.deleteIcon}>{'\ue824'}</Text>
        </View>
        {disableDelete ? (
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
        ) : (
          this.renderMainContent()
        )}
      </View>
    );
  }
}

export default LocationRow;
