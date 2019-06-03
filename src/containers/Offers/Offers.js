import React, { Component } from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import _ from 'lodash';

import Offers from '../../components/Offers/Offers';
import {
  setOffersTabIndex,
  fetchOffers,
  setOffersSortingType,
  setActiveOffer,
  setShouldFetchOffersStatus,
  setOffersSwipeItemIndex,
  setSwipeableOffers,
  markOfferAsViewed,
} from '../../actions/offers';
import {
  selectOffers,
  selectActiveTab,
  selectActiveFilter,
  selectNewUnViewedCount,
  selectAcceptedUnViewedCount,
  selectRejectedUnViewedCount,
} from '../../selectors/offers';

class OffersContainer extends Component {
  static propTypes = {
    navigation: propTypes.object.isRequired,
    setOffersTabIndex: propTypes.func.isRequired,
    tabs: propTypes.array.isRequired,
    activeTabIndex: propTypes.number.isRequired,
    activeFilter: propTypes.string.isRequired,
    fetchOffers: propTypes.func.isRequired,
    setOffersSortingType: propTypes.func.isRequired,
    offers: propTypes.array.isRequired,
    newOffersCount: propTypes.number.isRequired,
    acceptedOffersCount: propTypes.number.isRequired,
    rejectedOffersCount: propTypes.number.isRequired,
    activeTab: propTypes.string.isRequired,
    activeSorting: propTypes.string.isRequired,
    setActiveOffer: propTypes.func.isRequired,
    shouldFetch: propTypes.bool.isRequired,
    setShouldFetchOffersStatus: propTypes.func.isRequired,
    setOffersSwipeItemIndex: propTypes.func.isRequired,
    setSwipeableOffers: propTypes.func.isRequired,
    markOfferAsViewed: propTypes.func.isRequired,
    lang: propTypes.string.isRequired,
    currentUserId: propTypes.oneOfType([propTypes.number, propTypes.string]),
  };
  state = {
    tabsCoordinates: [
      { width: new Animated.Value(0), left: new Animated.Value(0) },
      { width: new Animated.Value(0), left: new Animated.Value(0) },
      { width: new Animated.Value(0), left: new Animated.Value(0) },
      { width: new Animated.Value(0), left: new Animated.Value(0) },
    ],
    animationWidth: new Animated.Value(0),
    animationLeft: new Animated.Value(0),
    sortingOptions: [
      {
        name: 'location',
        text: 'Location',
      },
      {
        name: 'receivedDate',
        text: 'Received Date',
      },
      {
        name: 'alphabet',
        text: 'Alphabet',
      },
      {
        name: 'category',
        text: 'Category',
      },
    ],
    isSortingDropDownOpen: false,
    isRefreshing: false,
    layoutFinished: false,
  };
  componentDidMount() {
    this.fetchOffers();
    this.onFocus = this.props.navigation.addListener('didFocus', () => {
      // if (this.props.navigation.state.params && this.props.navigation.state.params.shouldUpdate) this.fetchOffers();
      if (this.props.shouldFetch) {
        this.fetchOffers();
        this.props.setShouldFetchOffersStatus(false);
      }
    });
    this.props.navigation.setParams({ lang: this.props.lang });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.layoutFinished) {
      this.onTabPress(this.props.activeTabIndex, false);
    }
  }
  componentWillUnmount() {
    this.onFocus.remove();
  }

  onTabPress = (i) => {
    const newLeftCoordinate = this.state.tabsCoordinates
      .slice(0, i)
      .reduce((accum, obj) => accum + obj.width._startingValue, 0);

    if (this.state.layoutFinished) {
      this.setState({ layoutFinished: null });
    }

    Animated.parallel([
      Animated.timing(this.state.animationWidth, {
        toValue: this.state.tabsCoordinates[i].width._startingValue,
        duration: 500,
      }),
      Animated.timing(this.state.animationLeft, {
        toValue: newLeftCoordinate,
        duration: 500,
      }),
    ]).start(() => {
      this.setState({
        animationWidth: new Animated.Value(this.state.tabsCoordinates[i].width._startingValue),
        animationLeft: new Animated.Value(newLeftCoordinate),
      });
    });
    this.props.setOffersTabIndex(i);
  };

  onTabLayout = (event, index) => {
    const { width } = event.nativeEvent.layout;

    const newObj = { ...this.state.tabsCoordinates[index], width: new Animated.Value(width) };
    const newCoordsObj = [...this.state.tabsCoordinates];
    newCoordsObj[index] = newObj;
    const updateObj = { tabsCoordinates: newCoordsObj };
    if (index === 0) updateObj.animationWidth = new Animated.Value(width);
    if (index === 3) this.setState({ layoutFinished: true });
    this.setState(updateObj);
  };

  onSortingOptionsPress = (item) => {
    this.setState({ isSortingDropDownOpen: false });
    this.props.setOffersSortingType(item.name);
  };

  onOfferPress = (offer) => {
    const { offers } = this.props;
    const entity = offer.task !== undefined ? 'task' : 'job';
    this.props.setActiveOffer(offer, entity);
    const id = offer[`${entity}_id`];
    const index = offers.findIndex((offerObj) => offerObj[`${entity}_id`] === id);
    this.props.setSwipeableOffers(offers);
    this.props.setOffersSwipeItemIndex(index);
    this.props.markOfferAsViewed(this.props.currentUserId, offer.offer_id, entity, id);
    this.throttledNavigate('OffersSwiper', { title: offer[entity].title });
  };

  setModalState = (name, state) => {
    this.setState({ [name]: state });
  };

  throttledNavigate = _.throttle(this.props.navigation.navigate, 300, { trailing: false });

  fetchOffers = () => {
    this.setState({ isRefreshing: true });
    this.props.fetchOffers(() => {
      this.setState({ isRefreshing: false });
    });
  };

  navigateToFilter = () => this.throttledNavigate('Filters', { fromTab: this.props.activeTab.toLowerCase() });

  render() {
    const {
      tabs,
      activeTabIndex,
      offers,
      activeFilter,
      acceptedOffersCount,
      rejectedOffersCount,
      newOffersCount,
    } = this.props;

    const isFilterActive = activeFilter !== 'none';

    return (
      <Offers
        isFilterActive={isFilterActive}
        navigateToFilter={this.navigateToFilter}
        offers={offers}
        newOffersCount={newOffersCount}
        acceptedOffersCount={acceptedOffersCount}
        rejectedOffersCount={rejectedOffersCount}
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        onTabPress={this.onTabPress}
        animationLeft={this.state.animationLeft}
        animationWidth={this.state.animationWidth}
        onTabLayout={this.onTabLayout}
        sortingOptions={this.state.sortingOptions}
        isSortingDropDownOpen={this.state.isSortingDropDownOpen}
        setModalState={this.setModalState}
        isRefreshing={this.state.isRefreshing}
        fetchOffers={this.fetchOffers}
        setOffersSorting={this.onSortingOptionsPress}
        activeSorting={this.props.activeSorting}
        onOfferPress={this.onOfferPress}
      />
    );
  }
}

const mapDispatchToProps = {
  setOffersTabIndex,
  fetchOffers,
  setOffersSortingType,
  setActiveOffer,
  setShouldFetchOffersStatus,
  setOffersSwipeItemIndex,
  setSwipeableOffers,
  markOfferAsViewed,
};

const mapStateToProps = (state) => ({
  tabs: state.offers.tabs,
  activeTabIndex: state.offers.activeTabIndex,
  offers: selectOffers(state),
  activeTab: selectActiveTab(state),
  activeFilter: selectActiveFilter(state),
  newOffersCount: selectNewUnViewedCount(state),
  acceptedOffersCount: selectAcceptedUnViewedCount(state),
  rejectedOffersCount: selectRejectedUnViewedCount(state),
  activeSorting: state.offers.sorting,
  shouldFetch: state.offers.shouldFetch,
  currentUserId: state.user.id,
  lang: state.i18nState.lang,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OffersContainer);
