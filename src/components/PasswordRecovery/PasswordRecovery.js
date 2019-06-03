import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import { colors } from './../../styles/base';
import ActiveInput from './../../components/ActiveInput/ActiveInput';

export const PasswordRecovery = ({ email, handleEmail, onSubmit, clearForm, inputRef }, { t }) => (
  <View style={styles.passwordRecoveryMainContainer}>
    <View style={styles.header}>
      <Text style={styles.textMessage}>{t('Type in your E-Mail\nto reset your password')}</Text>
    </View>
    <ActiveInput
      inputRef={inputRef}
      clearField={clearForm}
      value={email}
      onChangeText={handleEmail}
      label={t('E-Mail address')}
      containerStyles={styles.inputContainer}
      placeholder={t('E-Mail')}
      autoCapitalize="none"
    />
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[colors.secondary, colors.secondary]}
      style={styles.loginButton}
    >
      <TouchableOpacity style={styles.touchable} onPress={onSubmit}>
        <Text style={styles.buttonText}>{t('Reset Password')}</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

PasswordRecovery.propTypes = {
  email: propTypes.string.isRequired,
  handleEmail: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  clearForm: propTypes.func.isRequired,
  inputRef: propTypes.func,
};
PasswordRecovery.contextTypes = {
  t: propTypes.func.isRequired,
};
export default PasswordRecovery;
