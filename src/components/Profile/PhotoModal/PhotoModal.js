import React from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import propTypes from 'prop-types';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export const PhotoModal = ({ visible, closeModal, openCamera, openImageLibrary, deletePhoto }, { t }) => (
  <Modal animationType="fade" transparent visible={visible} onRequestClose={closeModal}>
    <View style={styles.backgroundView}>
      <TouchableHighlight style={styles.background} onPress={closeModal} underlayColor="transparent">
        <View style={styles.background} />
      </TouchableHighlight>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('Edit photo')}</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={openImageLibrary}>
            <View style={styles.button}>
              <MaterialIcon name="image" size={20} style={styles.icon} />
              <Text style={styles.buttonName}>{t('Your photos')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper} onPress={openCamera}>
            <View style={styles.button}>
              <MaterialIcon name="camera-alt" size={20} style={styles.icon} />
              <Text style={styles.buttonName}>{t('Take photo')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonWrapper} onPress={deletePhoto}>
            <View style={styles.button}>
              <Text style={styles.icon}>{'\ue824'}</Text>
              <Text style={styles.buttonName}>{t('Delete photo')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

PhotoModal.propTypes = {
  visible: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  openCamera: propTypes.func.isRequired,
  openImageLibrary: propTypes.func.isRequired,
  deletePhoto: propTypes.func.isRequired,
};
PhotoModal.contextTypes = {
  t: propTypes.func.isRequired,
};
export default PhotoModal;
