import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import propTypes from 'prop-types';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import { colors } from './../../../styles/base';
import ProfileHeader from './../../Profile/ProfileHeader/ProfileHeader';
import RequirementsList from './../../Requirements/Requirements';
import { matchingButtonsMap } from './../../../utils/statuses';
import statusIcon from '../../../../assets/matching-status.png';

const setButtonsTextColor = (status, isFilled) => {
  if (status) {
    if (isFilled) {
      return colors.white;
    }
    return colors.secondary;
  }
  return colors.disableText;
};

class AcceptanceScreen extends React.Component {
  state = {
    activeSkillId: false,
  };
  icons = [
    {
      name: 'is_not_interested',
      text: 'Not interested',
      iconName: '\ue811',
      iconNameActive: '\ue810',
    },
    {
      name: 'is_time',
      text: 'Time',
      iconName: '\ue81d',
      iconNameActive: '\ue81c',
    },
    {
      name: 'is_contract_type',
      text: 'Contract type',
      iconName: '\ue80b',
      iconNameActive: '\ue80a',
    },
    {
      name: 'is_location',
      text: 'Location',
      iconName: '\ue80f',
      iconNameActive: '\ue80e',
    },
    {
      name: 'is_description',
      text: 'Description',
      iconName: '\ue80d',
      iconNameActive: '\ue80c',
    },
  ];
  changeOpenedView = (activeId) => {
    const id = activeId !== this.state.activeSkillId ? activeId : false;
    this.setState({ activeSkillId: id });
  };
  render() {
    const {
      onAvatarPress,
      matchedSkills,
      relatedSkills,
      user,
      onCreateOfferPress,
      onRejectOfferPress,
      isMatching,
      onChatPress,
      showPrivateInfo,
    } = this.props;
    const { t } = this.context;
    const { offer_status: status } = user;

    const { text: acceptButtonText, status: acceptButtonStatus, isFilled: acceptButtonIsFilled } = matchingButtonsMap('accept')[status];
    const {
      text: declinedButtonText,
      status: declinedButtonStatus,
      isFilled: declinedButtonIsFilled,
    } = matchingButtonsMap('decline')[status];

    const isAcceptButtonActive = acceptButtonStatus === 'active';
    const isDeclineButtonActive = declinedButtonStatus === 'active';
    const enableChat = isMatching && status === 'submitted';
    const reason =
      user.is_contract_type ||
      user.is_description ||
      user.is_time ||
      user.is_location ||
      user.is_not_interested ||
      Boolean(user.decline_comment);
    let statusText = status && `${status[0].toUpperCase()}${status.slice(1)}`;
    if (status === 'declined') statusText = t('Rejected');
    if (status === 'rejected' || status === 'canceled') statusText = t('Declined');
    if (status === 'accepted') statusText = t('Interested');
    if (status === 'submitted') statusText = t('Accepted');

    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.contentWrapper}>
          <View style={styles.container}>
            <ProfileHeader
              showPrivateInfo={showPrivateInfo}
              hideTabs
              fullName={user.username || ''}
              isHeaderVisible
              avatarURI={user.picture}
              city={user.location_city}
              country={user.location_country}
              profession={user.profession}
            />
            <View style={styles.infoRow}>
              <View style={[styles.centeringWrapper, { flexBasis: '33%' }]}>
                <Image style={styles.statusImage} source={statusIcon} resizeMode="cover" resizeMethod="resize" />
                <View style={styles.statusRow}>
                  <Text style={styles.text}>{t('Status:')}</Text>
                  <Text style={styles.status}>{t(statusText)}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={onAvatarPress} style={{ flexBasis: '33%' }}>
                <View style={styles.centeringWrapper}>
                  <AwesomeIcon name="id-card-o" color={colors.primary} size={20} light />
                  <Text style={styles.blueText}>{t('Skill profile')}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onChatPress} disabled={!enableChat} style={{ flexBasis: '33%' }}>
                <View style={styles.centeringWrapper}>
                  <Text style={[styles.chatIcon, enableChat ? {} : { color: colors.textLight }]}>{'\ue803'}</Text>
                  <Text style={[styles.text, enableChat ? {} : { color: colors.textLight }]}>{t('Chat')}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {status === 'declined' && reason ? (
              <View style={styles.rejectionInfoContainer}>
                <Text style={styles.headerTitle}>{t('Feedback')}</Text>
                <View style={styles.iconsWrapper}>
                  {this.icons.map((iconObj) => {
                    const isActive = user[iconObj.name];
                    const name = isActive ? iconObj.iconNameActive : iconObj.iconName;
                    const color = isActive ? colors.secondary : colors.text;
                    return (
                      <View style={styles.iconView} key={iconObj.text}>
                        <Text style={[styles.icon, { color }]}>{`${name}`}</Text>
                        <Text style={[styles.iconName, { color }]}>{t(iconObj.text)}</Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.descriptionWrapper}>
                  <Text style={styles.title}>{t('Comment')}</Text>
                  <Text style={styles.comment}>{user.decline_comment}</Text>
                </View>
              </View>
            ) : null}
            <View style={styles.requirementsWrapper}>
              <View style={styles.titleWrapper}>
                <Text style={styles.requirementsTitle}>{t('Requirements')}</Text>
              </View>
              <RequirementsList relatedSkills={relatedSkills} matchedSkills={matchedSkills} />
            </View>
          </View>
        </ScrollView>
        {isMatching ? (
          <View style={[styles.decisionBlock, this.props.isUpdatingStateProfile ? styles.wrapperLoader : {}]}>
            {!this.props.isUpdatingStateProfile ? (
              [
                <TouchableOpacity key="rejectButton" onPress={onRejectOfferPress} disabled={!isDeclineButtonActive}>
                  <View
                    style={[
                      isDeclineButtonActive ? styles.activeButtonWrapper : styles.disabledButtonWrapper,
                      { backgroundColor: declinedButtonIsFilled ? colors.secondary : null },
                    ]}
                  >
                    <Text
                      style={[
                        isAcceptButtonActive ? styles.activeButtonText : styles.disabledButtonText,
                        { color: setButtonsTextColor(isDeclineButtonActive, declinedButtonIsFilled) },
                      ]}
                    >
                      {t(declinedButtonText)}
                    </Text>
                  </View>
                </TouchableOpacity>,
                <TouchableOpacity key="acceptButton" onPress={onCreateOfferPress} disabled={!isAcceptButtonActive}>
                  <View
                    style={[
                      isAcceptButtonActive ? styles.activeButtonWrapper : styles.disabledButtonWrapper,
                      { backgroundColor: acceptButtonIsFilled ? colors.secondary : null },
                    ]}
                  >
                    <Text
                      style={[
                        isAcceptButtonActive ? styles.activeButtonText : styles.disabledButtonText,
                        { color: setButtonsTextColor(isAcceptButtonActive, acceptButtonIsFilled) },
                      ]}
                    >
                      {t(acceptButtonText)}
                    </Text>
                  </View>
                </TouchableOpacity>,
              ]
            ) : (
              <ActivityIndicator size="large" color={colors.textLight} />
            )}
          </View>
        ) : null}
      </React.Fragment>
    );
  }
}

AcceptanceScreen.propTypes = {
  onAvatarPress: propTypes.func.isRequired,
  matchedSkills: propTypes.array,
  relatedSkills: propTypes.array,
  user: propTypes.object.isRequired,
  onCreateOfferPress: propTypes.func.isRequired,
  onRejectOfferPress: propTypes.func.isRequired,
  isMatching: propTypes.bool,
  onChatPress: propTypes.func,
  showPrivateInfo: propTypes.bool,
  isUpdatingStateProfile: propTypes.bool,
};
AcceptanceScreen.contextTypes = {
  t: propTypes.func.isRequired,
};
export default AcceptanceScreen;
