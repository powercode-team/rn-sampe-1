import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import propTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import Interactable from 'react-native-interactable';

import styles from './styles';
import { dimensions, colors } from './../../../styles/base';

import offerIcon from '../../../../assets/invitations.png';

const DialogItem = (
  {
    typeItemName,
    username,
    userImg,
    typeName,
    typeIcon,
    fromDialog,
    fromDialogIcon,
    // onDelete,
    onSelectDialog,
    unreadMessageCounter,
    dayAgo,
    isPublic,
    deleteSubmit,
    id,
    index,
    setInteractableRef,
    masterDisplayName,
    isSubstitute,
  },
  { t },
) => {
  const onDrawerSnap = (event) => {
    if (event.nativeEvent.id === 'dragged') deleteSubmit(id, index);
  };
  return (
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
        onSnap={onDrawerSnap}
        ref={setInteractableRef}
      >
        <TouchableOpacity style={{ backgroundColor: colors.background }} onPress={onSelectDialog} activeOpacity={1}>
          <View style={styles.wrapper}>
            <View style={styles.wrapperUserInfo}>
              <View style={styles.wrapperAvatar}>
                {userImg ? (
                  <Image style={styles.userImg} source={userImg} resizeMode="cover" resizeMethod="resize" />
                ) : (
                  <Text style={[styles.iconAvatar, isPublic ? { color: '#999999' } : { color: '#616161' }]}>
                    {'\ue823'}
                  </Text>
                )}
              </View>
              <View style={styles.userInfo}>
                <Text style={[styles.typeName, styles.fontOpenSans]}>
                  {isSubstitute && masterDisplayName.length ? masterDisplayName : null}
                  {typeItemName}
                </Text>

                <Text style={[styles.userName, styles.fontOpenSans]}>{username}</Text>
                <View style={styles.wrapperTypeInfo}>
                  <Image style={styles.typeImg} source={typeIcon} resizeMode="cover" resizeMethod="resize" />
                  <Text style={[styles.typeText, styles.fontOpenSans]}>{t(typeName)}</Text>
                  {fromDialog === 'Offer' ? (
                    <Image style={styles.offerIcon} source={offerIcon} resizeMode="cover" resizeMethod="resize" />
                  ) : (
                    <Text style={styles.typeIcons}>{fromDialogIcon}</Text>
                  )}
                  <Text style={[styles.typeText, styles.fontOpenSans]}>{t(fromDialog)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.wrapperDialogInfo}>
              <View style={styles.dialogInfo}>
                <Text style={[styles.date, styles.fontOpenSans]}>{dayAgo}</Text>
                {unreadMessageCounter ? (
                  <View style={styles.wrapperMsgCount}>
                    <Text style={[styles.msgCount, styles.fontOpenSans]}>{unreadMessageCounter}</Text>
                  </View>
                ) : null}
              </View>
              <Icon name="angle-right" size={24} color={colors.textLight} />
            </View>
          </View>
        </TouchableOpacity>
      </Interactable.View>
    </View>
  );
};

DialogItem.defaultProps = {
  username: 'Unknown',
  typeItemName: 'Unknown',
  userImg: null,
  typeName: 'Unknown',
  fromDialog: 'Unknown',
  fromDialogIcon: '',
  unreadMessageCounter: null,
  dayAgo: '',
  masterDisplayName: '',
};

DialogItem.propTypes = {
  username: propTypes.string,
  typeItemName: propTypes.string,
  userImg: propTypes.object,
  typeName: propTypes.string,
  typeIcon: propTypes.number.isRequired,
  fromDialog: propTypes.string,
  fromDialogIcon: propTypes.string,
  index: propTypes.number,
  // onDelete: propTypes.func.isRequired,
  onSelectDialog: propTypes.func.isRequired,
  unreadMessageCounter: propTypes.number,
  dayAgo: propTypes.string,
  id: propTypes.number,
  deleteSubmit: propTypes.func.isRequired,
  setInteractableRef: propTypes.func.isRequired,
  isPublic: propTypes.bool,
  masterDisplayName: propTypes.string,
  isSubstitute: propTypes.bool.isRequired,
};

DialogItem.contextTypes = {
  t: propTypes.func.isRequired,
};
export default DialogItem;
