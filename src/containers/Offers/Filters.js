import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { throttle } from 'lodash';

import { filterOffers } from '../../actions/offers';

import HeaderBackButton from '../../components/HeaderBackButton/HeaderBackButton';
import HeaderRightTextButton from '../../components/HeaderRightTextButton/HeaderRightTextButton';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';

import Filters from '../../components/Filters/Filters';
import OfferFilter from '../../components/Filters/OfferFilter/OfferFilter';

class FiltersContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton goTo={() => navigation.goBack()} title="Cancel" />,
    headerTitle: <HeaderTitle text="Filter" />,
    headerRight: (
      <HeaderRightTextButton action={navigation.state.params && navigation.state.params.resetAction} text="Reset" />
    ),
  });

  static propTypes = {
    navigation: propTypes.object.isRequired,
    filterOffers: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const currentFilterState = this.getCurrentFilterState(props);

    this.state = {
      currentTab: props.navigation.state.params.fromTab,
      items: [
        {
          id: 1,
          value: 'Jobs',
          isActive: Boolean(currentFilterState === 'all' || currentFilterState === 'jobs'),
        },
        {
          id: 2,
          value: 'Tasks',
          isActive: Boolean(currentFilterState === 'all' || currentFilterState === 'tasks'),
        },
      ],
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ resetAction: this.resetAction });
  }

  onApplyFilter = () => {
    const { items } = this.state;
    const byJobs = items[0].isActive;
    const byTasks = items[1].isActive;
    let filterBy = 'none';

    if (byJobs && byTasks) {
      filterBy = 'all';
    } else if (!byJobs && byTasks) {
      filterBy = 'tasks';
    } else if (byJobs && !byTasks) {
      filterBy = 'jobs';
    }

    this.props.filterOffers(this.state.currentTab, filterBy);
    this.navigateBack();
  };

  getCurrentFilterState = (props) => {
    const type = props.navigation.state.params.fromTab;
    return this.props[`${type}FilterBy`];
  };

  handlerOnSelect = (index) => {
    const updatedItems = this.state.items.map((item, i) =>
      (index === i ? { ...item, isActive: !item.isActive } : item));
    this.setState({ items: updatedItems });
  };

  navigateBack = throttle(this.props.navigation.goBack, 300, {
    trailing: false,
  });

  resetAction = () => {
    this.props.filterOffers(this.state.currentTab, 'none');
    this.navigateBack();
  };

  render() {
    const { items } = this.state;

    return (
      <Filters onApplyFilter={this.onApplyFilter} resetAction={this.resetAction}>
        <OfferFilter items={items} handlerOnSelect={this.handlerOnSelect} />
      </Filters>
    );
  }
}

const mapStateToProps = (state) => ({
  newFilterBy: state.offers.newFilterBy,
  acceptedFilterBy: state.offers.acceptedFilterBy,
  declinedFilterBy: state.offers.declinedFilterBy,
  interestedFilterBy: state.offers.interestedFilterBy,
});

const mapDispatchToProps = {
  filterOffers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FiltersContainer);
