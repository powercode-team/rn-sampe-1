import React from 'react';
import propTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native';

import styles from './styles';

const SubstituteSearchInput = ({ onChange, value, setFocus, inputRef }, { t }) => (
  <TouchableWithoutFeedback onPress={setFocus}>
    <View style={styles.wrapperInput}>
      <Text style={styles.iconInput}>{'\ue815'}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        underlineColorAndroid="transparent"
        ref={inputRef}
        placeholder={t('Search substitute')}
      />
    </View>
  </TouchableWithoutFeedback>
);

SubstituteSearchInput.propTypes = {
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  setFocus: propTypes.func.isRequired,
  inputRef: propTypes.object.isRequired,
};

SubstituteSearchInput.contextTypes = {
  t: propTypes.func.isRequired,
};

export default SubstituteSearchInput;
