import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import propTypes from 'prop-types';

import { translateTitle } from './../../translations/navigation';

import CompactProfile from './../../components/Matching/CompactProfile/CompactProfile';
import HeaderBackButton from './../../components/HeaderBackButton/HeaderBackButton';
import ValidationError from './../../components/ValidationError/ValidationError';

class CompactProfileContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    return {
      headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} />,
      headerRight: <View />,
      screenTitle: translateTitle(lang, 'Profile'),
    };
  };

  static propTypes = {
    navigation: propTypes.object.isRequired,
    skillLevels: propTypes.array.isRequired,
    userSkills: propTypes.array.isRequired,
    userInReview: propTypes.object.isRequired,
    lang: propTypes.string.isRequired,
  };

  state = {
    isValidationErrorVisible: false,
    errorMessage: '',
  };

  componentDidMount() {
    this.props.navigation.setParams({ lang: this.props.lang });
  }

  openPopupModal = (message) => {
    this.setState({ errorMessage: message, isValidationErrorVisible: true });
    setTimeout(() => {
      this.setState({ errorMessage: '', isValidationErrorVisible: false });
    }, 2000);
  };
  render() {
    const { navigation, skillLevels, userSkills, userInReview } = this.props;

    return (
      <React.Fragment>
        <ValidationError message={this.state.errorMessage} isVisible={this.state.isValidationErrorVisible} isBottom />
        <CompactProfile
          onAvatarPress={() => navigation.goBack()}
          skills={userSkills}
          skillLevels={skillLevels}
          user={userInReview}
          isMatching
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  skillLevels: state.initialData.skillLevels,
  userSkills: state.matching.userInReviewSkills.sort((itemA, itemB) => itemB.skill_level_id - itemA.skill_level_id),
  userInReview: state.matching.userInReview,
  lang: state.i18nState.lang,
});

export default connect(
  mapStateToProps,
  null,
)(CompactProfileContainer);
