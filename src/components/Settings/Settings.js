import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import propTypes from 'prop-types';
import SelectModal from '../Profile/SelectModal/SelectModal';

import styles from './styles';
import { colors } from './../../styles/base';

const Settings = (
  {
    onChangePasswordPress,
    onHelpPress,
    onLogoutPress,
    isLogoutModalVisible,
    setStateLogoutModal,
    onDeactivateAccount,
    isPublic,
    onPublicStatusChange,
    onOpenLangModal,
    activeLangName,
    navigateToTermsOfUse,
    isHrMember,
    isInVacation,
    onChangeVacationStatus,
    substituteEmail,
    mySubstituteStatus,
  },
  { t },
) => (
  <ScrollView>
    <View style={styles.body}>
      <TouchableOpacity style={styles.buttonWrapper} onPress={onChangePasswordPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('Change password')}</Text>
          <Icon name="ios-arrow-forward" size={25} color={colors.textLight} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper} onPress={onHelpPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('Help and support')}</Text>
          <Icon name="ios-arrow-forward" size={25} color={colors.textLight} />
        </View>
      </TouchableOpacity>
      <View style={styles.buttonWrapper}>
        <View style={styles.switchButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{t('Private profile')}</Text>
            <Switch value={!isPublic} onValueChange={onPublicStatusChange} />
          </View>
          <Text style={styles.description}>
            {t('When your account is private, people will only see your skills. All other information ' +
                'will not be visible. Your location preferences will still be considered during matching.')}
          </Text>
        </View>
      </View>

      {isHrMember && (
        <View style={styles.buttonWrapper}>
          <View style={styles.switchButton}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{t('Vacation mode')}</Text>
              <Switch value={isInVacation} onValueChange={onChangeVacationStatus} disabled={mySubstituteStatus} />
            </View>
            <Text style={styles.description}>
              {t('If you go on vacation, please toggle this mode on to set a substitute for all your job postings and chats')}
            </Text>
            {isInVacation && (
              <View style={styles.wrapperSubstitute}>
                <Text style={styles.substituteTitle}>{t('HR Substitute')}</Text>
                <Text style={styles.substituteEmail}>{substituteEmail}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.buttonWrapper} onPress={onOpenLangModal}>
        <View style={[styles.button, styles.languageRow]}>
          <Text style={styles.buttonText}>{t('Change language')}:</Text>
          <Text style={styles.boldText}>{t(activeLangName)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper} onPress={onDeactivateAccount}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('Delete account')}</Text>
          <Icon name="ios-arrow-forward" size={25} color={colors.textLight} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper} onPress={navigateToTermsOfUse}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('Terms of Use & Privacy')}</Text>
          <Icon name="ios-arrow-forward" size={25} color={colors.textLight} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonWrapper} onPress={onLogoutPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{t('Logout')}</Text>
          <Icon name="ios-arrow-forward" size={25} color={colors.textLight} />
        </View>
      </TouchableOpacity>
    </View>
    <SelectModal
      options={['Logout', 'Cancel']}
      title="Are you sure you want to log out?"
      visible={isLogoutModalVisible}
      closeModal={() => setStateLogoutModal(false)}
      onSelect={(value) => setStateLogoutModal(value)}
    />
  </ScrollView>
);

Settings.propTypes = {
  onOpenLangModal: propTypes.func.isRequired,
  onChangePasswordPress: propTypes.func.isRequired,
  onHelpPress: propTypes.func.isRequired,
  onLogoutPress: propTypes.func.isRequired,
  setStateLogoutModal: propTypes.func.isRequired,
  isLogoutModalVisible: propTypes.bool,
  onDeactivateAccount: propTypes.func.isRequired,
  isPublic: propTypes.bool.isRequired,
  onPublicStatusChange: propTypes.func.isRequired,
  activeLangName: propTypes.string.isRequired,
  navigateToTermsOfUse: propTypes.func.isRequired,
  isHrMember: propTypes.bool.isRequired,
  isInVacation: propTypes.bool.isRequired,
  onChangeVacationStatus: propTypes.func.isRequired,
  substituteEmail: propTypes.string.isRequired,
  mySubstituteStatus: propTypes.bool.isRequired,
};

Settings.contextTypes = {
  t: propTypes.func.isRequired,
};

export default Settings;
