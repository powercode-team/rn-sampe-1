import React from 'react';
import { View, Modal, Text } from 'react-native';
import propTypes from 'prop-types';

import CustomButton from './../../components/CustomButton';
import styles from './styles';

export const ErrorModal = ({ title, message, visible, closeModal, overrideOkClick, onOkclick }, { t }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={closeModal}>
    <View style={styles.backgroundView}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.title}>{t(title)}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.message}>{t(message)}</Text>
          <View style={styles.buttonRow}>
            <CustomButton
              onPress={overrideOkClick ? onOkclick : closeModal}
              containerStyles={styles.buttonContainer}
              buttonStyles={styles.button}
            >
              <Text style={styles.buttonText}>Ok</Text>
            </CustomButton>
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

ErrorModal.propTypes = {
  title: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  overrideOkClick: propTypes.bool,
  onOkclick: propTypes.func,
};
ErrorModal.contextTypes = {
  t: propTypes.func.isRequired,
};
export default ErrorModal;
