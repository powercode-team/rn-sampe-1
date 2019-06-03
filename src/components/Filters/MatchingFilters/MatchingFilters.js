import React from 'react';
import { View, Text, TouchableWithoutFeedback, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import SelectableRow from './../SelectableRow/SelectableRow';
import { colors } from './../../../styles/base';

const MatchingFilters = (
  { inputValue, onInputValueChange, focusInput, inputRef, seniorities, clearInput, onCheckboxPress },
  { t },
) => (
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{t('Career level')}</Text>
      <View>
        <TouchableWithoutFeedback onPress={focusInput}>
          <View style={styles.wrapperInput}>
            <Text style={styles.iconInput}>{'\ue815'}</Text>
            <TextInput
              style={styles.input}
              onChangeText={onInputValueChange}
              value={inputValue}
              underlineColorAndroid="transparent"
              ref={inputRef}
              placeholder={t('Filter by seniority...')}
            />
          </View>
        </TouchableWithoutFeedback>
        {inputValue.length ? (
          <View style={styles.wrapperClearIconContainer}>
            <TouchableOpacity onPress={clearInput}>
              <View style={styles.wrapperClearIcon}>
                <Icon name="cancel" size={16} color={colors.textLight} />
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <ScrollView contentContainerStyle={styles.scrollableContainer}>
        {seniorities.map((item) => (
          <SelectableRow
            key={String(item.seniority_level_id)}
            value={item.seniority_level_name}
            isActive={item.isActive}
            onPress={() => onCheckboxPress(item.seniority_level_name, !item.isActive)}
          />
        ))}
      </ScrollView>
    </View>
  </View>
);

MatchingFilters.propTypes = {
  seniorities: propTypes.array.isRequired,
  inputValue: propTypes.string,
  onInputValueChange: propTypes.func.isRequired,
  focusInput: propTypes.func.isRequired,
  inputRef: propTypes.object.isRequired,
  clearInput: propTypes.func.isRequired,
  onCheckboxPress: propTypes.func.isRequired,
};
MatchingFilters.contextTypes = {
  t: propTypes.func.isRequired,
};
export default MatchingFilters;
