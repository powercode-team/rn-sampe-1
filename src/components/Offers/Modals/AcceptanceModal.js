import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import propTypes from 'prop-types';

import ValidationError from '../../ValidationError/ValidationError';

import styles from './styles';

class AcceptanceModal extends React.Component {
  state = {
    comment: `${this.context.t('Thanks for your interest in')} ${this.props.offerName}`,
  };

  onChange = (comment) => {
    this.setState({ comment });
  };

  render() {
    const { visible, closeModal, onSendPress, onCancelPress, isErrorModalVisible, errorMessage } = this.props;
    return (
      <Modal animationType="fade" transparent visible={visible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.backgroundView}>
            <ValidationError isVisible={isErrorModalVisible} message={errorMessage} isBottom />
            <KeyboardAvoidingView keyboardVerticalOffset={65} behavior="padding">
              <View style={styles.acceptanceModalView}>
                <Text style={styles.title}>{this.context.t('Send a message')}</Text>
                <TextInput
                  style={styles.commentInput}
                  value={this.state.comment}
                  onChangeText={this.onChange}
                  multiline
                  autoCapitalize="sentences"
                  underlineColorAndroid="transparent"
                  numberOfLines={5}
                />
                <View style={styles.decisionButtons}>
                  <TouchableOpacity onPress={onCancelPress}>
                    <View style={styles.buttonView}>
                      <Text style={styles.cancelText}>{this.context.t('Cancel')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onSendPress(this.state.comment)}>
                    <View style={styles.buttonView}>
                      <Text style={styles.buttonText}>{this.context.t('Send')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

AcceptanceModal.propTypes = {
  visible: propTypes.bool.isRequired,
  closeModal: propTypes.func.isRequired,
  onSendPress: propTypes.func.isRequired,
  onCancelPress: propTypes.func.isRequired,
  isErrorModalVisible: propTypes.bool.isRequired,
  errorMessage: propTypes.string.isRequired,
  offerName: propTypes.string.isRequired,
};
AcceptanceModal.contextTypes = {
  t: propTypes.func.isRequired,
};
export default AcceptanceModal;
