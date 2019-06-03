import React, { Component } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, RefreshControl, Animated, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { translateTitle } from '../../translations/navigation';

import ProfileHeader from './ProfileHeader';
import ProfileSkills from './ProfileSkills';
import ProfileLocations from './ProfileLocations';
import ProfileDetails from './ProfileDetails';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';
import HeaderRightTextButton from './../../components/HeaderRightTextButton/HeaderRightTextButton';
import LoadingModal from './../../components/LoadingModal/LoadingModal';
import ValidationError from './../../components/ValidationError/ValidationError';
import { fetchUserSkills } from '../../actions/skills';
import { fetchUserData, fetchUserProfile } from '../../actions/user';
import { fetchUserLocations } from '../../actions/locations';
import { colors } from './../../styles/base';

const isIOS = Platform.OS === 'ios';

class ProfileContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    const lang = navigation.getParam('lang');
    let headerRight = <View />;
    let headerLeft = <View />;
    if (navigation.state.params) {
      if (navigation.state.params.activeTabIndex === 2 && !navigation.state.params.isLocationPickerOpened) {
        headerRight = (
          <HeaderRightTextButton
            text={translateTitle(lang, 'Save')}
            action={(event) => navigation.state.params.onSubmit(event)}
          />
        );
      } else if (navigation.state.params.isSkillsSelectionActive) {
        if (navigation.state.params.showSaveSkillsButton) {
          headerRight = (
            <HeaderRightTextButton
              text={translateTitle(lang, 'Save')}
              action={() => navigation.state.params.onSkillsSave()}
            />
          );
        }
        headerLeft = (
          <HeaderRightTextButton
            isLeft
            text={translateTitle(lang, 'Cancel')}
            action={() => navigation.state.params.onSkillsCancel()}
          />
        );
      } else if (navigation.state.params.isLocationSelectionActive) {
        if (navigation.state.params.showSaveLocationButton) {
          headerRight = (
            <HeaderRightTextButton
              text={translateTitle(lang, 'Save')}
              action={() => navigation.state.params.onLocationSave()}
            />
          );
        }
        if (navigation.state.params.showCancelLocationButton) {
          headerLeft = (
            <HeaderRightTextButton
              isLeft
              text={translateTitle(lang, 'Cancel')}
              action={() => navigation.state.params.onLocationCancel()}
            />
          );
        }
      }
    }
    return {
      headerRight,
      headerLeft,
      headerMode: 'none',
      tabBarVisible: navigation.state.params && !navigation.state.params.hideTabBar,
    };
  };
  static propTypes = {
    navigation: propTypes.object.isRequired,
    fetchUserSkills: propTypes.func.isRequired,
    fetchUserData: propTypes.func.isRequired,
    fetchUserLocations: propTypes.func.isRequired,
    fetchUserProfile: propTypes.func.isRequired,
    lang: propTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.counter = 0;
    this.tabsCoordinates = [{ width: 0, left: 0 }, { width: 0, left: 0 }, { width: 0, left: 0 }];
  }

  state = {
    tabs: ['Skills', 'Locations', 'Details'],
    activeTabIndex: 0,
    isHeaderVisible: true,
    isLoadingModalVisible: true,
    animationLeft: new Animated.Value(0),
    animationWidth: 0,
    isRefreshing: false,
    validationErrorMessage: '',
    isValidationErrorVisible: false,
    locationsScrollViewHeight: 'auto',
  };

  componentDidMount() {
    this.props.fetchUserData(() => {
      setTimeout(() => {
        this.setState({ isLoadingModalVisible: false });
      }, 400);
    });
    this.props.navigation.setParams({ lang: this.props.lang });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeTabIndex !== prevState.activeTabIndex) {
      this.props.navigation.setParams({ activeTabIndex: this.state.activeTabIndex });
    }
    if (this.props.lang !== this.props.navigation.getParam('lang')) {
      this.props.navigation.setParams({ lang: this.props.lang });
    }
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  onTabPress = (i) => {
    this.setState({ activeTabIndex: i });
    Animated.parallel(
      [
        Animated.timing(this.state.animationLeft, {
          toValue: this.tabsCoordinates[i].left,
          duration: 500,
        }),
        Animated.timing(this.state.animationWidth, {
          toValue: this.tabsCoordinates[i].width,
          duration: 500,
        }),
      ],
      {
        stopTogether: false,
        useNativeDriver: true,
      },
    ).start();
  };
  onTabLayout = (event, index) => {
    const { width } = event.nativeEvent.layout;
    this.tabsCoordinates[index].width = width;
    if (this.counter === 2) {
      this.tabsCoordinates[1].left = this.tabsCoordinates[0].width;
      this.tabsCoordinates[2].left = this.tabsCoordinates[0].width + this.tabsCoordinates[1].width;
      this.setState({ animationWidth: new Animated.Value(this.tabsCoordinates[0].width) });
    }
    this.counter = this.counter + 1;
  };
  keyboardDidHide = () => {
    this.setState({ locationsScrollViewHeight: 'auto' });
  };
  keyboardDidShow = () => {
    this.setState({ locationsScrollViewHeight: 310 });
  };
  toggleHeaderState = (state) => {
    this.setState({ isHeaderVisible: state });
  };
  fetchSkills = () => {
    this.setState({ isRefreshing: true });
    this.props.fetchUserSkills(() => {
      this.setState({ isRefreshing: false });
    });
  };
  fetchUserLocations = () => {
    this.setState({ isRefreshing: true });
    this.props.fetchUserLocations(() => {
      this.setState({ isRefreshing: false });
    });
  };
  fetchUserProfile = () => {
    this.setState({ isRefreshing: true });
    this.props.fetchUserProfile(() => {
      setTimeout(() => {
        this.setState({ isRefreshing: false });
      }, 400);
    });
  };
  closePopupModal = () => {
    setTimeout(() => {
      this.setState({ validationErrorMessage: '', isValidationErrorVisible: false });
    }, 4000);
  };
  popupModalFunc = (e) => {
    this.setState(e);
    this.closePopupModal();
  };
  renderTab = (i) => {
    const outerScrollStyles = Platform.OS === 'ios' ? { flex: 1 } : { height: this.state.locationsScrollViewHeight };
    switch (i) {
      case 0: {
        return (
          <React.Fragment>
            {this.state.isHeaderVisible ? (
              <ScrollView
                keyboardShouldPersistTaps="always"
                scrollEnabled={this.state.isHeaderVisible}
                refreshControl={
                  <RefreshControl
                    enabled={this.state.isHeaderVisible}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.fetchSkills}
                  />
                }
              >
                <ProfileHeader isHeaderVisible={this.state.isHeaderVisible} />
                <ProfileSkills
                  fetchUserSkills={this.props.fetchUserSkills}
                  toggleHeaderState={this.toggleHeaderState}
                  isHeaderVisible={this.state.isHeaderVisible}
                  openLoadingModal={() => this.setState({ isLoadingModalVisible: true })}
                  closeLoadingModal={() => this.setState({ isLoadingModalVisible: false })}
                  navigation={this.props.navigation}
                />
              </ScrollView>
            ) : (
              <View style={{ flex: 1 }}>
                <ProfileHeader isHeaderVisible={this.state.isHeaderVisible} />
                <ProfileSkills
                  fetchUserSkills={this.props.fetchUserSkills}
                  toggleHeaderState={this.toggleHeaderState}
                  isHeaderVisible={this.state.isHeaderVisible}
                  openLoadingModal={() => this.setState({ isLoadingModalVisible: true })}
                  closeLoadingModal={() => this.setState({ isLoadingModalVisible: false })}
                  navigation={this.props.navigation}
                />
              </View>
            )}
          </React.Fragment>
        );
      }
      case 1: {
        return (
          <React.Fragment>
            <ScrollView
              contentContainerStyle={this.state.isHeaderVisible ? {} : outerScrollStyles}
              keyboardShouldPersistTaps="always"
              scrollEnabled={this.state.isHeaderVisible}
              refreshControl={
                <RefreshControl
                  enabled={this.state.isHeaderVisible}
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.fetchUserLocations}
                />
              }
            >
              <ProfileHeader isHeaderVisible={this.state.isHeaderVisible} />
              <ProfileLocations
                fetchUserLocations={this.props.fetchUserLocations}
                toggleHeaderState={this.toggleHeaderState}
                openLoadingModal={() => this.setState({ isLoadingModalVisible: true })}
                closeLoadingModal={() => this.setState({ isLoadingModalVisible: false })}
                isHeaderVisible={this.state.isHeaderVisible}
                navigation={this.props.navigation}
              />
            </ScrollView>
          </React.Fragment>
        );
      }
      case 2: {
        return (
          <React.Fragment>
            <ValidationError
              isVisible={this.state.isValidationErrorVisible}
              message={this.state.validationErrorMessage}
              isBottom
            />
            {isIOS ? (
              <KeyboardAvoidingView
                keyboardVerticalOffset={68}
                behavior="padding"
                keyboardShouldPersistTaps="always"
                enabled
                keyboardDismissMode="interactive"
                // style={styles.inputsContainer}
              >
                <ScrollView
                  keyboardDismissMode="interactive"
                  keyboardShouldPersistTaps="always"
                  scrollEnabled={this.state.isHeaderVisible}
                  // contentContainerStyle={this.state.isHeaderVisible ? {} : outerScrollStyles}
                  refreshControl={
                    <RefreshControl
                      enabled={this.state.isHeaderVisible}
                      refreshing={this.state.isRefreshing}
                      onRefresh={this.fetchUserProfile}
                    />
                  }
                >
                  <ProfileHeader isHeaderVisible={this.state.isHeaderVisible} />
                  <ProfileDetails
                    fetchUserProfile={this.props.fetchUserProfile}
                    navigation={this.props.navigation}
                    toggleHeaderState={this.toggleHeaderState}
                    popupModalFunc={this.popupModalFunc}
                  />
                </ScrollView>
              </KeyboardAvoidingView>
            ) : (
              <ScrollView
                // keyboardDismissMode={isIOS ? 'interactive' : 'on-drag'}
                keyboardShouldPersistTaps="always"
                scrollEnabled={this.state.isHeaderVisible}
                contentContainerStyle={
                  this.state.isHeaderVisible
                    ? {}
                    : { height: this.state.locationsScrollViewHeight === 310 ? 360 : 'auto' }
                }
                refreshControl={
                  <RefreshControl
                    enabled={this.state.isHeaderVisible}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.fetchUserProfile}
                  />
                }
              >
                <ProfileHeader isHeaderVisible={this.state.isHeaderVisible} />
                <ProfileDetails
                  fetchUserProfile={this.props.fetchUserProfile}
                  navigation={this.props.navigation}
                  toggleHeaderState={this.toggleHeaderState}
                  popupModalFunc={this.popupModalFunc}
                />
              </ScrollView>
            )}
          </React.Fragment>
        );
      }
      default: {
        return <ProfileSkills />;
      }
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <LoadingModal
          visible={this.state.isLoadingModalVisible}
          closeModal={() => this.setState({ isLoadingModalVisible: false })}
        />
        {this.state.isHeaderVisible ? (
          <ProfileTabs
            tabs={this.state.tabs}
            activeTab={this.state.activeTabIndex}
            onTabPress={this.onTabPress}
            onTabLayout={this.onTabLayout}
            animationLeft={this.state.animationLeft}
            animationWidth={this.state.animationWidth}
          />
        ) : null}
        {this.renderTab(this.state.activeTabIndex)}
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  lang: state.i18nState.lang,
});
const mapDispatchToProps = { fetchUserSkills, fetchUserData, fetchUserLocations, fetchUserProfile };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileContainer);
