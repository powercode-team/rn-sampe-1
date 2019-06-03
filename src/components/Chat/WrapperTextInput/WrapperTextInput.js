import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';

import IonIcon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import { colors } from './../../../styles/base';

const WrapperTextInput = ({ onSendMessage, clearInputText, inputValue, onChangeText }) => (
  <View style={styles.wrapper}>
    <View style={styles.wrapperInput}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        multiline
      />
      {inputValue.length ? (
        <TouchableOpacity onPress={clearInputText}>
          <View style={styles.wrapperCross}>
            <IconMaterial style={styles.inputCross} name="cancel" size={18} color={colors.textLight} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
    {inputValue.length ? (
      <View style={styles.wrapperSendBtn}>
        <TouchableOpacity onPress={onSendMessage}>
          <IonIcon style={styles.iconSendBtn} name="ios-send" size={28} color={colors.background} />
        </TouchableOpacity>
      </View>
    ) : null}
  </View>
);

WrapperTextInput.propTypes = {
  onSendMessage: propTypes.func.isRequired,
  clearInputText: propTypes.func.isRequired,
  inputValue: propTypes.string.isRequired,
  onChangeText: propTypes.func.isRequired,
};

export default WrapperTextInput;
