import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Interactable from 'react-native-interactable';

import styles from './styles';
import { dimensions, colors } from './../../../styles/base';
import { getDateCreateAgo } from './../../../utils/dateHelpers';

const maxNumberOfLetters = Math.floor((dimensions.screenWidth * 0.6) / 12);
const cropName = (name) =>
  (name.length < maxNumberOfLetters ? name : `${name.substring(0, maxNumberOfLetters).trim()}...`);

class OfferListItem extends React.Component {
  onDrawerSnap = (event) => {
    if (event.nativeEvent.id === 'dragged') this.props.onDelete(this.props.itemId);
  };

  renderMainContent = () => {
    const { name, location, time, icon, onItemPress, type, isArchive } = this.props;
    const { t } = this.context;

    return (
      <TouchableOpacity onPress={onItemPress} activeOpacity={1}>
        <View style={styles.container}>
          <View style={styles.wrapperInfo}>
            <View style={styles.wrapperIcon}>
              <Image style={styles.itemIcon} source={icon} resizeMode="cover" resizeMethod="resize" />
            </View>
            <View style={[styles.wrapperLocationName, type ? { top: -6 } : {}]}>
              <Text style={styles.locationText}>{location}</Text>
              <Text style={styles.nameText}>{t(cropName(name))}</Text>
              {type && <Text style={styles.type}>{t(`${type[0].toUpperCase()}${type.slice(1)}`)}</Text>}
            </View>
          </View>
          <View style={styles.scoreBlock}>
            <Text style={styles.timeText}>{isArchive ? t('Expired') : getDateCreateAgo(time, t)}</Text>
            <Icon style={styles.forwardIcon} name="ios-arrow-forward" size={24} color={colors.secondary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { disableSwipe } = this.props;

    return disableSwipe ? (
      this.renderMainContent()
    ) : (
      <View style={styles.backgroundWrapper}>
        <View style={styles.backgroundButton}>
          <Text style={styles.deleteIcon}>{'\ue824'}</Text>
        </View>
        <Interactable.View
          horizontalOnly
          snapPoints={[{ x: 0 }, { x: -dimensions.screenWidth, id: 'dragged' }]}
          boundaries={{ left: -dimensions.screenWidth, right: 0, bounce: 0.5 }}
          dragWithSpring={{ tension: 2000, damping: 0.5 }}
          animatedNativeDriver
          onSnap={this.onDrawerSnap}
        >
          {this.renderMainContent()}
        </Interactable.View>
      </View>
    );
  }
}

OfferListItem.propTypes = {
  itemId: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  time: propTypes.string.isRequired,
  icon: propTypes.number.isRequired,
  onDelete: propTypes.func.isRequired,
  onItemPress: propTypes.func.isRequired,
  type: propTypes.string,
  location: propTypes.string,
  disableSwipe: propTypes.bool,
  isArchive: propTypes.bool.isRequired,
};
OfferListItem.contextTypes = {
  t: propTypes.func.isRequired,
};
export default OfferListItem;
