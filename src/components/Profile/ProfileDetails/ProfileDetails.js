import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';

import { Field } from 'redux-form';
import propTypes from 'prop-types';
import moment from 'moment';

import { onlyNumbers } from '../../../utils/validators';
import ActiveInput from './../../ActiveInput/ActiveInput';
import SelectModal from './../SelectModal/SelectModal';
import LocationSelection from './../../../containers/Profile/LocationSelection';
import styles from './styles';
import { colors } from './../../../styles/base';

const phoneFormatter = (number) => {
  if (!number) return number;
  if (number && onlyNumbers(number)) {
    return number;
  }
  if (number.length < 3) return `+${number}`;
  if (number.length > 2 && number.length < 6) {
    return `+${number.substring(0, 2)} ${number.substring(2, 5)}`;
  }
  return `+${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5, number.length)}`;
};

const phoneParser = (number) => {
  if (!number) return number;
  // if (number === '+') return '';
  const formattedNumber = number.length > 1 ? number.slice(1).replace(/\s/g, '') : number;
  return formattedNumber;
};

const trimmer = (value) => value && value.replace(/\s{2}/gi, '');

const trimmerWithoutSpaces = (value) => value && value.replace(/\s/gi, '');

const smartTrimmer = (value) => {
  if (value === ' ') return '';
  if (value && value.length > 2 && value[value.length - 1] === ' ' && value[value.length - 2] === ' ') {
    return value.slice(0, value.length - 1);
  }
  return value;
};

