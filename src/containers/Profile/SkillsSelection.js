import React, { Component } from 'react';
import { Keyboard, Platform } from 'react-native';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import _ from 'lodash';

import { fetchAPI } from '../../utils/api';
import { saveUserSkills } from '../../actions/skills';
import SkillsSelection from './../../components/Profile/SkillsSelection/SkillsSelection';
import ValidationError from './../../components/ValidationError/ValidationError';
import LoadingModal from './../../components/LoadingModal/LoadingModal';
// import ErrorModal from './../../components/ErrorModal/ErrorModal';
import CheckMarkModal from '../../components/CheckMarkModal/CheckMarkModal';

class SkillsSelectionContainer extends Component {
  static propTypes = {
    toggleHeaderState: propTypes.func.isRequired,
    isHeaderVisible: propTypes.bool.isRequired,
    getSelectedSkills: propTypes.func,
    saveUserSkills: propTypes.func.isRequired,
    existingSkills: propTypes.array,
    onStartShouldSetResponderCaptureNested: propTypes.func,
    expanded: propTypes.bool.isRequired,
    showValidationError: propTypes.func,
    alreadyAddedSkills: propTypes.array,
    addedSkillsForTaskJob: propTypes.array,
    isAddedTaskJob: propTypes.bool,
    navigation: propTypes.object.isRequired,
  };

  state = {
    searchInput: '',
    allSkills: [],
    addedSkills: [],
    relatedSkills: [],
    validationMessage: '',
    isValidationErrorVisible: false,
    isLoadingModalVisible: false,
    isFetching: false,
    isAddedSkillsContainerOpened: true,
    isModalCheckMarkVisible: false,
  };

