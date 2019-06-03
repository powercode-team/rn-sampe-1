import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  NativeModules,
} from 'react-native';

import propTypes from 'prop-types';
import { Field } from 'redux-form';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from './../../components/CustomTextInput';
import CustomButton from './../../components/CustomButton';
import styles from './styles';
import { required } from '../../utils/validators';
import { colors } from './../../styles/base';

const trimmerWithoutSpaces = (value) => value && value.replace(/\s/gi, '');

class Login extends React.Component {
  state = {
    isPasswordVisible: false,
  };
  changePassVisible = () => {
    this.setState({ isPasswordVisible: !this.state.isPasswordVisible });
  };
  renderInput = (inputProps) => {
    const handler = () => this.props.clearField(inputProps.input.name);
    const error = inputProps.meta.touched && inputProps.meta.error;
    const isLowerCase = inputProps.isLowerCase || false;
    const isPassword = inputProps.input.name === 'password';
    const icon = this.state.isPasswordVisible ? '\ue826' : '\ue825';
    return (
      <View style={[styles.inputWrapper, error ? { borderBottomColor: 'red' } : {}]}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{inputProps.placeholder}</Text>
          <CustomTextInput
            placeholderTextColor={colors.primaryGrey}
            inputStyle={styles.input}
            isLowerCase={isLowerCase}
            {...inputProps}
          />
        </View>
        {!isPassword ? (
          <React.Fragment>
            {inputProps.input.value && (
              <Icon onPress={handler} style={styles.clearIcon} name="cancel" size={16} color="#858585" />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {Boolean(inputProps.input.value) && (
              <Text onPress={this.changePassVisible} style={styles.icon}>
                {icon}
              </Text>
            )}
          </React.Fragment>
        )}
      </View>
    );
  };
  render() {
    const isSmallIphone =
      NativeModules.RNDeviceInfo.model === 'iPhone 5' || NativeModules.RNDeviceInfo.model === 'iPhone 5s';

    /* eslint-disable global-require */
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView scrollEnabled={isSmallIphone}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <ImageBackground
                source={require('../../../assets/login_logo_b.png')}
                style={styles.image}
                // resizeMode="stretch"
              />
              <View style={styles.body}>
                <StatusBar barStyle="light-content" />
                <View style={styles.form}>
                  {!isSmallIphone && <Text style={styles.title}>PeopleLink</Text>}
                  <Field
                    name="username"
                    placeholder={this.context.t('E-Mail address')}
                    component={this.renderInput}
                    validate={[required]}
                    format={trimmerWithoutSpaces}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <Field
                    name="password"
                    placeholder={this.context.t('Password')}
                    component={this.renderInput}
                    validate={[required]}
                    secureTextEntry={!this.state.isPasswordVisible}
                    autoCapitalize="none"
                    format={trimmerWithoutSpaces}
                    onSubmitEditing={this.props.onPasswordEditingEnd}
                  />
                  <View style={styles.loginButton}>
                    <TouchableOpacity style={styles.touchable} onPress={this.props.onSubmit}>
                      <Text style={styles.buttonText}>{this.context.t('Log in')}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.forgotPassBtn} onPress={this.props.onForgetPasswordPress}>
                    <Text style={styles.forgotPassword}>{this.context.t('Forgot password?')}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                  <CustomButton
                    containerStyles={styles.buttonContainer}
                    buttonStyles={styles.signUpButton}
                    onPress={this.props.onSignUpPress}
                  >
                    <Text style={styles.batonBottomText}>{this.context.t('Create account')}</Text>
                  </CustomButton>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  onSubmit: propTypes.func.isRequired,
  clearField: propTypes.func.isRequired,
  onSignUpPress: propTypes.func.isRequired,
  onForgetPasswordPress: propTypes.func.isRequired,
  onPasswordEditingEnd: propTypes.func.isRequired,
};

Login.contextTypes = {
  t: propTypes.func.isRequired,
};

export default Login;
