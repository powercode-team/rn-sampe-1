import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { translateTitle } from './../translations/navigation';

import { deactivateAccount } from '../actions/user';

import HeaderBackButton from '../components/HeaderBackButton/HeaderBackButton';
import DeactivateAccount from '../components/DeactivateAccount/DeactivateAccount';
import ValidationError from '../components/ValidationError/ValidationError';
import LoadingModal from './../components/LoadingModal/LoadingModal';
import DeactivateModal from '../components/DeactivateAccount/DeactivateModal/DeactivateModal';

import HeaderTitle from '../components/HeaderTitle/HeaderTitle';

class DeactivateAccountContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    return {
      headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
      headerTitle: <HeaderTitle text={translateTitle(lang, 'Delete account')} />,
      headerRight: <View />,
    };
  };

  static propTypes = {
    navigation: propTypes.object.isRequired,
    deactivateAccount: propTypes.func.isRequired,
    lang: propTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  state = {
    passValue: '',
    isLoadingModalVisible: false,
    isPopupVisible: false,
    popupMessage: '',
    isConfirmModalOpen: false,
    isPassVisible: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({ lang: this.props.lang });
  }

  onChangeText = (value) => {
    this.setState({ passValue: value });
  };

  onCloseLoadingModal = () => this.setState({ isLoadingModalVisible: false });

  focusInput = () => {
    this.inputRef.current.focus();
  };

  submit = () => {
    this.setState({ isConfirmModalOpen: false, isLoadingModalVisible: true });
    this.props.deactivateAccount(this.state.passValue, this.submitCallback);
  };

  submitCallback = (error) => {
    setTimeout(() => this.setState({ isLoadingModalVisible: false }), 400);
    if (error) {
      setTimeout(
        () =>
          this.setState({
            isPopupVisible: true,
            popupMessage: error.msg || error.message || error,
          }),
        800,
      );
      this.closePopup();
    } else {
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'Auth' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  };

  openConfirmModal = () => {
    if (this.state.passValue.length) {
      Keyboard.dismiss();
      this.setState({ isConfirmModalOpen: true });
    } else {
      this.setState({ isPopupVisible: true, popupMessage: 'Please enter password' });
      this.closePopup();
    }
  };

  closeConfirmModal = () => this.setState({ isConfirmModalOpen: false });

  closePopup = () => {
    setTimeout(() => this.setState({ isPopupVisible: false, popupMessage: '' }), 1800);
  };

  changePassVisible = () => {
    this.setState({ isPassVisible: !this.state.isPassVisible });
  };

  render() {
    // console.log('STATE', this.state);
    const { passValue, isLoadingModalVisible, isPopupVisible, popupMessage, isConfirmModalOpen } = this.state;

    return (
      <React.Fragment>
        <DeactivateAccount
          passValue={passValue}
          onChangePass={this.onChangeText}
          changePassVisible={this.changePassVisible}
          inputRef={this.inputRef}
          isPassVisible={!this.state.isPassVisible}
          focusInput={this.focusInput}
          openConfirmModal={this.openConfirmModal}
        />
        <LoadingModal visible={isLoadingModalVisible} closeModal={this.onCloseLoadingModal} />
        <ValidationError isVisible={isPopupVisible} message={popupMessage} isBottom />
        <DeactivateModal visible={isConfirmModalOpen} closeModal={this.closeConfirmModal} submit={this.submit} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  deactivateAccount,
};

const mapStateToProps = (state) => ({
  lang: state.i18nState.lang,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeactivateAccountContainer);
