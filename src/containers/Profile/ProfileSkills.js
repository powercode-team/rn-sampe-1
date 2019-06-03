import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileSkills from './../../components/Profile/ProfileSkills/ProfileSkills';
import { deleteUserSkill, setSkillLevel } from '../../actions/skills';

class ProfileSkillsContainer extends Component {
  static propTypes = {
    toggleHeaderState: propTypes.func.isRequired,
    isHeaderVisible: propTypes.bool.isRequired,
    skills: propTypes.array.isRequired,
    deleteUserSkill: propTypes.func.isRequired,
    setSkillLevel: propTypes.func.isRequired,
    fetchUserSkills: propTypes.func.isRequired,
    openLoadingModal: propTypes.func.isRequired,
    closeLoadingModal: propTypes.func.isRequired,
    navigation: propTypes.object.isRequired,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.skills.length !== prevState.skillsRowsStates.length) {
      return {
        skillsRowsStates: new Array(nextProps.skills.length).fill(false),
      };
    }
    return null;
  }
  state = {
    skillsRowsStates: new Array(this.props.skills.length).fill(false),
  };
  changeSkillRowState = (state, index) => {
    this.setState((prevState) => ({
      skillsRowsStates: prevState.skillsRowsStates.map((oldState, i) => (i === index ? state : false)),
    }));
  };
  render() {
    return (
      <ProfileSkills
        toggleHeaderState={this.props.toggleHeaderState}
        isHeaderVisible={this.props.isHeaderVisible}
        existingSkills={this.props.skills}
        deleteUserSkill={this.props.deleteUserSkill}
        setSkillLevel={this.props.setSkillLevel}
        fetchUserSkills={this.props.fetchUserSkills}
        openLoadingModal={this.props.openLoadingModal}
        closeLoadingModal={this.props.closeLoadingModal}
        navigation={this.props.navigation}
        skillsRowsStates={this.state.skillsRowsStates}
        changeSkillRowState={this.changeSkillRowState}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const skillsCopy = [...state.userSkills.skills];
  return {
    skills: skillsCopy.sort((a, b) => (a.skill_level_id > b.skill_level_id ? -1 : 1)),
  };
};

const mapDispatchToProps = { deleteUserSkill, setSkillLevel };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSkillsContainer);
