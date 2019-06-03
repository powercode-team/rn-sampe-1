import React from 'react';
import { View, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';
import { colors } from './../../../styles/base';

class Message extends React.PureComponent {
  render() {
    const { message, date, isMyMessage, showDate, isNoSent } = this.props;

    return (
      <React.Fragment>
        {isMyMessage ? (
          <View
            style={[
              styles.wrapper,
              isMyMessage ? styles.myMessage : styles.messageToMe,
              isNoSent ? styles.isNoSent : {},
            ]}
          >
            <Text style={[styles.message, { color: colors.background }, isNoSent ? styles.isNoSentTextWhite : {}]}>
              {message}
            </Text>
            {isNoSent ? (
              <Text style={[styles.sendingText, { color: 'rgba(255, 255, 255, 0.3)' }]}>
                {this.context.t('Sending...')}
              </Text>
            ) : null}
          </View>
        ) : (
          <View style={[styles.wrapper, styles.messageToMe, isNoSent ? styles.isNoSent : {}]}>
            <Text style={[styles.message, isNoSent ? styles.isNoSentText : {}]}>{message}</Text>
            {isNoSent ? <Text style={styles.sendingText}>{this.context.t('Sending...')}</Text> : null}
          </View>
        )}
        {showDate ? (
          <View style={[styles.wrapperDate, isMyMessage && styles.wrapperDateToMe]}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        ) : null}
      </React.Fragment>
    );
  }
}

Message.propTypes = {
  message: propTypes.string.isRequired,
  isMyMessage: propTypes.bool.isRequired,
  showDate: propTypes.bool.isRequired,
  date: propTypes.string.isRequired,
  isNoSent: propTypes.bool.isRequired,
};
Message.contextTypes = {
  t: propTypes.func.isRequired,
};
export default Message;
