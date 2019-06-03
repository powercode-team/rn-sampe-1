import React from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

export const DeactivateModal = ({ visible, closeModal, submit }, { t }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={closeModal}>
    <View style={styles.backgroundView}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{t('Are you sure You want to delete your account?')}</Text>
        <Text style={styles.description}>
          {t('Deleting Your account will completely remove you from the platform. You can re-create a new account anytime.')}
        </Text>
        <View style={styles.wrapperButtons}>
          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.buttons}>{t('Cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={submit}>
            <Text style={styles.buttons}>{t('Ok, delete now')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

DeactivateModal.propTypes = {
  visible: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  submit: propTypes.func.isRequired,
};
DeactivateModal.contextTypes = {
  t: propTypes.func.isRequired,
};
export default DeactivateModal;
