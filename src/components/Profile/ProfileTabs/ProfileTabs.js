import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import propTypes from 'prop-types';
import styles from './styles';
import { colors } from './../../../styles/base';

export const ProfileTabs = ({ tabs, onTabLayout, animationLeft, animationWidth, activeTab, onTabPress }, { t }) => {
  const renderTabs = (tabsToRender, activeTabIndex) =>
    tabsToRender.map((tab, i) => (
      <TouchableOpacity style={styles.tabWrapper} key={tab} onPress={() => onTabPress(i)} activeOpacity={1}>
        <View onLayout={(e) => onTabLayout(e, i)} style={styles.tab}>
          <Text style={[styles.tabName, activeTabIndex === i ? { color: colors.secondary } : {}]}>{t(tab)}</Text>
        </View>
      </TouchableOpacity>
    ));
  return (
    <View style={styles.tabsScrollWrapper}>
      <ScrollView contentContainerStyle={styles.tabsWrapper} horizontal showsHorizontalScrollIndicator={false}>
        {renderTabs(tabs, activeTab)}
      </ScrollView>
      <Animated.View style={[styles.tabBottomLine, { marginLeft: animationLeft, width: animationWidth }]} />
    </View>
  );
};

ProfileTabs.propTypes = {
  tabs: propTypes.arrayOf(propTypes.string),
  onTabPress: propTypes.func,
  activeTab: propTypes.number,
  onTabLayout: propTypes.func,
  animationLeft: propTypes.object,
  animationWidth: propTypes.oneOfType([propTypes.number, propTypes.object]),
};
ProfileTabs.contextTypes = {
  t: propTypes.func.isRequired,
};
export default ProfileTabs;
