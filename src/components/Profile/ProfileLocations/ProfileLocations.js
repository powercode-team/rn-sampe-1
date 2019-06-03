import React from 'react';
import { View } from 'react-native';

import propTypes from 'prop-types';

import LocationSelection from './../../../containers/Profile/LocationSelection';
import LocationRow from './../../LocationRow/LocationRow';

const ProfileLocations = ({
  existingLocations,
  onLocationPress,
  isLocationSelectionActive,
  onCancelPress,
  chooseLocation,
  setErrorModalState,
  deleteUserLocation,
  setLocationRadius,
  openLoadingModal,
  closeLoadingModal,
  locationsRowsStates,
  changeLocationRowState,
  navigation,
}) => (
  <React.Fragment>
    <LocationSelection
      onLocationPress={onLocationPress}
      onCancelPress={onCancelPress}
      chooseLocation={chooseLocation}
      location=""
      setErrorModalState={setErrorModalState}
      isLocationSelectionActive={isLocationSelectionActive}
      showFullInput={isLocationSelectionActive ? undefined : true}
      navigation={navigation}
      clearAfterSelect
      expandedLocations
    />
    {!isLocationSelectionActive ? (
      <View>
        {existingLocations.map((location, index) => (
          <LocationRow
            key={location.place_id}
            city={location.city}
            country={location.country}
            disableDelete
            radius={location.distance_for_search}
            radiusPressEnhancer={(radius) => {
              openLoadingModal();
              setLocationRadius({ id: location.id, distance_for_search: radius }, () => {
                setTimeout(() => {
                  closeLoadingModal();
                }, 400);
              });
            }}
            locationRowPressEnhancer={(state) => changeLocationRowState(state, index)}
            isRowOpened={locationsRowsStates[index]}
            onDeletePress={() => {
              openLoadingModal();
              deleteUserLocation(location.id, () => {
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

ProfileLocations.propTypes = {
  isLocationSelectionActive: propTypes.bool.isRequired,
  onLocationPress: propTypes.func.isRequired,
  onCancelPress: propTypes.func.isRequired,
  existingLocations: propTypes.array.isRequired,
  chooseLocation: propTypes.func.isRequired,
  deleteUserLocation: propTypes.func.isRequired,
  setLocationRadius: propTypes.func.isRequired,
  openLoadingModal: propTypes.func.isRequired,
  closeLoadingModal: propTypes.func.isRequired,
  locationsRowsStates: propTypes.array.isRequired,
  changeLocationRowState: propTypes.func.isRequired,
  navigation: propTypes.object.isRequired,
  setErrorModalState: propTypes.func.isRequired,
};

export default ProfileLocations;