class ProfileDetails extends React.Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    clearField: propTypes.func.isRequired,
    onInputChange: propTypes.func.isRequired,
    gender: propTypes.string.isRequired,
    seniority: propTypes.string.isRequired,
    showDateTimePicker: propTypes.func.isRequired,
    date: propTypes.oneOfType([propTypes.string, propTypes.number]),
    onLocationPress: propTypes.func.isRequired,
    isLocationSelectionActive: propTypes.bool.isRequired,
    onCancelPress: propTypes.func.isRequired,
    location: propTypes.string.isRequired,
    chooseLocation: propTypes.func.isRequired,
    seniorities: propTypes.array.isRequired,
    fetchUserProfile: propTypes.func.isRequired,
    isLoading: propTypes.bool.isRequired,
  };

  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  state = {
    isGenderModalVisible: false,
    isSeniorityModalVisible: false,
  };
  onValueSelect = (name, modalName, value) => {
    this.setState({ [modalName]: false });
    this.props.onInputChange(name, value);
  };
  setModalState = (name, state) => {
    this.setState({ [name]: state });
  };
  renderInput = (inputProps) => {
    const handler = () => this.props.clearField(inputProps.input.name);
    const isLowerCase = inputProps.isLowerCase || false;
    return (
      <ActiveInput
        clearField={handler}
        containerStyles={styles.inputWrapper}
        inputStyle={styles.input}
        placeholderTextColor={colors.textLight}
        isLowerCase={isLowerCase}
        {...inputProps}
      />
    );
  };

  renderContent() {
    const { isGenderModalVisible, isSeniorityModalVisible } = this.state;
    const {
      gender,
      seniority,
      showDateTimePicker,
      date,
      onLocationPress,
      isLocationSelectionActive,
      location,
      onCancelPress,
      chooseLocation,
      seniorities,
    } = this.props;
    let parsedDate = typeof date === 'string' ? moment(date).format('DD/MM/YYYY') : moment(date).format('DD/MM/YYYY');
    parsedDate = !date ? 'DD.MM.YYYY' : parsedDate;
    return (
      <React.Fragment>
        {/* <KeyboardAvoidingView
          keyboardVerticalOffset={68}
          behavior="padding"
          enabled
          style={styles.inputsContainer}
        > */}
        {isLocationSelectionActive ? null : (
          <React.Fragment>
            <Field
              name="firstName"
              placeholder={this.context.t('First name')}
              label={this.context.t('First name')}
              component={this.renderInput}
              format={trimmer}
            />
            <Field
              name="lastName"
              placeholder={this.context.t('Last name')}
              label={this.context.t('Last name')}
              component={this.renderInput}
              format={trimmer}
            />
            <Field
              name="username"
              placeholder={this.context.t('Username')}
              label={this.context.t('Username')}
              component={this.renderInput}
              format={trimmerWithoutSpaces}
              autoCorrect={false}
              keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
              // isLowerCase
            />
            <Field
              name="email"
              placeholder={this.context.t('E-Mail')}
              label={this.context.t('E-Mail')}
              component={this.renderInput}
              editable={false}
              isLowerCase
            />
          </React.Fragment>
        )}
        <LocationSelection
          onLocationPress={onLocationPress}
          isLocationSelectionActive={isLocationSelectionActive}
          onCancelPress={onCancelPress}
          chooseLocation={chooseLocation}
          location={location}
          navigation={this.props.navigation}
          expandedLocations={false}
        />
        {isLocationSelectionActive ? null : (
          <React.Fragment>
            <Field
              name="education"
              placeholder={this.context.t('Education')}
              label={this.context.t('Education')}
              component={this.renderInput}
              format={smartTrimmer}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalState('isSeniorityModalVisible', true)}>
              <View style={styles.selectWrapper}>
                <Text style={styles.selectLabel}>{this.context.t('Career level')}</Text>
                <Text style={[styles.selectValue, { color: seniority ? colors.text : colors.textLight }]}>
                  {seniority || this.context.t('Seniority Level')}
                </Text>
              </View>
            </TouchableOpacity>
            <SelectModal
              selectedOption={seniority}
              options={seniorities}
              title="Select Career level"
              visible={isSeniorityModalVisible}
              closeModal={() => this.setModalState('isSeniorityModalVisible', false)}
              onSelect={(value) => this.onValueSelect('seniority', 'isSeniorityModalVisible', value)}
            />
            <TouchableOpacity activeOpacity={1} onPress={() => this.setModalState('isGenderModalVisible', true)}>
              <View style={styles.selectWrapper}>
                <Text style={styles.selectLabel}>{this.context.t('Gender')}</Text>
                <Text style={[styles.selectValue, { color: gender ? colors.text : colors.textLight }]}>
                  {this.context.t(gender) || this.context.t('Choose gender')}
                </Text>
              </View>
            </TouchableOpacity>
            <SelectModal
              selectedOption={gender}
              options={['Male', 'Female', 'Diverse']}
              title="Select gender"
              visible={isGenderModalVisible}
              closeModal={() => this.setModalState('isGenderModalVisible', false)}
              onSelect={(value) => this.onValueSelect('gender', 'isGenderModalVisible', value)}
            />
            <TouchableOpacity activeOpacity={1} onPress={showDateTimePicker}>
              <View style={styles.selectWrapper}>
                <Text style={styles.selectLabel}>{this.context.t('Date of Birth')}</Text>
                <Text
                  style={[styles.selectValue, { color: parsedDate !== 'DD.MM.YYYY' ? colors.text : colors.textLight }]}
                >
                  {parsedDate}
                </Text>
              </View>
            </TouchableOpacity>
            <Field
              name="profession"
              placeholder={this.context.t('Position')}
              label={this.context.t('Position')}
              component={this.renderInput}
              format={smartTrimmer}
            />

            <Field
              name="phone"
              placeholder="+49 155 55555555"
              label={this.context.t('Phone')}
              component={this.renderInput}
              keyboardType="numeric"
              format={phoneFormatter}
              parse={phoneParser}
            />
          </React.Fragment>
        )}
        {/* </KeyboardAvoidingView> */}
      </React.Fragment>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.main,
          this.props.isLocationSelectionActive ? {} : { paddingTop: Platform.OS === 'ios' ? 14 : 10 },
        ]}
      >
        {this.renderContent()}
      </View>
    );
  }
}

export default ProfileDetails;
