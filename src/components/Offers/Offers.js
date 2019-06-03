import React from 'react';
import { View, FlatList, RefreshControl, Text } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';
import OffersTabs from './OffersTabs/OffersTabs';
import SortingDropDown from './../SearchPeople/DropdownSortBy/DropdownSortBy';
import FilterRow from './../SearchPeople/SearchPeopleHeader/SearchPeopleHeader';
import OfferListItem from './OfferListItem/OfferListItem';

import taskIcon from '../../../assets/clipboardAltIcon.png';
import jobIcon from '../../../assets/bellIcon.png';

class Offers extends React.Component {
  keyExtractor = (item) => String(item.timestamp);

  renderOffer = ({ item }) => {
    const type = item.job_id ? 'job' : 'task';
    return (
      <OfferListItem
        itemId={item[type].id}
        name={item[type].title || 'Unknown'}
        location={item[type].city ? `${item[type].city}, ${item[type].country}` : ''}
        time={item.offer_status === 'new' ? item.timestamp : item.updated}
        type={type}
        icon={type === 'task' ? taskIcon : jobIcon}
        onDelete={() => {}}
        onItemPress={() => this.props.onOfferPress(item)}
        isArchive={item[type].is_archived}
        disableSwipe
      />
    );
  };

  renderEmptyComponent = () => {
    const { isRefreshing, tabs, activeTabIndex } = this.props;
    const { t } = this.context;

    return tabs[activeTabIndex] === 'New' && !isRefreshing ? (
      <View style={styles.emptyWrapper}>
        <Text style={styles.noInvitations}>{t('You have no invitations yet')}</Text>
      </View>
    ) : null;
  };

  render() {
    const {
      tabs,
      activeTabIndex,
      onTabPress,
      animationLeft,
      animationWidth,
      onTabLayout,
      isSortingDropDownOpen,
      sortingOptions,
      setModalState,
      offers,
      newOffersCount,
      acceptedOffersCount,
      rejectedOffersCount,
      isRefreshing,
      fetchOffers,
      setOffersSorting,
      activeSorting,
      navigateToFilter,
      isFilterActive,
    } = this.props;

    return (
      <View style={styles.container}>
        <OffersTabs
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          onTabPress={onTabPress}
          animationLeft={animationLeft}
          animationWidth={animationWidth}
          onTabLayout={onTabLayout}
          newOffersCount={newOffersCount}
          acceptedOffersCount={acceptedOffersCount}
          rejectedOffersCount={rejectedOffersCount}
        />
        <FilterRow
          handlerSortByDropdown={(state) => setModalState('isSortingDropDownOpen', state)}
          isSortOpen={isSortingDropDownOpen}
          navigateToFilter={navigateToFilter}
          isFilterActive={isFilterActive}
        />
        {isSortingDropDownOpen && (
          <SortingDropDown
            items={sortingOptions}
            filterBy={(item) => setOffersSorting(item)}
            closeDropDown={() => setModalState('isSortingDropDownOpen', false)}
            selectedSorting={activeSorting}
          />
        )}
        <FlatList
          contentContainerStyle={styles.list}
          style={{ flex: 1 }}
          data={offers}
          renderItem={this.renderOffer}
          keyExtractor={this.keyExtractor}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={fetchOffers} />}
          ListEmptyComponent={this.renderEmptyComponent}
        />
      </View>
    );
  }
}

Offers.propTypes = {
  tabs: propTypes.array.isRequired,
  activeTabIndex: propTypes.number.isRequired,
  onTabPress: propTypes.func.isRequired,
  animationLeft: propTypes.object.isRequired,
  animationWidth: propTypes.object.isRequired,
  onTabLayout: propTypes.func.isRequired,
  sortingOptions: propTypes.array.isRequired,
  setModalState: propTypes.func.isRequired,
  isSortingDropDownOpen: propTypes.bool.isRequired,
  offers: propTypes.array.isRequired,
  newOffersCount: propTypes.number.isRequired,
  acceptedOffersCount: propTypes.number.isRequired,
  rejectedOffersCount: propTypes.number.isRequired,
  isRefreshing: propTypes.bool.isRequired,
  fetchOffers: propTypes.func.isRequired,
  setOffersSorting: propTypes.func.isRequired,
  activeSorting: propTypes.string.isRequired,
  onOfferPress: propTypes.func.isRequired,
  navigateToFilter: propTypes.func,
  isFilterActive: propTypes.bool,
};

Offers.contextTypes = {
  t: propTypes.func.isRequired,
};

export default Offers;
