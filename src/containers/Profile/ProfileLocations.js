import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';

import ProfileLocations from './../../components/Profile/ProfileLocations/ProfileLocations';
import { setLocationRadius, deleteUserLocation, addUserLocation } from '../../actions/locations';

import LoadingModal from './../../components/LoadingModal/LoadingModal';
import ValidationError from './../../components/ValidationError/ValidationError';
// import ErrorModal from './../../components/ErrorModal/ErrorModal';

class ProfileLocationsContainer extends Component {
  static propTypes = {
    toggleHeaderState: propTypes.func.isRequired,
    existingLocations: propTypes.array.isRequired,
    addUserLocation: propTypes.func.isRequired,
    fetchUserLocations: propTypes.func.isRequired,
    deleteUserLocation: propTypes.func.isRequired,
    setLocationRadius: propTypes.func.isRequired,
    navigation: propTypes.object.isRequired,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.existingLocations.length !== prevState.locationsRowsStates.length) {
      return {
        locationsRowsStates: new Array(nextProps.existingLocations.length).fill(false),
      };
    }
    return null;
  }
  state = {
    isLocationSelectionActive: false,
    isLoadingModalVisible: false,
    isErrorModalVisible: false,
    // errorTitle: 'Error!',
    errorMessage: '',
    isLoading: false,
    locationsRowsStates: new Array(this.props.existingLocations.length).fill(false),
  };
  onLocationPress = () => {
    this.setState({ isLocationSelectionActive: true });
    this.props.toggleHeaderState(false);
    this.props.navigation.setParams({ showCancelLocationButton: true });
  };
  onCancelPress = () => {
    this.setState({ isLocationSelectionActive: false });
    this.props.toggleHeaderState(true);
    Keyboard.dismiss();
  };
  setErrorModalState = (state, message) => {
    this.setState({ isErrorModalVisible: state, errorMessage: message });
    this.closePopupModal();
  };
  chooseLocation = (locationObj) => {
    if (this.props.existingLocations.find((item) => item.place_id === locationObj.place_id)) {
      this.setErrorModalState(true, 'Location is already added');
      return true;
    }
    const data = locationObj.map((val) => ({ place_id: val.place_id, distance_for_search: val.radius }));
    Keyboard.dismiss();
    this.setState({ isLocationSelectionActive: false });
    this.props.toggleHeaderState(true);
    this.toggleModalState('isLoadingModalVisible', true);
    this.props.addUserLocation(data, (e) => {
      if (e) {
        this.setState({
          isLoadingModalVisible: false,
          isErrorModalVisible: true,
          errorMessage: e.msg || e.message || e,
        });
        this.closePopupModal();
      } else {
        setTimeout(() => {
          this.setState({ isLoadingModalVisible: false });
        }, 400);
      }
    });
  };
  toggleModalState = (name, state) => {
    this.setState({ [name]: state });
  };
  changeLocationRowState = (state, index) => {
    this.setState((prevState) => ({
      locationsRowsStates: prevState.locationsRowsStates.map((oldState, i) => (i === index ? state : false)),
    }));
  };
  // fetchUserLocations = () => {
  //   this.setState({ isLoading: true });
  //   this.props.fetchUserLocations(() => {
  //     this.setState({ isLoading: false });
  //   });
  // };
  closePopupModal = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      this.setState({ errorMessage: '', isErrorModalVisible: false });
    }, 4000);
  };
  render() {
    return (
      <React.Fragment>
        <LoadingModal
          closeModal={() => this.toggleModalState('isLoadingModalVisible', false)}
          visible={this.state.isLoadingModalVisible}
        />
        {/* <ErrorModal
          closeModal={() => this.toggleModalState('isErrorModalVisible', false)}
          visible={this.state.isErrorModalVisible}
          message={this.state.errorMessage}
          title={this.state.errorTitle}
        /> */}
        <ValidationError isVisible={this.state.isErrorModalVisible} message={this.state.errorMessage} isBottom />
        <ProfileLocations
          toggleHeaderState={this.props.toggleHeaderState}
          existingLocations={this.props.existingLocations}
          isLocationSelectionActive={this.state.isLocationSelectionActive}
          onLocationPress={this.onLocationPress}
          onCancelPress={this.onCancelPress}
          chooseLocation={this.chooseLocation}
          deleteUserLocation={this.props.deleteUserLocation}
          setLocationRadius={this.props.setLocationRadius}
          openLoadingModal={() => this.toggleModalState('isLoadingModalVisible', true)}
          closeLoadingModal={() => this.toggleModalState('isLoadingModalVisible', false)}
          fetchUserLocations={this.props.fetchUserLocations}
          isLoading={this.state.isLoading}
          locationsRowsStates={this.state.locationsRowsStates}
          changeLocationRowState={this.changeLocationRowState}
          setErrorModalState={this.setErrorModalState}
          navigation={this.props.navigation}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  existingLocations: state.userLocations.locations.sort((a, b) =>
    (a.distance_for_search > b.distance_for_search ? -1 : 1)),
});

const mapDispatchToProps = { setLocationRadius, deleteUserLocation, addUserLocation };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileLocationsContainer);
