import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import propTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import LoadingModal from './../LoadingModal/LoadingModal';
import styles from './styles';
import { colors } from './../../styles/base';

const Filters = ({ children, onApplyFilter, isLoading, onModalClose }, { t }) => (
  <Fragment>
    <LoadingModal visible={isLoading} closeModal={onModalClose} />
    <View style={styles.container}>
      <View style={styles.wrapperContent}>{children}</View>
      <View style={styles.wrapperButton}>
        <TouchableOpacity style={styles.touchable} onPress={onApplyFilter} activeOpacity={0.6} disabled={isLoading}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[colors.secondary, colors.secondary]}
            style={styles.applyButton}
          >
            <Text style={styles.buttonText}>{t('Apply filter')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  </Fragment>
);

Filters.propTypes = {
  children: propTypes.object.isRequired,
  onApplyFilter: propTypes.func.isRequired,
  isLoading: propTypes.bool,
  onModalClose: propTypes.func,
};
Filters.contextTypes = {
  t: propTypes.func.isRequired,
};
Filters.defaultProps = {
  isLoading: false,
  onModalClose: () => {},
};
export default Filters;
