import React from 'react';
import { View } from 'react-native';
import propTypes from 'prop-types';
import ActiveInput from './../ActiveInput/ActiveInput';

import styles from './styles';
import { colors } from './../../styles/base';

export const ChangePassword = (
  {
    password,
    newPassword,
    confirmPassword,
    clearForm,
    handleChange,
    isCurrentPassVisible,
    isNewPassVisible,
    isConfirmPassVisible,
    changePassVisible,
  },
  { t },
) => (
  <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 15 }}>
    <ActiveInput
      containerStyles={styles.inputContainer}
      clearField={() => clearForm('password')}
      value={password}
      onChangeText={(val) => handleChange('password', val)}
      label={t('Current password')}
      placeholder={t('Current password')}
      password
      isPasswordVisible={!isCurrentPassVisible}
      secureTextEntry={isCurrentPassVisible}
      changePassVisible={() => changePassVisible('current')}
    />
    <ActiveInput
      containerStyles={styles.inputContainer}
      clearField={() => clearForm('newPassword')}
      value={newPassword}
      onChangeText={(val) => handleChange('newPassword', val)}
      label={t('New password')}
      placeholder={t('New password')}
      password
      isPasswordVisible={!isNewPassVisible}
      secureTextEntry={isNewPassVisible}
      changePassVisible={() => changePassVisible('new')}
    />
    <ActiveInput
      containerStyles={styles.inputContainer}
      clearField={() => clearForm('confirmPassword')}
      value={confirmPassword}
      onChangeText={(val) => handleChange('confirmPassword', val)}
      label={t('Confirm password')}
      placeholder={t('Confirm password')}
      password
      isPasswordVisible={!isConfirmPassVisible}
      secureTextEntry={isConfirmPassVisible}
      changePassVisible={() => changePassVisible('confirm')}
    />
  </View>
);

ChangePassword.propTypes = {
  clearForm: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  confirmPassword: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  newPassword: propTypes.string.isRequired,
  isCurrentPassVisible: propTypes.bool,
  isNewPassVisible: propTypes.bool,
  isConfirmPassVisible: propTypes.bool,
  changePassVisible: propTypes.func.isRequired,
};
ChangePassword.contextTypes = {
  t: propTypes.func.isRequired,
};

export default ChangePassword;
