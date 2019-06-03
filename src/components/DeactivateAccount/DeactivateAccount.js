import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import propTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import { colors } from './../../styles/base';

const DeactivateAccount = (
  { passValue, onChangePass, inputRef, focusInput, openConfirmModal, changePassVisible, isPassVisible },
  { t },
) => {
  const icon = !isPassVisible ? '\ue826' : '\ue825';
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperHeader}>
          <Text style={styles.headerText}>{t('Please enter your password to verify your account')}</Text>
        </View>
        <View style={styles.enterPass}>
          <View>
            <TouchableWithoutFeedback onPress={focusInput}>
              <View style={styles.wrapperInput}>
                <TextInput
                  style={[styles.input, styles.placeholder]}
                  onChangeText={onChangePass}
                  value={passValue}
                  underlineColorAndroid="transparent"
                  secureTextEntry={isPassVisible}
                  ref={inputRef}
                  placeholder={t('Password')}
                />
              </View>
            </TouchableWithoutFeedback>
            {passValue.length ? (
              <View style={styles.wrapperClearIconContainer}>
                <TouchableOpacity onPress={changePassVisible}>
                  <View style={styles.wrapperClearIcon}>
                    <Text style={styles.icon}>{icon}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.secondary, colors.secondary]}
            style={styles.loginButton}
          >
            <TouchableOpacity style={styles.touchable} onPress={openConfirmModal}>
              <Text style={styles.buttonText}>{t('Delete account')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

DeactivateAccount.propTypes = {
  passValue: propTypes.string.isRequired,
  onChangePass: propTypes.func.isRequired,
  inputRef: propTypes.object,
  focusInput: propTypes.func.isRequired,
  openConfirmModal: propTypes.func.isRequired,
  changePassVisible: propTypes.func.isRequired,
  isPassVisible: propTypes.bool,
};

DeactivateAccount.contextTypes = {
  t: propTypes.func.isRequired,
};
export default DeactivateAccount;
