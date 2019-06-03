import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import propTypes from 'prop-types';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import StaticInput from './../../StaticInput/StaticInput';
import styles from './styles';
import { colors } from './../../../styles/base';
import { offerButtonsMap } from './../../../utils/statuses';

const icons = [
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

const setButtonsTextColor = (status, isFilled) => {
  if (status) {
    if (isFilled) {
      return colors.white;
    }
    return colors.secondary;
  }
  return colors.disableText;
};

const getDateCreateAgo = (date, t) => {
  const dateNow = moment();
  const dateItem = moment(date);
  const isSame = moment(dateNow).isSame(dateItem, 'day');
  const diff = dateNow.diff(dateItem, 'days');

  let returnedVal;

  if (isSame) {
    returnedVal = t('Posted today');
  } else if ((!isSame && diff === 0) || diff === 1) {
    returnedVal = t('Posted {dayCount} day ago', { dayCount: 1 });
  } else {
    returnedVal = t('Posted {dayCount} days ago', { dayCount: diff });
  }
  return returnedVal;
};

const DetailedOffer = (
  { onAcceptPress, onDeclinePress, offerStatus, activeOffer, showButtons, isUpdatingStateActivity },
  { t },
) => {
  const { text: acceptButtonText, status: acceptButtonStatus, isFilled: acceptButtonIsFilled } = offerButtonsMap('accept')[offerStatus];
  const { text: declinedButtonText, status: declinedButtonStatus, isFilled: declinedButtonIsFilled } = offerButtonsMap('decline')[offerStatus];

  const isAcceptButtonActive = acceptButtonStatus === 'active';
  const isDeclineButtonActive = declinedButtonStatus === 'active';
  const description = activeOffer.task ? activeOffer.task.description : activeOffer.job.description;
  const type = activeOffer.job_id ? 'job' : 'task';
  const location = `${activeOffer[type].city}, ${activeOffer[type].country}`;

  const seniority = activeOffer[type].seniority_name;
  const category = activeOffer[type].category_name;
  let duration = activeOffer[type].duration_value;

  if (duration) {
    const arrWords = duration.split(',');
    duration = `${t(arrWords[0])} ${arrWords[1]} ${t(arrWords[2])}`;
  }

  const contractType = activeOffer[type].contract_type_name;
  const reason =
    activeOffer.is_contract_type ||
    activeOffer.is_description ||
    activeOffer.is_time ||
    activeOffer.is_location ||
    activeOffer.is_not_interested ||
    Boolean(activeOffer.decline_comment);
  const date = getDateCreateAgo(offerStatus === 'new' ? activeOffer.timestamp : activeOffer.updated, t);
  const entityIcon = type === 'task' ? '\ue818' : '\ue817';
  const declinedButtonStyles = [
    styles.activeButtonWrapper,
    offerStatus === 'declined' ? { backgroundColor: colors.secondary } : {},
  ];
  const declinedTextStyles = [styles.activeButtonText, offerStatus === 'declined' ? { color: colors.white } : {}];

  return (
    <React.Fragment>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.header}>
          <Text style={styles.offerTitle}>{activeOffer[type].title}</Text>
          <View style={styles.locationWrapper}>
            <EntypoIcon name="location-pin" color={colors.text} size={16} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <Text style={styles.date}>{date}</Text>
          <View style={styles.wrapperIcon}>
            <Text style={styles.entityIcon}>{entityIcon}</Text>
          </View>
        </View>
        {offerStatus === 'declined' && reason ? (
          <View style={styles.rejectionInfoContainer}>
            <Text style={styles.headerTitle}>{t('Feedback')}</Text>
            <View style={styles.iconsWrapper}>
              {icons.map((iconObj) => {
                const isActive = activeOffer[iconObj.name];
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
            {activeOffer.decline_comment ? (
              <View style={styles.descriptionWrapper}>
                <Text style={styles.title}>{t('Comment')}</Text>
                <Text style={styles.comment}>{activeOffer.decline_comment}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
        <View style={styles.requirements}>
          <Text style={styles.requirementsTitle}>{t('Requirements')}</Text>
          {activeOffer.matched_skills.map((skillObj) => (
            <View key={skillObj.skill_id} style={styles.skillNameWrapper}>
              <Text style={styles.skillName}>{skillObj.skill_name}</Text>
            </View>
          ))}
        </View>
        {Boolean(description) && (
          <StaticInput
            label="Description"
            value={description || ''}
            containerStyles={[
              styles.staticInputContainer,
              { borderBottomColor: colors.textLight, borderTopColor: colors.textLight },
            ]}
          />
        )}
        <StaticInput
          label="Locations"
          value={location || ''}
          containerStyles={[
            styles.staticInputContainer,
            { borderTopColor: description ? 'transparent' : colors.textLight },
          ]}
        />
        {Boolean(seniority) && (
          <StaticInput label="Career level" value={seniority} containerStyles={styles.staticInputContainer} />
        )}
        {Boolean(duration) && (
          <StaticInput label="Expected duration" value={duration} containerStyles={styles.staticInputContainer} />
        )}
        {Boolean(contractType) && (
          <StaticInput label="Contract type" value={contractType} containerStyles={styles.staticInputContainer} />
        )}
        {Boolean(category) && (
          <StaticInput
            label={activeOffer.task ? 'Task category' : 'Job category'}
            value={category}
            containerStyles={styles.staticInputContainer}
          />
        )}
      </ScrollView>
      {showButtons ? (
        <View style={[styles.decisionBlock, isUpdatingStateActivity ? styles.wrapperLoader : {}]}>
          {!isUpdatingStateActivity ? (
            [
              <TouchableOpacity key="rejectButton" onPress={onDeclinePress} disabled={!isDeclineButtonActive}>
                <View
                  style={[
                    isDeclineButtonActive ? declinedButtonStyles : styles.disabledButtonWrapper,
                    { backgroundColor: declinedButtonIsFilled ? colors.secondary : null },
                  ]}
                >
                  <Text
                    style={[
                      isDeclineButtonActive ? declinedTextStyles : styles.disabledButtonText,
                      { color: setButtonsTextColor(isDeclineButtonActive, declinedButtonIsFilled) },
                    ]}
                  >
                    {t(declinedButtonText)}
                  </Text>
                </View>
              </TouchableOpacity>,
              <TouchableOpacity key="acceptButton" onPress={onAcceptPress} disabled={!isAcceptButtonActive}>
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
};

DetailedOffer.propTypes = {
  onAcceptPress: propTypes.func.isRequired,
  onDeclinePress: propTypes.func.isRequired,
  offerStatus: propTypes.string.isRequired,
  activeOffer: propTypes.object.isRequired,
  showButtons: propTypes.bool.isRequired,
  isUpdatingStateActivity: propTypes.bool,
};

DetailedOffer.contextTypes = {
  t: propTypes.func.isRequired,
};
export default DetailedOffer;
