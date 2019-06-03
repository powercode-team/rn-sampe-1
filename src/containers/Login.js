import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import propTypes from 'prop-types';
import _ from 'lodash';

// import { getFromStorage, clear } from '../utils/storage';
import { login } from '../actions/auth';
import LoginForm from '../components/Login/Login';
// import ErrorModal from '../components/ErrorModal/ErrorModal';
import ValidationError from '../components/ValidationError/ValidationError';
import LoadingModal from '../components/LoadingModal/LoadingModal';

class LoginContainer extends Component {
  static navigationOptions = {
    header: false,
  };
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    login: propTypes.func.isRequired,
    navigation: propTypes.object,
    username: propTypes.string,
    password: propTypes.string,
    dispatch: propTypes.func.isRequired,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { submitFailed, username, password } = nextProps;
    if (!prevState.submitFailed && submitFailed && (!username || !password)) {
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
    isLoadingModalVisible: false,
  };

  // async componentDidMount() {
  // await clear();
  // const access = await getFromStorage('access_token');
  // const refresh = await getFromStorage('refresh_token');
  // console.log('ACCESS TOKEN: ', access);
  // console.log('refresh:', refresh);
  // }

  shouldComponentUpdate(prevProps, nextState) {
    if (nextState.isErrorModalVisible) this.closePopupModal();
    return true;
  }
  onPasswordEditingEnd = () => {
    if (!this.props.username || !this.props.username) return;
    this.submitHandler({ username: this.props.username, password: this.props.password });
  };
  onLoginPress = () => {
    // Keyboard.dismiss();
    this.props.handleSubmit(this.submitHandler)();
  };
  // throttle navigate function so that different instances of the same screen won't stack on top
  // of each other in case of rapid pressing of navigation buttons;
  navigateToSignUp = () => {
    this.throttledNavigate('SignUp');
  };
  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, {
    trailing: false,
  });
  navigateToMainScreen = () => {
    this.throttledNavigate('Main');
  };
  navigateToPasswordRecovery = () => {
    this.throttledNavigate('PasswordRecovery');
  };
  clearField = (fieldName) => {
    this.props.dispatch(change('loginForm', fieldName, ''));
  };
  changeModalState = (name, state) => {
    this.setState({ [name]: state });
  };
  submitHandler = ({ username, password }) => {
    Keyboard.dismiss();
    this.setState({ isLoadingModalVisible: true });
    const data = {
      login: username.trim(),
      password,
    };
    this.props.login(data, (e) => {
      if (e) {
        setTimeout(() => {
          this.setState({
            isLoadingModalVisible: false,
            isErrorModalVisible: true,
            errorMessage: e.message || e.msg || e,
          });
        }, 800);
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

  render() {
    return (
      <React.Fragment>
        <LoadingModal
          visible={this.state.isLoadingModalVisible}
          closeModal={() => this.changeModalState('isLoadingModalVisible', false)}
        />
        {/* <ErrorModal
          title={this.state.errorTitle}
          message={this.state.errorMessage}
          visible={this.state.isErrorModalVisible}
          closeModal={() => this.changeModalState('isErrorModalVisible', false)}
        /> */}
        <ValidationError isVisible={this.state.isErrorModalVisible} message={this.state.errorMessage} isBottom />
        <LoginForm
          renderInput={this.renderInput}
          onSubmit={this.onLoginPress}
          onSignUpPress={this.navigateToSignUp}
          onForgetPasswordPress={this.navigateToPasswordRecovery}
          clearField={this.clearField}
          navigateToMainScreen={this.navigateToMainScreen}
          onPasswordEditingEnd={this.onPasswordEditingEnd}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { login };

const reduxFormWrapper = reduxForm({ form: 'loginForm' });

const selector = formValueSelector('loginForm'); // <-- same as form name
const selectorWrapper = connect(
  (state) => {
    // can select values individually
    const username = selector(state, 'username');
    const password = selector(state, 'password');
    return {
      username,
      password,
    };
  },
  mapDispatchToProps,
);

export default selectorWrapper(reduxFormWrapper(LoginContainer));
