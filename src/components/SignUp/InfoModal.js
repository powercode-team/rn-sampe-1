import React from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

export const InfoModal = ({ title, message, visible, closeModal }, { t }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={closeModal}>
    <View style={styles.backgroundView}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>{t(title)}</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.modalMessage}>{t(message)}</Text>
        </ScrollView>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.modalButtonWrapper} onPress={closeModal}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

InfoModal.propTypes = {
  title: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
};
InfoModal.contextTypes = {
  t: propTypes.func.isRequired,
};
export default InfoModal;
