import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { throttle } from 'lodash';

import {
  filterMatchingUsers,
  fullMatchingFilterReset,
  setMatchingFilterValue,
  changeSeniorityCheckboxState,
} from '../../actions/matching';
import { selectSeniorities } from './../../selectors/matching';

import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import HeaderRightTextButton from '../../components/HeaderRightTextButton/HeaderRightTextButton';
import Filters from '../../components/Filters/Filters';
import MatchingFilters from '../../components/Filters/MatchingFilters/MatchingFilters';

class FiltersContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} title="Cancel" />,
    screenTitle: 'Filters',
    headerRight: (
      <HeaderRightTextButton action={navigation.state.params && navigation.state.params.resetAction} text="Reset" />
    ),
  });

  static propTypes = {
    navigation: propTypes.object.isRequired,
    currentActivityType: propTypes.string.isRequired,
    filterMatchingUsers: propTypes.func.isRequired,
    activityId: propTypes.number.isRequired,
    fullMatchingFilterReset: propTypes.func.isRequired,
    changeSeniorityCheckboxState: propTypes.func.isRequired,
    senioritiesWithStates: propTypes.array.isRequired,
  };

  state = {
    inputValue: '',
    isLoading: false,
  };
  componentDidMount() {
    this.props.navigation.setParams({ resetAction: this.resetAction });
  }

  onApplyFilter = () => {
    const { currentActivityType, activityId, filterMatchingUsers: filterUsers, senioritiesWithStates } = this.props;
    const senioritiesNames = senioritiesWithStates
      .filter((item) => item.seniority_level_name !== 'All' && item.isActive)
      .map((item) => item.seniority_level_name);
    this.setState({ isLoading: true });
    filterUsers(currentActivityType, activityId, 0, senioritiesNames, () => {
      this.onModalClose();
      this.navigateBack();
    });
  };
  onModalClose = () => {
    this.setState({ isLoading: false });
  };
  onInputValueChange = (value) => this.setState({ inputValue: value });
  navigateBack = throttle(this.props.navigation.goBack, 300, {
    trailing: false,
  });

  inputRef = React.createRef();

  resetAction = () => {
    this.props.fullMatchingFilterReset();
  };
  clearInput = () => {
    this.setState({ inputValue: '' });
  };
  focusInput = () => {
    this.inputRef.current.focus();
  };
  render() {
    const { inputValue, isLoading } = this.state;
    const { changeSeniorityCheckboxState: onCheckboxPress, senioritiesWithStates } = this.props;
    const filteredSeniorities = senioritiesWithStates.filter((item) => item.seniority_level_name.includes(inputValue));

    return (
      <Filters
        onApplyFilter={this.onApplyFilter}
        resetAction={this.resetAction}
        isLoading={isLoading}
        onModalClose={this.onModalClose}
      >
        <MatchingFilters
          seniorities={filteredSeniorities}
          inputValue={inputValue}
          onInputValueChange={this.onInputValueChange}
          handlerOnSelect={this.handlerOnSelect}
          focusInput={this.focusInput}
          inputRef={this.inputRef}
          clearInput={this.clearInput}
          onCheckboxPress={onCheckboxPress}
        />
      </Filters>
    );
  }
}

const mapStateToProps = (state) => ({
  currentActivityType: state.matching.currentActivityType,
  currentMatchingTab: state.matching.currentMatchingTab,
  activityId: state.matching.activeItem.id,
  senioritiesWithStates: selectSeniorities(state),
});

const mapDispatchToProps = {
  filterMatchingUsers,
  setMatchingFilterValue,
  fullMatchingFilterReset,
  changeSeniorityCheckboxState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FiltersContainer);
