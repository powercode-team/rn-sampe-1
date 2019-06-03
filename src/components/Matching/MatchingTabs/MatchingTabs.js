import React from 'react';
import { View, Animated } from 'react-native';
import propTypes from 'prop-types';

import styles from './styles';

import Tab from './Tab';

export const MatchingTabs = (
  {
    tabs,
    activeTabIndex,
    onTabPress,
    animationLeft,
    animationWidth,
    onTabLayout,
    acceptedUsersCount,
    rejectedUsersCount,
  },
  { t },
) => (
  <View style={styles.tabsWrapper}>
    {tabs.map((tab, i) => {
      let count = null;
      if (tab === 'Interested') count = acceptedUsersCount;
      if (tab === 'Declined') count = rejectedUsersCount;
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

MatchingTabs.propTypes = {
  tabs: propTypes.arrayOf(propTypes.string).isRequired,
  activeTabIndex: propTypes.number.isRequired,
  onTabPress: propTypes.func.isRequired,
  onTabLayout: propTypes.func.isRequired,
  animationLeft: propTypes.object,
  animationWidth: propTypes.oneOfType([propTypes.number, propTypes.object]),
  acceptedUsersCount: propTypes.number.isRequired,
  rejectedUsersCount: propTypes.number.isRequired,
};
MatchingTabs.contextTypes = {
  t: propTypes.func.isRequired,
};
export default MatchingTabs;
