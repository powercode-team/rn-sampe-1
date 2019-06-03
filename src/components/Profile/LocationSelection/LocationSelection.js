import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import propTypes from 'prop-types';

import LocationRow from './../../LocationRow/LocationRow';
import styles from './styles';
import { colors } from './../../../styles/base';

let locationInputRef;

class LocationSelection extends React.Component {
  static propTypes = {
    inputValue: propTypes.string.isRequired,
    onInputChange: propTypes.func.isRequired,
    clearField: propTypes.func.isRequired,
    onLocationPress: propTypes.func.isRequired,
    isLocationSelectionActive: propTypes.bool.isRequired,
    cities: propTypes.array.isRequired,
    addedCitiesArr: propTypes.array.isRequired,
    chooseLocation: propTypes.func.isRequired,
    showFullInput: propTypes.bool,
    isLoading: propTypes.bool.isRequired,
    changeCityState: propTypes.func.isRequired,
    expandedLocations: propTypes.bool.isRequired,
    changeCityRadius: propTypes.func.isRequired,
    toggleAddedLocationContainerState: propTypes.func.isRequired,
    isAddedLocationsContainerOpened: propTypes.bool.isRequired,
    onDeletePress: propTypes.func.isRequired,
    alreadyAddedLocations: propTypes.array,
    setErrorModalState: propTypes.func,
  };
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  state = {
    heightOffset: 0,
  };
  onRadiusPress = (cityObj, radius) => {
    this.props.chooseLocation(cityObj, radius);
    Keyboard.dismiss();
  };
  onAddedRadiusPress = (cityObj, radius) => {
    const tmpCityObj = { ...cityObj };
    tmpCityObj.radius = radius;
    this.props.changeCityRadius(tmpCityObj);
    Keyboard.dismiss();
  };
  alreadyAddedFilter = (alreadyAddedItems, id) => {
    let isPresent = false;
    for (let i = 0; i < alreadyAddedItems.length; i += 1) {
      if (alreadyAddedItems[i].place_id === id) {
        isPresent = true;
        break;
      }
    }
    return isPresent;
  };
  locationItemKeyExtractor = (cityObj) => String(cityObj.place_id);
  renderLocationItem = () => {
    if (this.props.cities.length === 0) return false;
    return this.props.cities.map((item, index) => {
      const isAlreadyAdded = this.alreadyAddedFilter(this.props.alreadyAddedLocations, item.place_id);
      return this.props.expandedLocations ? (
        <LocationRow
          key={item.place_id}
          city={item.address}
          country={item.country}
          setErrorModalState={this.props.setErrorModalState}
          isAlreadyAdded={isAlreadyAdded}
          radiusPressEnhancer={(radius) => this.onRadiusPress(item, radius)}
          disableDelete={false}
          isRowOpened={this.props.cities[index].isOpened}
          locationRowPressEnhancer={(state) => this.props.changeCityState(index, state, false)}
        />
      ) : (
        <TouchableOpacity
          key={item.place_id}
          activeOpacity={0.9}
          onPress={() => {
            this.props.chooseLocation(item);
            Keyboard.dismiss();
          }}
        >
          <View style={styles.cityContainer}>
            <Text style={styles.cityText}>{`${item.address}, ${item.country}`}</Text>
            <IonicIcon name="ios-arrow-forward" size={20} color={colors.textLight} />
          </View>
        </TouchableOpacity>
      );
    });
  };
  renderAddedLocationItem = () =>
    this.props.addedCitiesArr.map((item, index) =>
      (this.props.expandedLocations ? (
        <LocationRow
          key={item.place_id}
          city={item.address}
          country={item.country}
          radiusPressEnhancer={(radius) => this.onAddedRadiusPress(item, radius)}
          disableDelete
          onDeletePress={() => this.props.onDeletePress(item)}
          radius={item.radius}
          isRowOpened={this.props.addedCitiesArr[index].isOpened}
          locationRowPressEnhancer={(state) => this.props.changeCityState(index, state, true)}
        />
      ) : (
        <TouchableOpacity
          key={item.place_id}
          activeOpacity={0.9}
          onPress={() => {
            this.props.chooseLocation(item);
            Keyboard.dismiss();
          }}
        >
          <View style={styles.cityContainer}>
            <Text style={styles.cityText}>{`${item.address}, ${item.country}`}</Text>
            <IonicIcon name="ios-arrow-forward" size={20} color={colors.textLight} />
          </View>
        </TouchableOpacity>
      )));
  render() {
    const {
      inputValue,
      onLocationPress,
      onInputChange,
      isLocationSelectionActive,
      clearField,
      cities,
      showFullInput,
      isLoading,
      addedCitiesArr,
      toggleAddedLocationContainerState,
      isAddedLocationsContainerOpened,
    } = this.props;
    const showFullVersion = showFullInput !== undefined && showFullInput;
    const inputWrapperStyles =
      isLocationSelectionActive || showFullVersion
        ? [styles.locationInputWrapper, Platform.OS === 'ios' ? { marginTop: this.state.heightOffset } : {}]
        : [
          styles.locationInputWrapper,
          { paddingHorizontal: 10, paddingVertical: 0, borderBottomWidth: 0, borderTopWidth: 0 },
        ];
    const inputStyles =
      isLocationSelectionActive || showFullVersion
        ? styles.searchInput
        : [styles.searchInput, { fontSize: 14, paddingLeft: 0 }];
    return (
      <View style={styles.locationSelectionContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!isLocationSelectionActive) {
              onLocationPress();
              setTimeout(() => {
                if (Platform.OS === 'ios') {
                  locationInputRef.measure((fx, fy, width, height, px, py) => {
                    if (py < 79) {
                      this.setState((prevState) => ({
                        heightOffset: Math.random() > 0.5 ? prevState.heightOffset + 0.5 : prevState.heightOffset - 0.5,
                      }));
                    }
                  });
                  locationInputRef.focus();
                } else {
                  locationInputRef.focus();
                }
              }, 400);
            } else if (isLocationSelectionActive && Platform.OS === 'ios') {
              setTimeout(() => {
                locationInputRef.focus();
              }, 400);
            }
          }}
        >
          <View
            style={[
              inputWrapperStyles,
              showFullVersion
                ? {
                    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0.5,
                    borderBottomColor: colors.textLight,
                    borderTopWidth: 0,
                  }
                : {},
            ]}
          >
            {!isLocationSelectionActive && !showFullVersion && (
              <View style={styles.wrapperLabel}>
                <Text style={styles.label}>{this.context.t('Location')}</Text>
              </View>
            )}
            {(isLocationSelectionActive || showFullVersion) && <Text style={styles.searchIcon}>{'\ue807'}</Text>}
            <View pointerEvents={Platform.OS === 'ios' ? 'box-only' : 'auto'} style={styles.wrapperInput}>
              <TextInput
                // ref={(inputField) => { locationInputRef = inputField; }}
                ref={(inputField) => {
                  locationInputRef = inputField;
                }}
                style={inputStyles}
                onChangeText={onInputChange}
                value={inputValue}
                placeholder={
                  showFullVersion ? this.context.t('Add location preferences...') : this.context.t('Location')
                }
                placeholderTextColor={colors.textLight}
                underlineColorAndroid="transparent"
                autoCapitalize="words"
                editable={isLocationSelectionActive}
              />
            </View>
            <TouchableOpacity activeOpacity={1} onPress={clearField}>
              <View style={styles.clearIconWrapper}>
                {Boolean(inputValue) && isLocationSelectionActive && (
                  <MaterialIcon style={styles.clearIcon} name="cancel" size={16} color="#858585" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        <ScrollView
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          // refreshControl={
          //   <RefreshControl
          //     refreshing={isLoading}
          //     enabled={false}
          //     progressViewOffset={30}
          //   />
          // }
        >
          {isLocationSelectionActive && (
            <View style={styles.citiesContainer}>
              {Boolean(addedCitiesArr.length) && (
                <View>
                  <TouchableWithoutFeedback onPress={toggleAddedLocationContainerState}>
                    <View style={styles.addedLocationListHeader}>
                      <Text style={styles.citiesTitle}>{this.context.t('ADDED LOCATIONS')}</Text>
                      <IonicIcon
                        name={isAddedLocationsContainerOpened ? 'ios-arrow-up' : 'ios-arrow-down'}
                        size={22}
                        color={colors.secondary}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  {isAddedLocationsContainerOpened && <View style={{ flex: 1 }}>{this.renderAddedLocationItem()}</View>}
                </View>
              )}
              <View style={styles.citiesHeader}>
                <Text style={styles.citiesTitle}>{this.context.t('LIST OF LOCATIONS')}</Text>
              </View>
              {isLoading ? (
                <View style={{ marginTop: 20 }}>
                  <ActivityIndicator size={1} color="#000" />
                </View>
              ) : (
                <View style={{ flex: 1 }}>
                  {cities.length === 0 && inputValue.length > 0 ? (
                    <Text style={styles.noLocations}>{this.context.t('No locations found')}</Text>
                  ) : (
                    this.renderLocationItem()
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default LocationSelection;
