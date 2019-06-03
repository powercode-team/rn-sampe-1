import React from 'react';
import { View, Animated } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

import Tab from './../../Matching/MatchingTabs/Tab';

export const OffersTabs = (
  {
    tabs,
    activeTabIndex,
    onTabPress,
    animationLeft,
    animationWidth,
    onTabLayout,
    newOffersCount,
    acceptedOffersCount,
    rejectedOffersCount,
  },
  { t },
) => (
  <View style={styles.tabsWrapper}>
    {tabs.map((tab, i) => {
      let count = null;
      if (tab === 'New') count = newOffersCount;
      if (tab === 'Accepted') count = acceptedOffersCount;
      if (tab === 'Declined') count = rejectedOffersCount;
      const isActive = activeTabIndex === i;
      return (
        <Tab
          key={tab}
          tabName={t(tab)}
          isActive={isActive}
          onPress={() => onTabPress(i)}
          count={count}
          onTabLayout={(e) => onTabLayout(e, i)}
          animationLeft={animationLeft}
          animationWidth={animationWidth}
        />
      );
    })}
    <Animated.View style={[styles.tabBottomLine, { left: animationLeft, width: animationWidth }]} />
  </View>
);

OffersTabs.propTypes = {
  tabs: propTypes.arrayOf(propTypes.string).isRequired,
  activeTabIndex: propTypes.number.isRequired,
  onTabPress: propTypes.func.isRequired,
  onTabLayout: propTypes.func.isRequired,
  animationLeft: propTypes.object,
  animationWidth: propTypes.oneOfType([propTypes.number, propTypes.object]),
  newOffersCount: propTypes.number.isRequired,
  acceptedOffersCount: propTypes.number.isRequired,
  rejectedOffersCount: propTypes.number.isRequired,
};

OffersTabs.contextTypes = {
  t: propTypes.func.isRequired,
};
export default OffersTabs;
