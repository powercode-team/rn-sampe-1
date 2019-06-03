import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import _ from 'lodash';

import { changePassword } from '../actions/user';
import { validatePassword } from '../utils/validators';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import LoadingModal from './../components/LoadingModal/LoadingModal';
// import ErrorModal from '../components/ErrorModal/ErrorModal';
import ValidationError from '../components/ValidationError/ValidationError';

class ChangePasswordContainer extends Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    changePassword: propTypes.func.isRequired,
    langX: propTypes.string.isRequired,
  };

  state = {
    password: '',
    newPassword: '',
    confirmPassword: '',
    isErrorModalVisible: false,
    // errorTitle: 'Error!',
    errorMessage: '',
    isCurrentPassVisible: true,
    isNewPassVisible: true,
    isConfirmPassVisible: true,
    isLoadingModalVisible: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({ onSave: this.onSave, lang: this.props.langX });
  }
  componentDidUpdate(prevProps) {
    if (this.props.langX !== prevProps.langX) {
      // console.log('now language is', this.props.langX);
      this.props.navigation.setParams({ lang: this.props.langX });
    }
  }
  onSave = () => {
    const { password, newPassword, confirmPassword } = this.state;
    if (password.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
      this.setState({
        isErrorModalVisible: true,
        errorMessage: 'Please fill in all the mandatory fields',
      });
      this.closePopupModal();
      return;
    }
    Keyboard.dismiss();
    const isNewPasswordInvalid = validatePassword(newPassword);
    if (isNewPasswordInvalid) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage:
          'Password should contain between 8 and 15 characters and must contain at least an uppercase letter, a lowercase letter, a number and a special character',
      });
      this.closePopupModal();
      return;
    }
    if (newPassword !== confirmPassword) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage: 'Password and confirmation passwords do not match',
      });
      this.closePopupModal();
      return;
    }
    if (password === newPassword) {
      this.setState({
        isErrorModalVisible: true,
        errorMessage: 'New password should be different from the current password',
      });
      this.closePopupModal();
      return;
    }
    this.changeModalState('isLoadingModalVisible', true);
    this.props.changePassword({ current_password: password, apply_password: newPassword }, (e) => {
      if (e) {
        setTimeout(() => {
          this.setState({
            isLoadingModalVisible: false,
            isErrorModalVisible: true,
            errorMessage: e.msg || e.message,
          });
        }, 400);
      } else {
        this.setState({
          isLoadingModalVisible: false,
          isErrorModalVisible: true,
          errorMessage: 'Success!\nPassword has been changed successfully',
        });
        this.closePopupModal(true);
      }
    });
  };
  onErrorModalClose = () => {
    this.changeModalState('isErrorModalVisible', false);
    this.throttledReturn();
  };
  changePassVisible = (e) => {
    if (e === 'current') {
      this.setState({ isCurrentPassVisible: !this.state.isCurrentPassVisible });
    } else if (e === 'new') {
      this.setState({ isNewPassVisible: !this.state.isNewPassVisible });
    } else if (e === 'confirm') {
      this.setState({ isConfirmPassVisible: !this.state.isConfirmPassVisible });
    }
  };
  closePopupModal = (shouldGoBack) => {
    Keyboard.dismiss();
    if (shouldGoBack) {
      setTimeout(() => {
        this.setState({ errorMessage: '', isErrorModalVisible: false });
        this.props.navigation.goBack();
      }, 1500);
    } else {
      setTimeout(() => {
        this.setState({ errorMessage: '', isErrorModalVisible: false });
      }, 4000);
    }
  };
  clearForm = (fieldName) => {
    this.setState({ [fieldName]: '' });
  };
  handleChange = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };
  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, {
    trailing: false,
  });
  throttledReturn = _.throttle(this.props.navigation.goBack, 300, {
    trailing: false,
  });
  changeModalState = (name, state) => {
    this.setState({ [name]: state });
    this.closePopupModal();
  };
  goBack = () => {
    this.throttledReturn();
  };

  render() {
    return (
      <React.Fragment>
        <LoadingModal
          visible={this.state.isLoadingModalVisible}
          closeModal={() => this.changeModalState('isErrorModalVisible', false)}
        />
        <ValidationError isVisible={this.state.isErrorModalVisible} message={this.state.errorMessage} isBottom />
        <ChangePassword
          password={this.state.password}
          goBack={this.goBack}
          onSave={this.onSave}
          newPassword={this.state.newPassword}
          confirmPassword={this.state.confirmPassword}
          clearForm={this.clearForm}
          handleChange={this.handleChange}
          isCurrentPassVisible={this.state.isCurrentPassVisible}
          isNewPassVisible={this.state.isNewPassVisible}
          isConfirmPassVisible={this.state.isConfirmPassVisible}
          changePassVisible={this.changePassVisible}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { changePassword };

const mapStateToProps = (state) => ({
  langX: state.i18nState.lang,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordContainer);
