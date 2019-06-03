import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

class ServiceMessage extends PureComponent {
  render() {
    const { message, date, showDate } = this.props;

    return (
      <View style={styles.wrapper}>
        {showDate ? (
          <View style={styles.wrapperDate}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        ) : null}
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }
}

ServiceMessage.propTypes = {
  message: propTypes.string.isRequired,
  showDate: propTypes.bool.isRequired,
  date: propTypes.string.isRequired,
};

ServiceMessage.contextTypes = {
  t: propTypes.func.isRequired,
};

export default ServiceMessage;
