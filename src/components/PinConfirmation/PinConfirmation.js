import React, { Component } from 'react';
import propTypes from 'prop-types';
import { View, Text } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import PinButton from './PinButton/PinButton';
import BackspaceButton from './BackspaceButton/BackspaceButton';

import styles from './styles';
import { colors } from './../../styles/base';

const buttons = {
  mainNumbers: [
    { number: 1, letters: '' },
    { number: 2, letters: 'ABC' },
    { number: 3, letters: 'DEF' },
    { number: 4, letters: 'GHI' },
    { number: 5, letters: 'JKL' },
    { number: 6, letters: 'MNO' },
    { number: 7, letters: 'PQRS' },
    { number: 8, letters: 'TUV' },
    { number: 9, letters: 'WXYX' },
  ],
  bottomBtn: { number: 0, letters: '+' },
};

class PinConfirmation extends Component {
  static propTypes = {
    pinLength: propTypes.number.isRequired,
    selectedPoints: propTypes.number.isRequired,
    goBack: propTypes.func.isRequired,
    onPressButton: propTypes.func.isRequired,
    onPressBackspace: propTypes.func.isRequired,
  };
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      pinPoints: this.createEmptyPinPoints(props.pinLength),
    };
  }

  createEmptyPinPoints = (length) => {
    const pointsArr = [];
    let i = 0;
    while (i < length) {
      pointsArr.push({ isEmpty: true });
      i += 1;
    }
    return pointsArr;
  };

  selectPinPoints = (points, count) => points.map((point, i) => (i < count ? { isEmpty: false } : point));

  render() {
    const { goBack, selectedPoints, onPressButton, onPressBackspace } = this.props;
    const { pinPoints } = this.state;
    const points = this.selectPinPoints(pinPoints, selectedPoints);
    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <HeaderBackButton color={colors.text} goTo={goBack} />
        </View>
        <View style={styles.wrapperHead}>
          <FontAwesome name="lock" color={colors.text} size={48} />
          <View style={styles.wrapperPoints}>
            {points.map(({ isEmpty }, i) => (
              /* eslint-disable */
              <View
                key={i}
                style={[
                  styles.defaultPoints,
                  !isEmpty ? styles.pointBg : null,
                  pinPoints.length !== i + 1 ? styles.pointWithMargin : null,
                ]}
              />
            ))}
          </View>
          <Text style={[styles.textUnderPoints, styles.defaultFontFamily]}>
            {this.context.t('Enter your verification PIN')}
          </Text>
        </View>

        <View style={styles.wrapperKeyboard}>
          <View style={styles.wrapperMainButtons}>
            {buttons.mainNumbers.map(({ number, letters }, i) =>
              i === 2 || i === 5 ? (
                [
                  <PinButton key={letters} number={number} letters={letters} onPress={onPressButton} />,
                  <View key={number} style={styles.newRow} />,
                ]
              ) : (
                <PinButton key={number} number={number} letters={letters} onPress={onPressButton} />
              )
            )}
          </View>

          <View style={styles.wrapperBottomButtons}>
            <View style={styles.emptyBtn} />
            <PinButton number={buttons.bottomBtn.number} letters={buttons.bottomBtn.letters} onPress={onPressButton} />
            <BackspaceButton onPress={onPressBackspace} />
          </View>
        </View>
      </View>
    );
  }
}

export default PinConfirmation;
