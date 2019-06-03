import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import StaticInput from './../StaticInput/StaticInput';
import styles from './styles';

export const NewPassword = ({ email }, { t }) => (
  <View style={styles.passwordRecoveryMainContainer}>
    <View style={styles.header}>
      <Text style={styles.textMessage}>{t('A new password has \n been sent to your E-Mail')}</Text>
    </View>
    <StaticInput label="E-Mail" value={email} containerStyles={styles.inputContainer} />
  </View>
);

NewPassword.propTypes = {
  email: propTypes.string.isRequired,
};
NewPassword.contextTypes = {
  t: propTypes.func.isRequired,
};
export default NewPassword;
