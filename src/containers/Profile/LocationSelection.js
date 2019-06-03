import React, { Component } from 'react';
import { Keyboard, Platform } from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchAPI } from '../../utils/api';
import LocationSelection from './../../components/Profile/LocationSelection/LocationSelection';
import CheckMarkModal from '../../components/CheckMarkModal/CheckMarkModal';

class LocationSelectionContainer extends Component {
  static propTypes = {
    onLocationPress: propTypes.func.isRequired,
    isLocationSelectionActive: propTypes.bool.isRequired,
    onCancelPress: propTypes.func.isRequired,
    chooseLocation: propTypes.func.isRequired,
    location: propTypes.string.isRequired,
    showFullInput: propTypes.bool,
    clearAfterSelect: propTypes.bool,
    expandedLocations: propTypes.bool.isRequired,
    navigation: propTypes.object.isRequired,
    alreadyAddedLocations: propTypes.array,
    setErrorModalState: propTypes.func,
  };

  static getDerivedStateFromProps = (props, state) => {
    if (!state.lastChangeKeyboard && props.location !== state.location) {
      return { inputValue: props.location, lastChangeKeyboard: false };
    }
    return null;
  };

  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.location || '',
      cities: [],
      addedCitiesArr: [],
      isLoading: false,
      isModalCheckMarkVisible: false,
      isAddedLocationsContainerOpened: true,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      isLocationSelectionActive: true,
      onLocationCancel: this.onCancelPress,
      onLocationSave: this.submit,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.addedCitiesArr.length && !this.props.navigation.state.params.showSaveLocationButton) {
      this.props.navigation.setParams({ showSaveLocationButton: true });
    }
    if (!prevState.addedCitiesArr.length && this.props.navigation.state.params.showSaveLocationButton) {
      this.props.navigation.setParams({ showSaveLocationButton: false });
    }
  }

  componentWillUnmount() {
    this.props.navigation.setParams({ isLocationSelectionActive: false });
  }
  onInputValueChange = (value) => {
    this.setState({ inputValue: value });
    this.debouncedFetch(value);
  };
  onCancelPress = () => {
    Keyboard.dismiss();
    this.props.onCancelPress();
    this.setState({ cities: [], addedCitiesArr: [], inputValue: this.props.location });
    this.props.navigation.setParams({ showCancelLocationButton: false });
  };
  onDeleteLocationPress = (i) => {
    const item = { ...i };
    item.isOpened = false;
    item.radius = null;
    this.setState((prevState) => ({
      cities: prevState.cities.concat(item),
      addedCitiesArr: prevState.addedCitiesArr.filter((oldState) => oldState.place_id !== i.place_id),
    }));
  };
  onCloseCheckMarkModal = () => this.setState({ isModalCheckMarkVisible: false });
  clearField = () => {
    this.setState({ inputValue: '', cities: [] });
  };

  debouncedFetch = _.debounce((value) => this.fetchCitiesList(value), 1000);
  submit = (cityObj) => {
    const data = cityObj === undefined ? this.state.addedCitiesArr : cityObj;
    const shouldBlockFurtherExecution = this.props.chooseLocation(data);
    if (shouldBlockFurtherExecution) return;
    this.setState({
      cities: [],
      addedCitiesArr: [],
      inputValue: this.props.clearAfterSelect ? '' : `${cityObj.address}, ${cityObj.country}`,
    });
    this.props.navigation.setParams({ showCancelLocationButton: false });
  };
  toggleAddedLocationContainerState = () => {
    this.setState((prevState) => ({ isAddedLocationsContainerOpened: !prevState.isAddedLocationsContainerOpened }));
  };
  fetchCitiesList = async (value) => {
    if (value === '') {
      this.setState({ cities: [], isLoading: false });
      return;
    }
    if (Platform.OS === 'ios') {
      // setTimeout(() => {
      this.setState({ isLoading: true });
      // }, 200);
    } else {
      this.setState({ isLoading: true });
    }

    try {
      const response = await fetchAPI(`/location/get_locations/${value}`, 'GET');

      if (!value) {
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            this.setState({ cities: [], isLoading: false });
          }, 200);
        } else {
          this.setState({ cities: [], isLoading: false });
        }
      } else {
        const cities = response.payload
          ? response.payload.map((cityObj) => ({ ...cityObj, isOpened: false, radius: null }))
          : [];
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            this.setState({
              cities,
              isLoading: false,
            });
          }, 200);
        } else {
          this.setState({
            cities,
            isLoading: false,
          });
        }
      }
    } catch (err) {
      setTimeout(() => {
        this.setState({ cities: [], isLoading: false });
        Keyboard.dismiss();
      }, 400);
    }
  };

  chooseLocation = (cityObj, radius) => {
    if (radius === undefined) {
      this.submit(cityObj);
      return;
    }
    const cities = [...this.state.cities].filter((val) => val.place_id !== cityObj.place_id);
    const tmpCityObj = { ...cityObj, isOpened: false, radius };
    const addedCitiesArr = [...this.state.addedCitiesArr, tmpCityObj];
    this.setState({ addedCitiesArr, cities, isModalCheckMarkVisible: true });
  };

  changeCityState = (index, state, isAdded) => {
    if (state) {
      if (isAdded) {
        this.setState((prevState) => ({
          addedCitiesArr: prevState.addedCitiesArr.map((oldState, i) =>
            (i === index ? { ...oldState, isOpened: state } : { ...oldState, isOpened: false })),
        }));
      } else {
        this.setState((prevState) => ({
          cities: prevState.cities.map((oldState, i) =>
            (i === index ? { ...oldState, isOpened: state } : { ...oldState, isOpened: false })),
        }));
      }
    }
  };

  changeCityRadius = (cityObj) => {
    this.setState((prevState) => {
      const addedCitiesArr = prevState.addedCitiesArr.map((val) =>
        (val.place_id === cityObj.place_id ? { ...val, radius: cityObj.radius } : val));
      return { addedCitiesArr };
    });
  };

  render() {
    const { onLocationPress, isLocationSelectionActive } = this.props;
    return (
      <React.Fragment>
        <LocationSelection
          inputValue={this.state.inputValue}
          onInputChange={this.onInputValueChange}
          clearField={this.clearField}
          onLocationPress={onLocationPress}
          isLocationSelectionActive={isLocationSelectionActive}
          onCancelPress={this.onCancelPress}
          cities={this.state.cities}
          chooseLocation={this.chooseLocation}
          location={this.props.location}
          showFullInput={this.props.showFullInput}
          isLoading={this.state.isLoading}
          changeCityState={this.changeCityState}
          expandedLocations={this.props.expandedLocations}
          addedCitiesArr={this.state.addedCitiesArr}
          changeCityRadius={this.changeCityRadius}
          toggleAddedLocationContainerState={this.toggleAddedLocationContainerState}
          isAddedLocationsContainerOpened={this.state.isAddedLocationsContainerOpened}
          onDeletePress={this.onDeleteLocationPress}
          alreadyAddedLocations={this.props.alreadyAddedLocations}
          setErrorModalState={this.props.setErrorModalState}
        />
        <CheckMarkModal isVisible={this.state.isModalCheckMarkVisible} onCloseModal={this.onCloseCheckMarkModal} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  alreadyAddedLocations: state.userLocations.locations,
});

export default connect(
  mapStateToProps,
  null,
)(LocationSelectionContainer);
