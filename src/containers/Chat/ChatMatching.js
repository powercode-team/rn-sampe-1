import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';

import { fetchMatchedUser } from '../../actions/chat';

import { getChatMatchingOrganizedRelatedSkills } from '../../selectors/chatMatching';

import ValidationError from '../../components/ValidationError/ValidationError';
import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import AcceptanceScreen from '../../components/Matching/AcceptanceScreen/AcceptanceScreen';
import LoadingModal from './../../components/LoadingModal/LoadingModal';
import { dimensions, colors } from './../../styles/base';

const maxNumberOfLetters = Math.floor((dimensions.screenWidth * 0.7) / 12);

class ChatMatchingContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    let title = '';
    if (navigation.state.params && navigation.state.params.title !== undefined) {
      const strLength = navigation.state.params.title.length;
      title =
        strLength > maxNumberOfLetters
          ? `${navigation.state.params.title.substr(0, maxNumberOfLetters)}...`
          : navigation.state.params.title;
    }
    return {
      headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
      headerTitle: <HeaderTitle text={title} />,
      headerRight: <View />,
    };
  };

  static propTypes = {
    navigation: propTypes.object.isRequired,
    isPopupVisible: propTypes.bool.isRequired,
    popupMessage: propTypes.string.isRequired,
    fetchMatchedUser: propTypes.func.isRequired,
    currentActivityId: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    interlocutorId: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    currentActivityType: propTypes.string.isRequired,
    matchedUser: propTypes.object.isRequired,
    relatedSkills: propTypes.array.isRequired,
    skillLevels: propTypes.array.isRequired,
  };

  state = {
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.fetchMatchedUser(
      this.props.currentActivityId,
      this.props.interlocutorId,
      this.props.currentActivityType,
      () => this.setState({ isLoading: false }),
    );
  }

  calculateChartPercentages = () => {
    const { matched_skills: matchedSkills, matched_score: score } = this.props.matchedUser;

    const { relatedSkills } = this.props;
    if (!matchedSkills.length && !relatedSkills.length) return [0, 0, 0, 0];
    const fullLength = relatedSkills.length + matchedSkills.length;
    let perfectlyQualifiedLength = 0;
    let underQualifiedLength = 0;
    let overQualifiedLength = 0;
    matchedSkills.forEach((skill) => {
      if (skill.skill_searched_level_id === skill.skill_user_level_id) perfectlyQualifiedLength += 1;
      if (skill.skill_searched_level_id > skill.skill_user_level_id) underQualifiedLength += 1;
      if (skill.skill_searched_level_id < skill.skill_user_level_id) overQualifiedLength += 1;
    });
    const relatedPercentage = relatedSkills.length / fullLength;
    const perfectlyQualifiedPercentage = perfectlyQualifiedLength / fullLength;
    const underQualifiedPercentage = underQualifiedLength / fullLength;
    const overQualifiedPercentage = overQualifiedLength / fullLength;
    return [
      Math.round(overQualifiedPercentage * score),
      Math.round(underQualifiedPercentage * score),
      Math.round(perfectlyQualifiedPercentage * score),
      Math.round(relatedPercentage * score),
    ];
  };

  render() {
    const { isPopupVisible, popupMessage, skillLevels, matchedUser, relatedSkills, navigation } = this.props;

    const { isLoading } = this.state;

    let isVisible;
    if (matchedUser.is_public) {
      // show
      isVisible = true;
    } else if (!matchedUser.is_public && matchedUser.is_visible) {
      // show
      isVisible = true;
    } else {
      // hide
      isVisible = false;
    }

    console.log('matchedUser', matchedUser);

    return (
      <React.Fragment>
        <LoadingModal visible={isLoading} closeModal={() => this.setState({ isLoading: false })} />
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          {Object.keys(matchedUser).length > 2 ? (
            <AcceptanceScreen
              showPrivateInfo={isVisible}
              navigation={navigation}
              onAvatarPress={() => {}}
              matchedSkills={matchedUser.matched_skills}
              relatedSkills={relatedSkills}
              skillLevels={skillLevels}
              user={matchedUser}
              chartPercentages={this.calculateChartPercentages()}
              onCreateOfferPress={() => {}}
              onRejectOfferPress={() => {}}
              isMatching={false}
            />
          ) : null}

          <ValidationError isVisible={isPopupVisible} message={popupMessage} isBottom />
        </View>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isPopupVisible: state.chat.isPopupVisible,
  popupMessage: state.chat.popupMessage,
  skillLevels: state.initialData.skillLevels,
  currentActivityId: state.chat.currentActivityId,
  currentActivityType: state.chat.currentActivityType,
  currentUserType: state.chat.currentUserType,
  interlocutorId: state.chat.interlocutorId,
  matchedUser: state.chat.matchedUser,
  relatedSkills: getChatMatchingOrganizedRelatedSkills(state),
});

const mapDispatchToProps = {
  fetchMatchedUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatMatchingContainer);
