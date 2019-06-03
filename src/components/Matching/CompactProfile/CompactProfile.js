import React from 'react';
import { View, FlatList } from 'react-native';
import propTypes from 'prop-types';

import ProfileHeader from './../../Profile/ProfileHeader/ProfileHeader';
import SimpleSkillRow from './SimpleSkillRow';
import styles from './styles';

class CompactProfile extends React.Component {
  keyExtractor = (item) => String(item.id);
  renderItem = ({ item }) => (
    <SimpleSkillRow
      skillLevels={this.props.skillLevels}
      knowledgeLevel={item.skill_level_id}
      skillName={item.skill_name}
    />
  );
  render() {
    const { onAvatarPress, skills, user } = this.props;
    let isVisible;
    if (user.is_public) {
      // show
      isVisible = true;
    } else if (!user.is_public && user.is_visible) {
      // show
      isVisible = true;
    } else {
      // hide
      isVisible = false;
    }
    return (
      <View style={styles.container}>
        <ProfileHeader
          hideTabs
          showPrivateInfo={isVisible}
          iconName={`${'\ue805'}`}
          fullName={user.username}
          isHeaderVisible
          avatarURI={user.picture}
          onAvatarPress={onAvatarPress}
          city={user.location_city}
          country={user.location_country}
          profession={user.profession}
        />
        <FlatList data={skills} renderItem={this.renderItem} keyExtractor={this.keyExtractor} />
      </View>
    );
  }
}

CompactProfile.propTypes = {
  onAvatarPress: propTypes.func.isRequired,
  skills: propTypes.array.isRequired,
  skillLevels: propTypes.array.isRequired,
  user: propTypes.object.isRequired,
};

export default CompactProfile;
