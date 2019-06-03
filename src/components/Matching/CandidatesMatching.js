import React, { Fragment } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View, Text } from 'react-native';
import propTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import CandidateItem from './CandidateItem/CandidateItem';
import { colors } from './../../styles/base';

class CandidatesMatching extends React.Component {
  keyExtractor = (item) => String(item.user_id);
  renderItem = ({ item }) => {
    let username;
    if (item.is_public) {
      // show
      ({ username } = item);
    } else if (!item.is_public && item.is_visible) {
      // show
      ({ username } = item);
    } else {
      // hide
      username = this.context.t('Private profile');
    }
    // const username = item.is_public ? item.username : this.context.t('Private profile');
    return (
      <CandidateItem
        name={username}
        status={item.offer_status}
        statusTimestamp={item.status_timestamp}
        onPress={() => this.props.onItemPress(item)}
        label={item.matched_label}
        description={item.matched_description}
      />
    );
  };
  render() {
    const {
      candidates,
      fetchMatchingItem,
      isLoading,
      isInviteBtnVisible,
      inviteAllCandidates,
      isMassMailingEnabled,
    } = this.props;
    const { t } = this.context;
    return (
      <Fragment>
        <FlatList
          keyboardShouldPersistTaps="always"
          data={candidates}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchMatchingItem} />}
        />
        {isInviteBtnVisible && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.touchable, isMassMailingEnabled ? { opacity: 0.6 } : {}]}
              onPress={inviteAllCandidates}
              activeOpacity={0.6}
              disabled={isMassMailingEnabled}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[colors.secondary, colors.secondary]}
                style={styles.gradientWrapper}
              >
                <Text style={styles.buttonText}>{t('Invite {count} candidates', { count: candidates.length })}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </Fragment>
    );
  }
}

CandidatesMatching.propTypes = {
  candidates: propTypes.array.isRequired,
  onItemPress: propTypes.func.isRequired,
  isLoading: propTypes.bool.isRequired,
  fetchMatchingItem: propTypes.func.isRequired,
  isInviteBtnVisible: propTypes.bool.isRequired,
  inviteAllCandidates: propTypes.func.isRequired,
  isMassMailingEnabled: propTypes.bool.isRequired,
};
CandidatesMatching.contextTypes = {
  t: propTypes.func.isRequired,
};
export default CandidatesMatching;
