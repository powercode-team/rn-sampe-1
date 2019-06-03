import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CustomTextInput from './../CustomTextInput';
import styles from './styles';
import { colors } from './../../styles/base';

export const ActiveInput = ({
  clearField,
  containerStyles,
  value,
  label,
  inputStyle,
  labelStyles,
  changePassVisible,
  isPasswordVisible,
  password,
  event,
  ...inputProps
}) => {
  // if input is wrapped by redux form Field component - check if is active to display clear Icon
  // else, if it is used as simple text input without wrappers - check only value
  const simpleCondition = Boolean(value || (inputProps.input && inputProps.input.value));
  const reduxFormCondition =
    inputProps.meta && inputProps.meta.active && Boolean(value || (inputProps.input && inputProps.input.value));
  const condition = inputProps.meta ? reduxFormCondition : simpleCondition;
  let isPassword;
  if (inputProps.input !== undefined) {
    isPassword = inputProps.input.name === 'password' || inputProps.input.name === 'passwordCheck';
  } else {
    isPassword = false;
  }

  if (password !== undefined && password) {
    isPassword = true;
  }
  const icon = isPasswordVisible ? '\ue826' : '\ue825';

  let inputRef;

  const vv = inputProps.input !== undefined ? Boolean(inputProps.input.value) : Boolean(value);
  return (
    <View style={[styles.inputWrapper, containerStyles]}>
      <TouchableWithoutFeedback onPress={() => inputRef && inputRef.focus()}>
        <View style={styles.wrapperLabel}>
          <Text style={styles.label}>{label || inputProps.label}</Text>
        </View>
      </TouchableWithoutFeedback>
      <CustomTextInput
        placeholderTextColor={inputProps.placeholderTextColor || colors.textLight}
        value={value}
        inputStyle={[styles.input, inputStyle]}
        customRef={inputProps.inputRef}
        inputRef={(el) => {
          inputRef = el;
        }}
        {...inputProps}
      />

      {!isPassword ? (
        <React.Fragment>
          {condition && (
            <TouchableWithoutFeedback onPress={clearField}>
              <View style={styles.wrapperClearIcon}>
                <Icon name="cancel" size={16} color="#858585" />
              </View>
            </TouchableWithoutFeedback>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {vv && (
            <Text onPress={() => changePassVisible(event)} style={styles.icon}>
              {icon}
            </Text>
          )}
        </React.Fragment>
      )}
    </View>
  );
};

ActiveInput.propTypes = {
  clearField: propTypes.func.isRequired,
  value: propTypes.string,
  label: propTypes.string,
  isPasswordVisible: propTypes.bool,
  event: propTypes.string,
  password: propTypes.bool,
  changePassVisible: propTypes.oneOfType([propTypes.func.isRequired, propTypes.undefined]),
  containerStyles: propTypes.oneOfType([propTypes.number, propTypes.object, propTypes.array]),
  inputStyle: propTypes.oneOfType([propTypes.number, propTypes.object, propTypes.array]),
  labelStyles: propTypes.oneOfType([propTypes.number, propTypes.object, propTypes.array]),
};

export default ActiveInput;