  componentDidMount() {
    this.props.navigation.setParams({ onSkillsSave: this.submit, onSkillsCancel: this.onCancelClick });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.addedSkills.length &&
      this.props.navigation.state.params &&
      !this.props.navigation.state.params.showSaveSkillsButton
    ) {
      this.props.navigation.setParams({ showSaveSkillsButton: true });
    }
    if (
      !prevState.addedSkills.length &&
      this.props.navigation.state &&
      this.props.navigation.state.params.showSaveSkillsButton
    ) {
      this.props.navigation.setParams({ showSaveSkillsButton: false });
    }
  }

  onSearchInputChange = (value) => {
    this.setState({ searchInput: value, relatedSkills: [] });
    this.debouncedFetchAll(value);
  };

  onInputFocus = () => {
    this.props.toggleHeaderState(false);
    this.props.navigation.setParams({ isSkillsSelectionActive: true });
  };

  onCancelClick = (closeModal) => {
    if (closeModal) {
      this.setState({
        searchInput: '',
        allSkills: [],
        addedSkills: [],
        relatedSkills: [],
        isLoadingModalVisible: false,
      });
    } else {
      this.setState({
        searchInput: '',
        allSkills: [],
        addedSkills: [],
        relatedSkills: [],
      });
    }
    this.props.toggleHeaderState(true);
    this.props.navigation.setParams({ isSkillsSelectionActive: false });
    Keyboard.dismiss();
  };

  onSkillLevelChange = (skillId, level) => {
    const newAddedSkills = this.state.addedSkills.map((skill) => {
      if (skill.skill_id === skillId) return { ...skill, skill_level: level };
      return skill;
    });
    this.setState({ addedSkills: newAddedSkills });
  };
  onStartShouldSetResponderCaptureNested() {
    if (this.props.onStartShouldSetResponderCaptureNested) {
      this.props.onStartShouldSetResponderCaptureNested();
    }
  }

  onCloseCheckMarkModal = () => this.setState({ isModalCheckMarkVisible: false });

  getSelectedSkills() {
    if (this.props.getSelectedSkills) {
      this.props.getSelectedSkills([...this.state.addedSkills]);
      this.onCancelClick();
      return false;
    }
    return true;
  }

  setModalState = (name, state) => {
    this.setState({ [name]: state });
  };

  getAddedSkills() {
    if (this.props.isAddedTaskJob) {
      return this.props.addedSkillsForTaskJob;
    }
    return this.props.alreadyAddedSkills;
  }

  removeSkill = (skillId) => {
    const newAddedSkills = this.state.addedSkills.filter((skill) => skill.skill_id !== skillId);
    this.setState({ addedSkills: newAddedSkills });
  };

  clearInputField = () => {
    this.setState({ searchInput: '', allSkills: [], relatedSkills: [] });
  };

  submit = () => {
    const shouldContinue = this.getSelectedSkills();
    if (shouldContinue) {
      this.setModalState('isLoadingModalVisible', true);
      const skillsToSubmit = this.state.addedSkills.map((obj) => ({
        skill_id: Number(obj.skill_id),
        skill_level_id: Number(obj.skill_level - 1),
      }));
      this.props.saveUserSkills({ skills: skillsToSubmit }, (e) => {
        if (e) {
          this.setState({
            isLoadingModalVisible: false,
            isValidationErrorVisible: true,
            validationMessage: e.msg || e.message || e,
          });
          setTimeout(() => {
            this.setState({ isValidationErrorVisible: false, validationMessage: '' });
          }, 3000);
        } else {
          setTimeout(() => {
            this.onCancelClick(true);
          }, 400);
        }
      });
    }
  };

  addSkill = (chosenSkill, level) => {
    const skillId = chosenSkill.skill_id;
    const newAllSkills = this.state.allSkills.filter((skill) => skill.skill_id !== skillId);
    const newSkill = { ...chosenSkill, skill_level: level, isOpened: false };
    if (this.props.expanded) delete newSkill.skill_level;
    const isAlreadyAdded = this.state.addedSkills.find((skill) => skill.skill_id === skillId);
    const isAlreadyExisting =
      this.props.existingSkills && this.props.existingSkills.find((skill) => skill.skill_id === skillId);
    if (isAlreadyAdded) {
      this.showValidationError('Skill is already added');
      return;
    }
    if (isAlreadyExisting) {
      this.showValidationError('You already have this skill added in your profile');
      return;
    }
    const newAddedSkills = [...this.state.addedSkills, newSkill];
    this.setState({
      isModalCheckMarkVisible: true,
      allSkills: newAllSkills,
      addedSkills: newAddedSkills,
    });
    this.fetchRelatedSkills(skillId);
  };

  fetchRelatedSkills = async (skillId) => {
    const url = `/skill/get_related_skills/id=${skillId}`;
    try {
      const response = await fetchAPI(url, 'GET');
      if (response.status_code === 200) {
        const relatedSkills = response.payload.related_skills.map((relatedSkill) => ({
          ...relatedSkill,
          isOpened: false,
        }));
        if (relatedSkills.length) {
          this.setState({
            relatedSkills,
            allSkills: [],
          });
        }
      }
    } catch (err) {
      this.setState({
        relatedSkills: [],
        allSkills: [],
      });
    }
  };

  showValidationError = (message) => {
    if (this.props.showValidationError) {
      this.props.showValidationError(message);
      return;
    }
    this.setState({ validationMessage: message, isValidationErrorVisible: true });
    setTimeout(() => {
      this.setState({ isValidationErrorVisible: false });
    }, 3000);
  };

  fetchAllSkills = async (skillName) => {
    // const url = `${BASE_URL}/skill/get_skills/name=${skillName}`;
    const url = `/skill/get_skills/name=${skillName}`;
    try {
      if (skillName === '') {
        this.setState({ isFetching: false, allSkills: [] });
        return;
      }
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          this.setState({ isFetching: true });
        }, 200);
      } else {
        this.setState({ isFetching: true });
      }
      const response = await fetchAPI(url, 'GET');
      if (response.status_code === 200) {
        const allSkills = response.payload.skills;
        // remove from the list all the skills that were already added by user
        let uniqueSkills;
        if (this.state.addedSkills.length) {
          uniqueSkills = _.differenceWith(
            allSkills,
            this.state.addedSkills,
            (firstObj, secondObj) => firstObj.skill_id === secondObj.skill_id,
          );
        } else {
          uniqueSkills = allSkills;
        }
        if (uniqueSkills.length > 25) uniqueSkills = uniqueSkills.slice(0, 25);
        uniqueSkills = uniqueSkills.map((skill) => ({ ...skill, isOpened: false }));
        if (this.state.searchInput !== '') {
          if (Platform.OS === 'ios') {
            setTimeout(() => {
              this.setState({
                isFetching: false,
                allSkills: uniqueSkills,
              });
            }, 200);
          } else {
            this.setState({
              isFetching: false,
              allSkills: uniqueSkills,
            });
          }
        }
      }
    } catch (err) {
      setTimeout(() => {
        this.setState({ isFetching: false });
        Keyboard.dismiss();
      }, 400);
    }
  };

  debouncedFetchAll = _.debounce((value) => {
    this.fetchAllSkills(value);
  }, 1000);

  addRelatedSkill = (chosenSkill, level) => {
    const skillId = chosenSkill.related_id;
    const newRelatedSkills = this.state.relatedSkills.filter((skill) => skill.related_id !== skillId);
    const newSkill = {
      skill_id: skillId,
      skill_name: chosenSkill.related_skill_name,
      skill_level: level,
      isOpened: false,
    };
    if (this.props.expanded) delete newSkill.skill_level;
    const isAlreadyAdded = this.state.addedSkills.find((skill) => skill.skill_id === skillId);
    const isAlreadyExisting =
      this.props.existingSkills && this.props.existingSkills.find((skill) => skill.skill_id === skillId);
    if (isAlreadyAdded) {
      this.showValidationError('Skill is already added');
      return;
    }
    if (isAlreadyExisting) {
      this.showValidationError('You already have this skill added in your profile');
      return;
    }
    const newAddedSkills = [...this.state.addedSkills, newSkill];
    this.setState({
      isModalCheckMarkVisible: true,
      relatedSkills: newRelatedSkills,
      addedSkills: newAddedSkills,
    });
  };

  changeRelatedSkillState = (index, state) => {
    if (state) {
      this.setState((prevState) => ({
        relatedSkills: prevState.relatedSkills.map((oldState, i) =>
          (i === index ? { ...oldState, isOpened: state } : { ...oldState, isOpened: false })),
      }));
    }
  };

  changeAllSkillState = (index, state) => {
    if (state) {
      this.setState((prevState) => ({
        allSkills: prevState.allSkills.map((oldState, i) =>
          (i === index ? { ...oldState, isOpened: state } : { ...oldState, isOpened: false })),
      }));
    }
  };

  changeAddedSkillState = (index, state) => {
    if (state) {
      this.setState((prevState) => ({
        addedSkills: prevState.addedSkills.map((oldState, i) =>
          (i === index ? { ...oldState, isOpened: state } : { ...oldState, isOpened: false })),
      }));
    }
  };

  toggleAddedSkillsContainerState = () => {
    this.setState((prevState) => ({ isAddedSkillsContainerOpened: !prevState.isAddedSkillsContainerOpened }));
  };

  render() {
    return (
      <React.Fragment>
        <ValidationError
          message={this.state.validationMessage}
          isVisible={this.state.isValidationErrorVisible}
          isBottom
        />
        <LoadingModal
          visible={this.state.isLoadingModalVisible}
          closeModal={() => this.setModalState('isLoadingModalVisible', false)}
        />
        {/* <ErrorModal
          visible={this.state.isErrorModalVisible}
          closeModal={() => this.setModalState('isErrorModalVisible', false)}
          title={this.state.errorTitle}
          message={this.state.errorMessage}
        /> */}
        <SkillsSelection
          inputValue={this.state.searchInput}
          onInputChange={this.onSearchInputChange}
          clearField={this.clearInputField}
          isHeaderVisible={this.props.isHeaderVisible}
          onInputFocus={this.onInputFocus}
          allSkills={this.state.allSkills}
          addedSkills={this.state.addedSkills}
          relatedSkills={this.state.relatedSkills}
          addSkill={this.addSkill}
          addRelatedSkill={this.addRelatedSkill}
          removeSkill={this.removeSkill}
          onSkillLevelChange={this.onSkillLevelChange}
          onStartShouldSetResponderCaptureNested={() => this.onStartShouldSetResponderCaptureNested()}
          expanded={this.props.expanded}
          alreadyAddedSkills={this.getAddedSkills()}
          changeRelatedSkillState={this.changeRelatedSkillState}
          changeAllSkillState={this.changeAllSkillState}
          skillsAreBeingFetched={this.state.isFetching}
          isAddedSkillsContainerOpened={this.state.isAddedSkillsContainerOpened}
          toggleAddedSkillsContainerState={this.toggleAddedSkillsContainerState}
          changeAddedSkillState={this.changeAddedSkillState}
        />

        <CheckMarkModal isVisible={this.state.isModalCheckMarkVisible} onCloseModal={this.onCloseCheckMarkModal} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { saveUserSkills };
const mapStateToProps = (state) => ({
  alreadyAddedSkills: state.userSkills.skills,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillsSelectionContainer);
