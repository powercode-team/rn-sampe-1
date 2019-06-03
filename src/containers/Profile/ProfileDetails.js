import React, { Component } from 'react';
import { reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import _ from 'lodash';
import propTypes from 'prop-types';
import moment from 'moment';

import { updateUser } from '../../actions/user';

import {
  onlyLetters,
  lengthSize,
  lettersAndNumbers,
  onlyNumbers,
  // isGermanMobilePhone,
  validatePhoneNumber,
  validateProfession,
  validateEducation,
  validateName,
} from '../../utils/validators';

import ProfileDetails from './../../components/Profile/ProfileDetails/ProfileDetails';
import LoadingModal from './../../components/LoadingModal/LoadingModal';

class ProfileDetailsContainer extends Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    dispatch: propTypes.func.isRequired,
    handleSubmit: propTypes.func.isRequired,
    toggleHeaderState: propTypes.func.isRequired,
    city: propTypes.string,
    country: propTypes.string,
    seniority: propTypes.string,
    gender: propTypes.string,
    dateOfBirth: propTypes.oneOfType([propTypes.string, propTypes.number]),
    pristine: propTypes.bool.isRequired,
    seniorities: propTypes.array.isRequired,
    updateUser: propTypes.func.isRequired,
    fetchUserProfile: propTypes.func.isRequired,
    popupModalFunc: propTypes.func.isRequired,
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let tmpObj = {};

    if (nextProps.city !== prevState.lastCity) {
      tmpObj = {
        ...tmpObj,
        city: nextProps.city,
        country: nextProps.country,
        lastCity: nextProps.city,
        lastCountry: nextProps.country,
      };
    }
    if (nextProps.dateOfBirth !== prevState.lastDate) {
      tmpObj = {
        ...tmpObj,
        date: nextProps.dateOfBirth,
        lastDate: nextProps.dateOfBirth,
      };
    }
    if (nextProps.gender !== prevState.lastGender && nextProps.gender !== null) {
      tmpObj = {
        ...tmpObj,
        gender: nextProps.gender,
        lastGender: nextProps.gender,
      };
    }
    if (nextProps.seniority !== prevState.lastSeniority && nextProps.seniority !== null) {
      tmpObj = {
        ...tmpObj,
        seniority: nextProps.seniority,
        lastSeniority: nextProps.seniority,
      };
    }
    // if (nextProps.city !== prevState.city ||
    //   nextProps.dateOfBirth !== prevState.date ||
    //   (nextProps.gender !== prevState.gender && nextProps.gender !== null) ||
    //   (nextProps.seniority !== prevState.seniority && nextProps.seniority !== null)
    // ) {
    //   tmpObj = {
    //     ...tmpObj,
    //     city: nextProps.city,
    //     country: nextProps.country,
    //     date: nextProps.dateOfBirth,
    //     gender: nextProps.gender,
    //     seniority: nextProps.seniority,
    //   };
    // }
    return Object.keys(tmpObj).length ? tmpObj : null;
  };

  constructor(props) {
    super(props);
    this.state = {
      gender: this.props.gender || '',
      seniority: this.props.seniority || '',
      date: this.props.dateOfBirth || null,
      isDateTimePickerVisible: false,
      isLocationSelectionActive: false,
      city: this.props.city || '',
      country: this.props.country || '',
      // isValidationErrorVisible: false,
      // validationErrorMessage: '',
      isLoadingModalVisible: false,
      isPristine: true,
      isLoading: false,
    };

    this.isChangedRoute = true;
  }

  componentDidMount() {
    this.props.navigation.setParams({ onSubmit: this.props.handleSubmit(this.onSubmit) });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    this.onFocus = this.props.navigation.addListener('didFocus', () => {
      if (this.isChangedRoute) {
        this.isChangedRoute = false;
      } else {
        this.isChangedRoute = false;
      }
    });

    this.didBlurSubscription = this.props.navigation.addListener('didBlur', (payload) => {
      this.isChangedRoute = false;
      if (payload.action.key !== 'Profile' && payload.action.key !== 'HrConfirmation') {
        this.isChangedRoute = true;
      }
    });
  }

  componentWillUnmount() {
    this.onFocus.remove();
    this.didBlurSubscription.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  onSubmit = (values) => {
    Keyboard.dismiss();
    // check if any of the values were changed by the user
    if (this.props.pristine && this.state.isPristine) {
      this.showErrorMessage('None of the fields were changed');
      return;
    }
    const { education, profession, phone, email } = values;

    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const username = values.username.trim();

    const { gender, seniority, date, city, country } = this.state;
    const { updateUser: update } = this.props;
    const fullLocation = city ? `${city}, ${country}` : '';
    const separateCity = city || (fullLocation.split(',')[0] && fullLocation.split(',')[0].trim());
    const separateCountry = country || (fullLocation.split(',')[1] && fullLocation.split(',')[1].trim());

    const firstNameInvalid = firstName && validateName(firstName);
    const lastNameInvalid = lastName && validateName(lastName);

    const usernameInvalid = username
      ? lettersAndNumbers(username) || lengthSize(username, 1, 35) || !onlyNumbers(username)
      : false;

    const isLocationInvalid = fullLocation && !onlyLetters(fullLocation);
    const isEducationInvalid = education && validateEducation(education.trim());
    const dateInMs = typeof date === 'string' ? Number(new Date(date)) : date;
    const yearInMs = 365 * 24 * 60 * 60 * 1000;
    const isDateInvalid = dateInMs && dateInMs > Date.now() - yearInMs;
    const isProfessionInvalid = profession && validateProfession(profession.trim());
    // const isPhoneInvalid = phone && (isGermanMobilePhone(phone) || phone.length !== 13);
    const isPhoneInvalid = phone && validatePhoneNumber(phone.trim());

    if (!firstName) {
      this.showErrorMessage('First name field cannot be empty');
      return;
    }
    if (!lastName) {
      this.showErrorMessage('Last name field cannot be empty');
      return;
    }
    if (firstNameInvalid) {
      this.showErrorMessage('First name should contain only letters and be in a 1-35 characters range');
      return;
    }
    if (lastNameInvalid) {
      this.showErrorMessage('Last name should contain only letters and be in a 1-35 characters range');
      return;
    }
    if (usernameInvalid) {
      this.showErrorMessage('Username should contain only letters or letters and numbers and be in a 1-35 characters range');
      return;
    }
    if (isLocationInvalid) {
      this.showErrorMessage('Location field should not contain numbers');
      return;
    }
    if (isEducationInvalid) {
      this.showErrorMessage('Education should contain only letters and be in a 1-35 characters range');
      return;
    }
    if (isDateInvalid) {
      this.showErrorMessage('Minimum age should be at least one year');
      return;
    }
    if (isProfessionInvalid) {
      this.showErrorMessage('Profession should contain letters, may contain digits and special symbols, and should be in a 1-35 characters range');
      return;
    }
    if (isPhoneInvalid) {
      this.showErrorMessage('Phone number should be between 8 and 15 digits');
      return;
    }

    // console.log('education', eыducation.trim());

    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      // seniority: seniorities.find(obj => obj.seniority_level_name === seniority).seniority_level_id, //TODO enable later
      seniority,
      location_city: separateCity,
      location_country: separateCountry,
      education: education.trim(),
      gender,
      date_of_birth: dateInMs || null,
      profession: profession.trim(),
      phone,
    };

    Object.keys(data).forEach((key) => (data[key] === false || data[key] === null || data[key] === undefined) && delete data[key]);

    this.setModalState('isLoadingModalVisible', true);

    update(data, (e) => {
      if (e) {
        setTimeout(() => {
          this.setState({ isLoadingModalVisible: false });
        }, 400);
        this.props.popupModalFunc({
          isValidationErrorVisible: true,
          validationErrorMessage: e.msg || e.message || e,
        });
      } else {
        setTimeout(() => {
          this.setState({
            isLoadingModalVisible: false,
            isPristine: true,
          });
        }, 400);
        this.props.popupModalFunc({
          isValidationErrorVisible: true,
          validationErrorMessage: 'Success!\nUser profile has been updated successfully',
        });
      }
    });
  };
  onLocationPress = () => {
    this.props.toggleHeaderState(false);
    this.props.navigation.setParams({ isLocationPickerOpened: true });
    this.setState({ isLocationSelectionActive: true });
    this.props.navigation.setParams({ showCancelLocationButton: true });
    // setTimeout(() => {
    //   this.setState({ isLocationSelectionActive: true });
    // }, 100);
  };
  onCancelPress = () => {
    this.props.toggleHeaderState(true);
    this.props.navigation.setParams({ isLocationPickerOpened: false });
    this.setState({ isLocationSelectionActive: false });
    Keyboard.dismiss();
  };
  setModalState = (name, state) => {
    this.setState({ [name]: state });
  };

  showErrorMessage = (message) => {
    this.props.popupModalFunc({
      isValidationErrorVisible: true,
      validationErrorMessage: message,
    });
  };
  chooseLocation = (locationObj) => {
    this.setState({ city: locationObj.address, country: locationObj.country, isPristine: false });
    this.onCancelPress();
  };
  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, {
    trailing: false,
  });
  handleChange = (name, value) => {
    this.setState({ [name]: value, isPristine: false });
  };
  showDateTimePicker = () => {
    this.setModalState('isDateTimePickerVisible', true);
  };
  hideDateTimePicker = () => {
    this.setModalState('isDateTimePickerVisible', false);
  };
  handleDatePicked = (date) => {
    this.setState({ date: Number(date), isPristine: false });
    this.hideDateTimePicker();
  };
  clearField = (name) => {
    this.props.dispatch(change('profileDetails', name, ''));
  };

  keyboardDidShow = () => {
    this.props.navigation.setParams({ hideTabBar: true });
  };
  keyboardDidHide = () => {
    this.props.navigation.setParams({ hideTabBar: false });
  };
  // fetchUserProfile = () => {
  //   this.setState({ isLoading: true });
  //   this.props.fetchUserProfile(() => {
  //     setTimeout(() => {
  //       this.setState({ isLoading: false });
  //     }, 400);
  //   });
  // };

  // closePopupModal = () => {
  //   Keyboard.dismiss();
  //   setTimeout(() => {
  //     this.setState({ validationErrorMessage: '', isValidationErrorVisible: false });
  //   }, 4000);
  // };

  render() {
    const fullLocation = this.state.city ? `${this.state.city}, ${this.state.country}` : '';
    // console.log('full location', fullLocation);
    const initialDate = this.state.date ? moment(this.state.date).toDate() : new Date();
    return (
      <React.Fragment>
        <LoadingModal
          visible={this.state.isLoadingModalVisible}
          closeModal={() => this.setModalState('isLoadingModalVisible', false)}
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          date={initialDate}
        />
        <ProfileDetails
          clearField={this.clearField}
          onInputChange={this.handleChange}
          gender={this.state.gender}
          seniority={this.state.seniority}
          showDateTimePicker={this.showDateTimePicker}
          date={this.state.date}
          onLocationPress={this.onLocationPress}
          isLocationSelectionActive={this.state.isLocationSelectionActive}
          onCancelPress={this.onCancelPress}
          location={fullLocation}
          chooseLocation={this.chooseLocation}
          seniorities={this.props.seniorities.map((obj) => obj.seniority_level_name)}
          fetchUserProfile={this.props.fetchUserProfile}
          isLoading={this.state.isLoading}
          navigation={this.props.navigation}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  seniority: state.user.seniority,
  gender: state.user.gender,
  dateOfBirth: state.user.dateOfBirth,
  city: state.user.city,
  country: state.user.country,
  initialValues: {
    firstName: state.user.firstName || '',
    lastName: state.user.lastName || '',
    email: state.user.email || '',
    username: state.user.username || '',
    education: state.user.education || '',
    profession: state.user.profession || '',
    phone: state.user.phone,
  },
  seniorities: state.initialData.seniorities,
});

const mapDispatchToProps = { updateUser };

const reduxFormOptions = {
  form: 'profileDetails',
  enableReinitialize: true,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm(reduxFormOptions)(ProfileDetailsContainer));
