import React, { Component } from 'react';
import { NavigationActions, SafeAreaView } from 'react-navigation';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import propTypes from 'prop-types';
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info';

import { signUp } from '../actions/signUp';
import { validateEmail, validatePassword, validateName } from '../utils/validators';
import SignUpForm from '../components/SignUp/SignUp';
// import ErrorModal from '../components/ErrorModal/ErrorModal';
import ValidationError from '../components/ValidationError/ValidationError';
import LoadingModal from '../components/LoadingModal/LoadingModal';
import inputs from '../utils/signUpInputs';

class SignUpContainer extends Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    dispatch: propTypes.func.isRequired,
    signUp: propTypes.func.isRequired,
    handleSubmit: propTypes.func.isRequired,
    firstName: propTypes.string,
    lastName: propTypes.string,
    email: propTypes.string,
    password: propTypes.string,
    passwordCheck: propTypes.string,
    currentLanguage: propTypes.string.isRequired,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { submitFailed, firstName, lastName, email, password, passwordCheck } = nextProps;
    if (!prevState.submitFailed && submitFailed && (!firstName || !lastName || !email || !password || !passwordCheck)) {
      // this.closePopupModal();
      return {
        isErrorModalVisible: true,
        errorMessage: 'Please fill in all the mandatory fields',
        submitFailed: true,
      };
    }
    return null;
  }
  state = {
    isErrorModalVisible: false,
    errorMessage: '',
    isInfoModalVisible: false,
    isLoadingModalVisible: false,
    areTermsAccepted: false,
  };
  shouldComponentUpdate(prevProps, nextState) {
    if (nextState.isErrorModalVisible) this.closePopupModal();
    return true;
  }
  onSignUpPress = () => {
    Keyboard.dismiss();
    if (!this.state.areTermsAccepted) return;
    this.props.handleSubmit(this.submitHandler)();
  };
  onCheckPasswordEditingEnd = () => {
    if (!this.state.areTermsAccepted) return;
    const { firstName, lastName, email, password, passwordCheck } = this.props;
    if (!firstName || !lastName || !email || !password || !passwordCheck) return;
    this.submitHandler({ firstName, lastName, email, password, passwordCheck });
  };
  onTermsOfUsePress = () => {
    this.throttledNavigate('AuthTermsOfUse');
  };
  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, {
    trailing: false,
  });
  throttledReturn = _.throttle(this.props.navigation.goBack, 300, {
    trailing: false,
  });
  goBack = () => {
    Keyboard.dismiss();
    this.throttledReturn();
  };
  clearField = (fieldName) => {
    this.props.dispatch(change('signUpForm', fieldName, ''));
  };
  changeModalState = (name, state) => {
    this.setState({ [name]: state });
  };
  submitHandler = (values) => {
    const { firstName, lastName, password, passwordCheck } = values;

    const email = values.email && values.email.trim();

    if (!Object.keys(values).length) return;
    // validate all the incoming fields
    const firstNameInvalid = firstName && validateName(firstName);
    const lastNameInvalid = lastName && validateName(lastName);
    const emailInvalid = validateEmail(email);
    const passwordInvalid = validatePassword(password);
    const repeatedPasswordInvalid = !(passwordCheck === password);
    if (firstNameInvalid) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage: 'First name should contain only letters and be in a 1-35 characters range',
      });
      this.closePopupModal();
      return;
    }
    if (lastNameInvalid) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage: 'Last name should contain only letters and be in a 1-35 characters range',
      });
      this.closePopupModal();
      return;
    }
    if (emailInvalid) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage: 'Invalid email address. Please try again.',
      });
      this.closePopupModal();
      return;
    }
    if (passwordInvalid) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage:
          'Password should contain between 8 and 15 characters and must contain at least an uppercase letter, a lowercase letter, a number and a special character',
      });
      this.closePopupModal();
      return;
    }
    if (repeatedPasswordInvalid) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage: 'Password and confirmation passwords do not match',
      });
      this.closePopupModal();
      return;
    }
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      device_id: DeviceInfo.getDeviceId() === 'unknown' ? `${Math.random()}asd` : DeviceInfo.getDeviceId(),
    };
    this.setState({ isLoadingModalVisible: true });
    this.props.signUp(data, (e) => {
      if (e) {
        this.setState({
          isLoadingModalVisible: false,
          isErrorModalVisible: true,
          errorMessage: e.message,
        });
        this.closePopupModal();
      } else {
        this.setState({ isLoadingModalVisible: false });
        const navigationAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'Main' })],
        });
        this.props.navigation.dispatch(navigationAction);
      }
    });
  };
  closePopupModal = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      this.setState({ errorMessage: '', isErrorModalVisible: false });
    }, 4000);
  };
  toggleTermsOfUseCheckbox = () => {
    this.setState((prevState) => ({ areTermsAccepted: !prevState.areTermsAccepted }));
  };
  render() {
    const { currentLanguage } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <LoadingModal
          visible={this.state.isLoadingModalVisible}
          closeModal={() => this.changeModalState('isLoadingModalVisible', false)}
        />
        <ValidationError message={this.state.errorMessage} isVisible={this.state.isErrorModalVisible} isBottom />
        <SignUpForm
          clearField={this.clearField}
          inputs={inputs}
          goBack={this.goBack}
          onSubmit={this.onSignUpPress}
          isInfoModalOpen={this.state.isInfoModalVisible}
          openInfoModal={() => this.changeModalState('isInfoModalVisible', true)}
          closeInfoModal={() => this.changeModalState('isInfoModalVisible', false)}
          onCheckPasswordEditingEnd={this.onCheckPasswordEditingEnd}
          areTermsAccepted={this.state.areTermsAccepted}
          toggleTermsOfUseCheckbox={this.toggleTermsOfUseCheckbox}
          currentLanguage={currentLanguage}
          onTermsOfUsePress={this.onTermsOfUsePress}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = { signUp };

const reduxFormWrapper = reduxForm({
  form: 'signUpForm', // a unique identifier for this form
});

// Decorate with connect to read form values
const selector = formValueSelector('signUpForm'); // <-- same as form name
const selectorWrapper = connect(
  (state) => {
    // can select values individually
    const firstName = selector(state, 'firstName');
    const lastName = selector(state, 'lastName');
    const email = selector(state, 'email');
    const password = selector(state, 'password');
    const passwordCheck = selector(state, 'passwordCheck');
    return {
      firstName,
      lastName,
      email,
      password,
      passwordCheck,
      currentLanguage: state.i18nState.lang,
    };
  },
  mapDispatchToProps,
);

export default selectorWrapper(reduxFormWrapper(SignUpContainer));
