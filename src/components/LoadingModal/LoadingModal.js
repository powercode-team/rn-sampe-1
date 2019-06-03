import React from 'react';
import { View, Modal, Text, ActivityIndicator } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

export const LoadingModal = ({ visible, closeModal }, { t }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={closeModal}>
    <View style={styles.backgroundView}>
      <View style={styles.modalView}>
        <ActivityIndicator size="large" color="#299187" />
        <Text style={styles.text}>{t('Please wait')}...</Text>
      </View>
    </View>
  </Modal>
);

LoadingModal.propTypes = {
  visible: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
};

LoadingModal.contextTypes = {
  t: propTypes.func.isRequired,
};

export default LoadingModal;
