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

import styles from './styles';
import { colors } from './../../../styles/base';

class RejectionModal extends React.Component {
  static propTypes = {
    visible: propTypes.bool.isRequired,
    closeModal: propTypes.func.isRequired,
    onSendPress: propTypes.func.isRequired,
  };
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  state = {
    icons: [
      {
        text: 'Not interested',
        iconName: '\ue811',
        iconNameActive: '\ue810',
      },
      {
        text: 'Time',
        iconName: '\ue81d',
        iconNameActive: '\ue81c',
      },
      {
        text: 'Contract type',
        iconName: '\ue80b',
        iconNameActive: '\ue80a',
      },
      {
        text: 'Location',
        iconName: '\ue80f',
        iconNameActive: '\ue80e',
      },
      {
        text: 'Description',
        iconName: '\ue80d',
        iconNameActive: '\ue80c',
      },
    ],
    activeItems: [],
    comment: '',
  };
  onIconPress = (reason) => {
    this.setState((prevState) => {
      const copy = [...prevState.activeItems];
      if (copy.includes(reason)) return { activeItems: copy.filter((item) => item !== reason) };
      return { activeItems: [...copy, reason] };
    });
  };
  onChange = (comment) => {
    this.setState({ comment });
  };
  onSendPress = () => {
    const reasons = {
      is_not_interested: this.state.activeItems.includes('Not interested'),
      is_contract_type: this.state.activeItems.includes('Contract type'),
      is_description: this.state.activeItems.includes('Description'),
      is_location: this.state.activeItems.includes('Location'),
      is_time: this.state.activeItems.includes('Time'),
    };
    this.props.onSendPress(reasons, this.state.comment);
  };
  render() {
    const { visible, closeModal } = this.props;
    return (
      <Modal animationType="fade" transparent visible={visible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.backgroundView}>
            <KeyboardAvoidingView behavior="padding">
              <View style={styles.modalView}>
                <View style={styles.iconsContainer}>
                  <Text style={styles.headerTitle}>{this.context.t('Feedback')}</Text>
                  <Text style={styles.headerDescription}>
                    {this.context.t('Please give feedback why you rejected the offer and leave a comment.')}
                  </Text>
                  <View style={styles.iconsWrapper}>
                    {this.state.icons.map((iconObj) => {
                      const isActive = this.state.activeItems.includes(iconObj.text);
                      const name = isActive ? iconObj.iconNameActive : iconObj.iconName;
                      const color = isActive ? colors.secondary : colors.text;
                      return (
                        <TouchableOpacity
                          key={iconObj.text}
                          style={styles.iconButton}
                          onPress={() => this.onIconPress(iconObj.text)}
                        >
                          <View style={styles.iconView}>
                            <Text style={[styles.icon, { color }]}>{`${name}`}</Text>
                            <Text style={[styles.iconName, { color }]}>{this.context.t(iconObj.text)}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={styles.descriptionWrapper}>
                    <Text style={[styles.headerDescription, { paddingHorizontal: 0, color: colors.primary }]}>
                      {this.context.t('Leave a comment')}
                    </Text>
                    <TextInput
                      style={styles.commentInput}
                      value={this.state.comment}
                      onChangeText={this.onChange}
                      multiline
                      autoCapitalize="sentences"
                      underlineColorAndroid="transparent"
                      numberOfLines={8}
                    />
                  </View>
                  <View style={styles.decisionButtons}>
                    <TouchableOpacity onPress={closeModal}>
                      <View style={styles.buttonView}>
                        <Text style={styles.cancelText}>{this.context.t('Cancel')}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onSendPress}>
                      <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>{this.context.t('Send')}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default RejectionModal;
