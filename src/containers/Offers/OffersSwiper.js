import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import Modal from 'react-native-modal';

import { dimensions, colors } from './../../styles/base';
import HeaderBackButton from './../../components/HeaderBackButton/HeaderBackButton';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import ValidationError from './../../components/ValidationError/ValidationError';
import DetailedOffer from './DetailedOffer';
import {
  clearOffersInfo,
  setActiveOffer,
  setOffersSwipeItemIndex,
  checkAndClearSwipeableOffersList,
  changeOfferStatus,
  setShouldFetchOffersStatus,
  markOfferAsViewed,
} from '../../actions/offers';

class OffersSwiper extends Component {
  static navigationOptions = ({ navigation }) => {
    const throttledBack = _.throttle(navigation.goBack, 300, {
      trailing: false,
    });

    let title = '';
    if (navigation.state.params !== undefined) {
      const strLength = navigation.state.params.title.length;
      title = strLength > 21 ? `${navigation.state.params.title.substr(0, 21)}...` : navigation.state.params.title;
    }

    return {
      headerTitle: <HeaderTitle text={navigation.state.params && title} />,
      headerLeft: <HeaderBackButton goTo={() => throttledBack()} />,
      headerRight: <View />,
    };
  };
  static propTypes = {
    navigation: propTypes.object.isRequired,
    skillLevels: propTypes.array.isRequired,
    offers: propTypes.array.isRequired,
    swipeItemIndex: propTypes.number,
    clearOffersInfo: propTypes.func.isRequired,
    setActiveOffer: propTypes.func.isRequired,
    setOffersSwipeItemIndex: propTypes.func.isRequired,
    checkAndClearSwipeableOffersList: propTypes.func.isRequired,
    activeOfferType: propTypes.string.isRequired,
    changeOfferStatus: propTypes.func.isRequired,
    setShouldFetchOffersStatus: propTypes.func.isRequired,
    markOfferAsViewed: propTypes.func.isRequired,
    currentUserId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    dirtyOfferObject: propTypes.object.isRequired,
  };
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  state = {
    hasStatusChanged: false,
    isValidationErrorVisible: false,
    validationMessage: '',
    isUpdatingStateActivity: false,
    isUIBlocked: false,
  };
  componentDidUpdate(prevProps) {
    if (prevProps.offers.length === 1 && !this.props.offers.length) this.props.navigation.goBack();
  }
  componentWillUnmount() {
    this.props.clearOffersInfo();
  }
  onIndexChange = (i) => {
    const newOffer = this.props.offers[i];
    const offerType = newOffer.job ? 'job' : 'task';
    if (!this.state.hasStatusChanged) this.props.setOffersSwipeItemIndex(i);
    this.props.checkAndClearSwipeableOffersList();
    this.props.setActiveOffer(newOffer, offerType);
    this.props.navigation.setParams({
      title: newOffer.job ? newOffer.job.title : newOffer.task.title,
    });
    const entityId = offerType === 'job' ? newOffer.job_id : newOffer.task_id;
    this.props.markOfferAsViewed(this.props.currentUserId, newOffer.offer_id, offerType, entityId);
    this.setState({ hasStatusChanged: false });
  };

  setUpdatingStateActivity = (state) => this.setState({ isUpdatingStateActivity: state });

  setValidationModalState = (state, message) => {
    this.setState({ isValidationErrorVisible: state, validationMessage: this.context.t(message) });
  };
  setPristineToFalse = () => {
    this.setState({ hasStatusChanged: true });
  };
  throttledBack = _.throttle(this.props.navigation.goBack, 300, {
    trailing: false,
  });
  scrollToSlide = () => {
    const { swipeItemIndex, offers } = this.props;
    const offersCount = offers.length;
    if (offersCount === 1) {
      this.throttledBack();
    } else {
      const scrollBy = offersCount === swipeItemIndex + 1 ? -1 : 1;
      if (this.swiperRef) this.swiperRef.current.scrollBy(scrollBy, true);
    }
  };
  changeUIBlockerModalState = (newState) => {
    this.setState({ isUIBlocked: newState });
  };
  swiperRef = React.createRef();
  render() {
    const {
      offers,
      skillLevels,
      navigation,
      activeOfferType,
      changeOfferStatus: changeStatus,
      setShouldFetchOffersStatus: setShouldFetchStatus,
      dirtyOfferObject,
    } = this.props;

    return (
      <React.Fragment>
        <Modal visible={this.state.isUIBlocked} style={{ padding: 0, margin: 0 }}>
          <View pointerEvents="none" style={{ width: dimensions.screenWidth, height: dimensions.screenHeight }} />
        </Modal>
        <Swiper
          showsButtons={false}
          horizontal
          key={offers.length}
          loop={false}
          index={this.props.swipeItemIndex}
          onIndexChanged={this.onIndexChange}
          loadMinimal
          loadMinimalSize={2}
          style={{ backgroundColor: colors.background }}
          showsPagination={false}
          ref={this.swiperRef}
          scrollEnabled={!this.state.isUIBlocked}
        >
          {offers.map((offerObj) => (
            <DetailedOffer
              key={offerObj.timestamp}
              setUpdatingStateActivity={this.setUpdatingStateActivity}
              isUpdatingStateActivity={this.state.isUpdatingStateActivity}
              navigation={navigation}
              skillLevels={skillLevels}
              activeOffer={offerObj}
              dirtyOfferObject={dirtyOfferObject}
              activeOfferType={activeOfferType}
              changeOfferStatus={changeStatus}
              setShouldFetchOffersStatus={setShouldFetchStatus}
              setValidationModalState={this.setValidationModalState}
              scrollToSlide={this.scrollToSlide}
              setPristineToFalse={this.setPristineToFalse}
              showButtons
              changeUIBlockerModalState={this.changeUIBlockerModalState}
            />
          ))}
        </Swiper>
        <ValidationError
          isVisible={this.state.isValidationErrorVisible}
          message={this.state.validationMessage}
          isBottom
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  skillLevels: state.initialData.skillLevels,
  activeOfferType: state.offers.activeOfferType,
  offers: state.offers.swipeableOffers,
  swipeItemIndex: state.offers.activeSwipeableOfferIndex,
  currentUserId: state.user.id,
  dirtyOfferObject: state.offers.dirtyOfferObject,
});

const mapDispatchToProps = {
  clearOffersInfo,
  setActiveOffer,
  setOffersSwipeItemIndex,
  checkAndClearSwipeableOffersList,
  changeOfferStatus,
  setShouldFetchOffersStatus,
  markOfferAsViewed,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OffersSwiper);
