import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

import moment from 'moment';

import styles from './styles';
import { dimensions, colors } from './../../../styles/base';

const maxNumberOfLetters = Math.floor(((dimensions.screenWidth - 0.25) * dimensions.screenWidth) / 12);
const cropName = (name) =>
  (name.length < maxNumberOfLetters ? name : `${name.substring(0, maxNumberOfLetters).trim()}...`);

const CandidateItem = ({ status, name, onPress, statusTimestamp }, { t }) => {
  const parsedDate = moment(statusTimestamp).format('DD.MM.YYYY');
  let text = '';

  if (status === 'accepted') text = 'Matched on';
  if (status === 'submitted') text = 'Accepted on';
  if (status === 'rejected' || status === 'canceled') text = 'You declined on';
  if (status === 'declined') text = 'Candidate rejected on';
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.candidateItem}>
        <View style={styles.leftBlock}>
          <View style={styles.infoWrapper}>
            <Text style={styles.date}>
              {t(text)} {parsedDate}
            </Text>
            <Text style={styles.name}>{cropName(name)}</Text>
          </View>
        </View>
        <View style={styles.scoreBlock}>
          <Icon style={styles.forwardIcon} name="ios-arrow-forward" size={24} color={colors.secondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

CandidateItem.propTypes = {
  name: propTypes.string.isRequired,
  status: propTypes.string,
  statusTimestamp: propTypes.string.isRequired,
  onPress: propTypes.func.isRequired,
};

CandidateItem.contextTypes = {
  t: propTypes.func.isRequired,
};

export default CandidateItem;
