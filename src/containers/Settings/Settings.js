import React, { Component } from 'react';
import { Linking, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import propTypes from 'prop-types';
import _ from 'lodash';

import { logout, setLanguage } from '../../actions/auth';
import { changePublicStatus, changeVacationModeStatus } from '../../actions/user';
import { socketDisconnect } from '../../actions/socketConnection';

import { getUserVacationStatus, getCurrentSubstituteEmail, selectMySubstituteStatus } from '../../selectors/user';

import Settings from '../../components/Settings/Settings';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import ValidationError from '../../components/ValidationError/ValidationError';
import SelectModal from '../../components/Profile/SelectModal/SelectModal';
import { langs } from '../../translations/languages';

import { detectInitialLang } from '../../utils/storage';

import { colors } from '../../styles/base';

class SettingsContainer extends Component {
  static propTypes = {
    navigation: propTypes.object,
    logout: propTypes.func.isRequired,
    isPublic: propTypes.bool.isRequired,
    changePublicStatus: propTypes.func.isRequired,
    socketDisconnect: propTypes.func.isRequired,
    lang: propTypes.string.isRequired,
    setLanguage: propTypes.func.isRequired,
    isHrMember: propTypes.bool.isRequired,
    isInVacation: propTypes.bool.isRequired,
    substituteEmail: propTypes.string.isRequired,
    changeVacationModeStatus: propTypes.func.isRequired,
    mySubstituteStatus: propTypes.bool.isRequired,
  };

  static contextTypes = {
    t: propTypes.func.isRequired,
  };

  state = {
    isLoadingModalVisible: false,
    isErrorModalVisible: false,
    errorMessage: 'Something went wrong',
    isLogoutModalVisible: false,
    isLangModalVisible: false,
    activeLangName: '',
    isVacationModeModalVisible: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({ lang: this.props.lang });
    this.getActiveLangName();
  }

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.props.navigation.setParams({ lang: this.props.lang });
    }
  }

  onPublicStatusChange = () => {
    this.setState({ isLoadingModalVisible: true });
    this.props.changePublicStatus(this.props.isPublic, this.callbackChangePublicStatus);
  };

  onChangeVacationStatus = (value) => {
    if (value) {
      this.throttledNavigate('SubstituteSearch');
    } else {
      this.setState({ isVacationModeModalVisible: true });
    }
  };

  onOpenLangModal = () => {
    this.setState({ isLangModalVisible: true });
  };

  onCloseLangModal = () => {
    this.setState({ isLangModalVisible: false });
  };

  onChangeLanguage = (name) => {
    const item = langs.find((o) => o.name === name);
    this.props.setLanguage(item.code, () => {
      this.onCloseLangModal();
      this.getActiveLangName();
    });
  };

  onVacationModeModalSelect = (value) => {
    if (!value || value === 'Cancel') {
      this.setState({ isVacationModeModalVisible: false });
    } else {
      this.setState({ isLoadingModalVisible: true, isVacationModeModalVisible: false });
      this.props.changeVacationModeStatus(false, null, () => {
        this.setState({ isLoadingModalVisible: false });
      });
    }
  };

  setStateLogoutModal = (e) => {
    this.setState({ isLogoutModalVisible: false });
    if (!e || e === 'Cancel') {
      this.setState({ isLogoutModalVisible: false });
    } else {
      this.changeModalState('isLoadingModalVisible', true);
      this.props.logout((err) => {
        if (err) {
          setTimeout(
            () =>
              this.setState({
                isErrorModalVisible: true,
                errorMessage: err.message || err.msg,
                isLoadingModalVisible: false,
              }),
            700,
          );
        } else {
          this.props.socketDisconnect();
          const resetAction = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Auth' })],
          });
          setTimeout(() => {
            this.setState({
              isErrorModalVisible: false,
              errorMessage: '',
              isLoadingModalVisible: false,
            });
          }, 700);
          this.props.navigation.dispatch(resetAction);
        }
      });
    }
  };

  getActiveLangName = async () => {
    const langCode = await detectInitialLang();
    const langName = langs.find((o) => o.code === langCode).name;
    this.setState({ activeLangName: langName });
  };

  closeErrorModal = () => {
    setTimeout(() => this.changeModalState('isErrorModalVisible', false), 1000);
  };

  closeLoadingModal = () => {
    setTimeout(() => this.changeModalState('isErrorModalVisible', false), 4000);
  };

  logout = () => {
    this.setState({ isLogoutModalVisible: true });
  };

  navigateToChangePassword = () => {
    this.throttledNavigate('ChangePassword');
  };

  navigateToDeactivateAccount = () => {
    this.throttledNavigate('DeactivateAccount');
  };

  navigateToTermsOfUse = () => {
    this.throttledNavigate('TermsOfUse');
  };

  openHelp = () => {
    const url = 'https://relaunch.bkc.bbraun.com/display/bbwiki900';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          // console.log(`Can't handle url: ${url}`);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, { trailing: false });

  callbackChangePublicStatus = (error) => {
    this.setState({ isLoadingModalVisible: false });
    if (error) {
      this.setState({ isErrorModalVisible: true, errorMessage: error.msg || error.message || error });
      this.closeErrorModal();
    }
  };

  changeModalState = (name, state) => {
    this.setState({ [name]: state });
  };

  render() {
    const {
      isErrorModalVisible,
      isLogoutModalVisible,
      isLoadingModalVisible,
      errorMessage,
      activeLangName,
      isLangModalVisible,
      isVacationModeModalVisible,
    } = this.state;

    const { isPublic, lang, isHrMember, isInVacation, substituteEmail, mySubstituteStatus } = this.props;
    console.log('mySubstituteStatus', mySubstituteStatus);

    const langArray = langs.map((item) => item.name);

    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <LoadingModal visible={isLoadingModalVisible} closeModal={this.closeLoadingModal} />
        <ValidationError
          message={`Logout error\n${errorMessage}`}
          isVisible={isErrorModalVisible}
          isBottom={!isLogoutModalVisible}
        />
        <Settings
          setStateLogoutModal={(e) => this.setStateLogoutModal(e)}
          isLogoutModalVisible={isLogoutModalVisible}
          onHelpPress={this.openHelp}
          onLogoutPress={this.logout}
          onChangePasswordPress={this.navigateToChangePassword}
          onDeactivateAccount={this.navigateToDeactivateAccount}
          isPublic={isPublic}
          onPublicStatusChange={this.onPublicStatusChange}
          onOpenLangModal={this.onOpenLangModal}
          activeLangName={activeLangName}
          navigateToTermsOfUse={this.navigateToTermsOfUse}
          isHrMember={isHrMember}
          onChangeVacationStatus={this.onChangeVacationStatus}
          isInVacation={isInVacation}
          substituteEmail={substituteEmail}
          mySubstituteStatus={mySubstituteStatus}
        />
        <SelectModal
          selectedOption={lang}
          options={langArray}
          title="Change language"
          visible={isLangModalVisible}
          closeModal={this.onCloseLangModal}
          onSelect={(value) => this.onChangeLanguage(value)}
        />
        <SelectModal
          options={['Yes', 'Cancel']}
          title="Are you sure you want off vacation mode"
          visible={isVacationModeModalVisible}
          closeModal={() => this.setState({ isVacationModeModalVisible: false })}
          onSelect={(value) => this.onVacationModeModalSelect(value)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
  logout,
  changePublicStatus,
  socketDisconnect,
  setLanguage,
  changeVacationModeStatus,
};

const matStateToProps = (state) => ({
  lang: state.i18nState.lang,
  isPublic: state.user.isPublic,
  isHrMember: state.user.isHr,
  isInVacation: getUserVacationStatus(state),
  substituteEmail: getCurrentSubstituteEmail(state),
  mySubstituteStatus: selectMySubstituteStatus(state),
});

export default connect(
  matStateToProps,
  mapDispatchToProps,
)(SettingsContainer);
