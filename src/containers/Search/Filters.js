import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { throttle } from 'lodash';

import {
  fetchLocationsJobsTask,
  selectLocation,
  setLocationsJobsTask,
  fetchFiltersJobsTask,
  fetchFilterLocations,
  checkLocationFilter,
  applyActivityFilter,
  resetActivityFilter,
  checkAccountFilter,
} from '../../actions/tasksJobs';

import { selectFilterLocations, selectActiveTab, getFilterAccounts } from '../../selectors/activities';
// import { selectMySubstituteStatus } from '../../selectors/user';

import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import HeaderRightTextButton from '../../components/HeaderRightTextButton/HeaderRightTextButton';
import Filters from '../../components/Filters/Filters';
import SearchFilter from '../../components/Filters/SearchFilter/SearchFilter';

class FiltersContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <HeaderBackButton
        goTo={() => {
          navigation.goBack();
          if (navigation.state.params) navigation.state.params.cancelButton();
        }}
        title="Cancel"
      />
    ),
    screenTitle: 'Filter',
    headerRight: (
      <HeaderRightTextButton action={navigation.state.params && navigation.state.params.resetAction} text="Reset" />
    ),
  });

  static propTypes = {
    navigation: propTypes.object.isRequired,
    setLocationsJobsTask: propTypes.func.isRequired,
    locations: propTypes.array.isRequired,
    accounts: propTypes.array.isRequired,
    fetchFilterLocations: propTypes.func.isRequired,
    checkLocationFilter: propTypes.func.isRequired,
    applyActivityFilter: propTypes.func.isRequired,
    activeTab: propTypes.string.isRequired,
    resetActivityFilter: propTypes.func.isRequired,
    checkAccountFilter: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentTab: props.navigation.state.params.fromTab,
      oldLocations: [...props.locations],
      passValue: '',
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    // this.setLoadLocationsStatus(true);
    this.props.fetchFilterLocations(() => {});

    this.props.navigation.setParams({ cancelButton: this.cancelButton });
    this.props.navigation.setParams({ resetAction: this.resetAction });
  }

  onApplyFilter = () => {
    const locations = this.props.locations
      .filter((item) => item.isChecked)
      .map((item) => ({ city: item.city, country: item.country }));

    const selectedAccountIds = this.props.accounts.filter((account) => account.isChecked).map((account) => account.id);

    this.props.applyActivityFilter(locations, selectedAccountIds, this.props.activeTab, () => this.navigateBack());
  };

  onChangeText = (value) => {
    this.setState({ passValue: value });
  };

  onLocationSelect = (itemId) => {
    this.props.checkLocationFilter(itemId);
  };

  onAccountSelect = (itemId) => {
    this.props.checkAccountFilter(itemId);
  };

  cancelButton = () => {
    this.props.setLocationsJobsTask(this.state.oldLocations);
  };

  navigateBack = throttle(this.props.navigation.goBack, 300, {
    trailing: false,
  });

  resetAction = () => {
    this.props.resetActivityFilter(this.props.activeTab, () => {
      this.navigateBack();
    });
  };

  focusInput = () => {
    this.inputRef.current.focus();
  };

  clearInput = () => {
    this.setState({ passValue: '' });
  };

  render() {
    const { passValue, currentTab } = this.state;
    const { accounts, locations } = this.props;

    const filteredLocations = locations.filter((e) => e.city.includes(passValue));

    return (
      <Filters onApplyFilter={this.onApplyFilter} resetAction={this.resetAction}>
        <SearchFilter
          showAccountsFilter={Boolean(accounts.length)}
          locations={filteredLocations}
          accounts={accounts}
          passValue={passValue}
          onChangePass={this.onChangeText}
          onLocationSelect={this.onLocationSelect}
          onAccountSelect={this.onAccountSelect}
          focusInput={this.focusInput}
          inputRef={this.inputRef}
          clearInput={this.clearInput}
          currentTab={currentTab}
        />
      </Filters>
    );
  }
}

const mapStateToProps = (state) => ({
  newFilterBy: state.offers.newFilterBy,
  acceptedFilterBy: state.offers.acceptedFilterBy,
  declinedFilterBy: state.offers.declinedFilterBy,
  locations: selectFilterLocations(state),
  accounts: getFilterAccounts(state),
  activeTab: selectActiveTab(state),
});

const mapDispatchToProps = {
  fetchLocationsJobsTask,
  selectLocation,
  setLocationsJobsTask,
  fetchFiltersJobsTask,
  fetchFilterLocations,
  checkLocationFilter,
  applyActivityFilter,
  resetActivityFilter,
  checkAccountFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FiltersContainer);
