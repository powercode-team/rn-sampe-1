import React from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import propTypes from 'prop-types';
import { Field } from 'redux-form';
import FeatherIcon from 'react-native-vector-icons/Feather';

import InfoModal from './InfoModal';
import ActiveInput from './../../components/ActiveInput/ActiveInput';
import styles from './styles';
import { colors } from './../../styles/base';

class SignUp extends React.Component {
  state = {
    isPasswordVisible: false,
    isPasswordCheckVisible: false,
  };
  changePassVisible = (e) => {
    if (e === 'passwordCheck') {
      this.setState({ isPasswordCheckVisible: !this.state.isPasswordCheckVisible });
    } else {
      this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
    }
  };
  renderInput = (inputProps) => {
    const { name } = inputProps.input;
    const handler = () => this.props.clearField(name);
    const error = inputProps.meta.touched && inputProps.meta.error;
    const containerStyles = {
      paddingHorizontal: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: error ? 'red' : 'transparent',
      elevation: 0,
      shadowOffset: { width: 0, height: 0 },
      shadowColor: colors.background,
      shadowOpacity: 0,
    };

    return (
      <ActiveInput
        containerStyles={containerStyles}
        clearField={handler}
        changePassVisible={this.changePassVisible}
        event={inputProps.input.name}
        isPasswordVisible={this.state.isPasswordVisible}
        {...inputProps}
        autoCapitalize={name === 'email' ? 'none' : 'sentences'}
        keyboardType={name === 'email' ? 'email-address' : 'default'}
      />
    );
  };
  render() {
    const {
      closeInfoModal,
      isInfoModalOpen,
      inputs,
      onCheckPasswordEditingEnd,
      onSubmit,
      areTermsAccepted,
      toggleTermsOfUseCheckbox,
      currentLanguage,
      onTermsOfUsePress,
    } = this.props;
    const { t } = this.context;
    return (
      <View style={styles.container}>
        <InfoModal
          closeModal={closeInfoModal}
          visible={isInfoModalOpen}
          title="Information on HR-Team access"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor nibh non sem sodales scelerisque. Vestibulum sed blandit orci, vel convallis nisi. Etiam imperdiet arcu tempus, venenatis sapien sit amet, ultricies neque. Pellentesque luctus fermentum lacus in porttitor. Vestibulum pretium ipsum convallis posuere consectetur. Praesent luctus arcu euismod mi tincidunt, nec finibus libero iaculis. Nulla imperdiet eros sit amet dui tempor ultricies. Pellentesque sodales orci varius sagittis varius. Donec consectetur ultrices ultricies. Suspendisse ac dolor non sapien convallis convallis non nec mi.
            Pellentesque vel purus arcu. Vivamus maximus sed dui sit amet euismod. Fusce id quam scelerisque, imperdiet nulla ac, iaculis ligula. Phasellus ac lorem facilisis, sodales diam vulputate, interdum dui. Sed ullamcorper sapien et mauris placerat, et rhoncus tortor volutpat. Curabitur vitae erat tortor. Duis faucibus mi nisl. Etiam vitae dui sit amet nisi vehicula convallis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor nibh non sem sodales scelerisque. Vestibulum sed blandit orci, vel convallis nisi. Etiam imperdiet arcu tempus, venenatis sapien sit amet, ultricies neque. Pellentesque luctus fermentum lacus in porttitor. Vestibulum pretium ipsum convallis posuere consectetur. Praesent luctus arcu euismod mi tincidunt, nec finibus libero iaculis. Nulla imperdiet eros sit amet dui tempor ultricies. Pellentesque sodales orci varius sagittis varius. Donec consectetur ultrices ultricies. Suspendisse ac dolor non sapien convallis convallis non nec mi.
            Pellentesque vel purus arcu. Vivamus maximus sed dui sit amet euismod. Fusce id quam scelerisque, imperdiet nulla ac, iaculis ligula. Phasellus ac lorem facilisis, sodales diam vulputate, interdum dui. Sed ullamcorper sapien et mauris placerat, et rhoncus tortor volutpat. Curabitur vitae erat tortor. Duis faucibus mi nisl. Etiam vitae dui sit amet nisi vehicula convallis"
        />
        <KeyboardAvoidingView keyboardVerticalOffset={68} behavior="padding" style={styles.inputsContainer}>
          <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="interactive">
            <View style={styles.body}>
              <View>
                {inputs.map((input) => {
                  const isPassword = input.name === 'password' || input.name === 'passwordCheck';
                  let passInState = null;
                  if (input.name === 'passwordCheck') {
                    passInState = !this.state.isPasswordCheckVisible;
                  } else if (input.name === 'password') {
                    passInState = !this.state.isPasswordVisible;
                  }
                  return (
                    <Field
                      key={input.name}
                      name={input.name}
                      placeholder={t(input.placeholder)}
                      label={t(input.label)}
                      component={this.renderInput}
                      validate={input.validate}
                      isLowerCase={input.isLowerCase || false}
                      isPasswordVisible={!passInState}
                      secureTextEntry={isPassword && passInState}
                      onSubmitEditing={input.name === 'passwordCheck' ? onCheckPasswordEditingEnd : () => {}}
                    />
                  );
                })}
                <View style={styles.termsWrapper}>
                  <TouchableOpacity onPress={toggleTermsOfUseCheckbox}>
                    <View style={styles.wrapper}>
                      <View
                        style={[
                          styles.defaultChecker,
                          areTermsAccepted ? styles.checkerActive : styles.checkerNotActive,
                        ]}
                      >
                        {areTermsAccepted ? <FeatherIcon name="check" size={17} color={colors.background} /> : null}
                      </View>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.termsOfUse}>
                    <Text>
                      {t('I hereby consent to the processing of the personal data provided by me / ' +
                          'provided for the purpose of processing in the app and agree with the')}
                    </Text>
                    <Text style={styles.termsOfUseStyled} onPress={onTermsOfUsePress}>
                      {t(' data protection regulations')}
                    </Text>
                    {currentLanguage === 'de' && <Text> einverstanden</Text>}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapperNextBtn}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.secondary, colors.secondary]}
                style={[styles.nextButtonWrapper, areTermsAccepted ? {} : styles.disabledNextButton]}
              >
                <TouchableOpacity onPress={onSubmit} style={styles.opacity} activeOpacity={areTermsAccepted ? 0.7 : 1}>
                  <Text style={styles.nextButtonText}>{t('Next')}</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

SignUp.propTypes = {
  onSubmit: propTypes.func.isRequired,
  clearField: propTypes.func.isRequired,
  inputs: propTypes.arrayOf(propTypes.shape({
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    validate: propTypes.array,
  })),
  goBack: propTypes.func.isRequired,
  openInfoModal: propTypes.func.isRequired,
  closeInfoModal: propTypes.func.isRequired,
  isInfoModalOpen: propTypes.bool.isRequired,
  onCheckPasswordEditingEnd: propTypes.func.isRequired,
  areTermsAccepted: propTypes.bool.isRequired,
  toggleTermsOfUseCheckbox: propTypes.func.isRequired,
  currentLanguage: propTypes.string.isRequired,
  onTermsOfUsePress: propTypes.func.isRequired,
};
SignUp.contextTypes = {
  t: propTypes.func.isRequired,
};
export default SignUp;
