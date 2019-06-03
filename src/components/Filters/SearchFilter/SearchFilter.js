import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectableRow from '../SelectableRow/SelectableRow';
import styles from './styles';
import { colors } from './../../../styles/base';

const SearchFilter = (
  {
    locations,
    accounts,
    onLocationSelect,
    onAccountSelect,
    focusInput,
    onChangePass,
    inputRef,
    passValue,
    clearInput,
    currentTab,
    showAccountsFilter,
    isArchive,
  },
  { t },
) => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollableContainer}>
      {!isArchive && showAccountsFilter && currentTab === 'job' ? (
        <View style={styles.sectionWrapper}>
          <Text style={styles.title}>{t('Accounts')}</Text>
          {accounts.map((item) => (
            <SelectableRow
              key={String(item.id)}
              value={`${item.first_name} ${item.last_name}`}
              isActive={item.isChecked}
              onPress={() => onAccountSelect(item.id)}
            />
          ))}
        </View>
      ) : null}
      <View style={styles.sectionWrapper}>
        <Text style={styles.title}>{t('Location')}</Text>
        <View>
          <TouchableWithoutFeedback onPress={focusInput}>
            <View style={styles.wrapperInput}>
              <Text style={styles.iconInput}>{'\ue815'}</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangePass}
                value={passValue}
                underlineColorAndroid="transparent"
                ref={inputRef}
                placeholder={t('Filter by location')}
              />
            </View>
          </TouchableWithoutFeedback>
          {passValue.length ? (
            <View style={styles.wrapperClearIconContainer}>
              <TouchableOpacity onPress={clearInput}>
                <View style={styles.wrapperClearIcon}>
                  <Icon name="cancel" size={16} color={colors.textLight} />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {locations.map((item, index) => (
          <SelectableRow
            key={String(item.place_id + index)}
            value={item.city}
            isActive={item.isChecked}
            onPress={() => onLocationSelect(item.place_id, !item[currentTab])}
          />
        ))}
      </View>
    </ScrollView>
  </View>
);

SearchFilter.propTypes = {
  locations: propTypes.array.isRequired,
  accounts: propTypes.array.isRequired,
  onLocationSelect: propTypes.func.isRequired,
  onAccountSelect: propTypes.func.isRequired,
  focusInput: propTypes.func.isRequired,
  onChangePass: propTypes.func.isRequired,
  inputRef: propTypes.object.isRequired,
  passValue: propTypes.string.isRequired,
  clearInput: propTypes.func.isRequired,
  currentTab: propTypes.string.isRequired,
  showAccountsFilter: propTypes.bool.isRequired,
  isArchive: propTypes.bool,
};

SearchFilter.defaultProps = {
  isArchive: false,
};

SearchFilter.contextTypes = {
  t: propTypes.func.isRequired,
};
export default SearchFilter;
