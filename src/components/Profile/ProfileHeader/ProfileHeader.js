import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import propTypes from 'prop-types';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import styles from './styles';
import PhotoModal from './../PhotoModal/PhotoModal';
import { DOMAIN } from '../../../utils/api';

export const ProfileHeader = (
  {
    modalVisible,
    onAvatarPress,
    closeModal,
    openCamera,
    openImageLibrary,
    avatarURI,
    deletePhoto,
    isHeaderVisible,
    fullName,
    city,
    country,
    profession,
    hideTabs,
    iconName,
    showPrivateInfo,
  },
  { t },
) => {
  const avatarSource = avatarURI ? { uri: `${DOMAIN}${avatarURI}` } : null;
  const location = `${city}, ${country}`;

  const avatar =
    avatarSource !== null ? (
      <Image style={styles.avatar} resizeMethod="resize" source={avatarSource} resizeMode="cover" />
    ) : (
      <Text style={[styles.iconAvatar, { color: '#999999' }]}>{'\ue823'}</Text>
    );
  return (
    <View style={styles.header}>
      {!hideTabs && (
        <PhotoModal
          visible={modalVisible}
          closeModal={closeModal}
          openCamera={openCamera}
          openImageLibrary={openImageLibrary}
          deletePhoto={deletePhoto}
        />
      )}
      {isHeaderVisible && (
        <View style={styles.headerContentWrapper}>
          <View style={styles.infoSection}>
            <TouchableOpacity onPress={onAvatarPress} activeOpacity={1} style={styles.imageWrapper}>
              {iconName && (
                <View style={styles.editIconWrapper}>
                  <Text style={styles.editIcon}>{iconName}</Text>
                </View>
              )}

              {showPrivateInfo ? avatar : <Text style={[styles.iconAvatar, { color: '#616161' }]}>{'\ue823'}</Text>}
            </TouchableOpacity>
            <View style={styles.mainInfo}>
              <View style={styles.profileNameWrapper}>
                {showPrivateInfo ? (
                  <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={styles.name}>{fullName}</Text>
                  </View>
                ) : (
                  <View style={{ alignSelf: 'flex-start' }}>
                    <Text key="Private profile" style={styles.name}>
                      {t('Private profile')}
                    </Text>
                    <Text key="privateMsg" style={styles.privateMsg}>
                      {t('The user has set this profile to "private mode"')}
                    </Text>
                  </View>
                )}
              </View>
              {showPrivateInfo && Boolean(profession) && <Text style={styles.occupation}>{profession}</Text>}
              {showPrivateInfo && Boolean(city) && Boolean(country) && (
                <View style={styles.locationWrapper}>
                  <EntypoIcon name="location-pin" color="#a0a4a8" size={16} />
                  <Text style={styles.location}>{location}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

ProfileHeader.propTypes = {
  modalVisible: propTypes.bool,
  onAvatarPress: propTypes.func,
  closeModal: propTypes.func,
  openCamera: propTypes.func,
  openImageLibrary: propTypes.func,
  avatarURI: propTypes.string,
  deletePhoto: propTypes.func,
  isHeaderVisible: propTypes.bool.isRequired,
  fullName: propTypes.string.isRequired,
  city: propTypes.string,
  country: propTypes.string,
  profession: propTypes.string,
  hideTabs: propTypes.bool,
  iconName: propTypes.string,
  showPrivateInfo: propTypes.bool,
};
ProfileHeader.defaultProps = {
  onAvatarPress: () => {},
};
ProfileHeader.contextTypes = {
  t: propTypes.func.isRequired,
};
export default ProfileHeader;
