import React, { Component } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';

import DetailedOffer from '../../components/Offers/DetailedOffer/DetailedOffer';
import RejectionModal from '../../components/Offers/Modals/RejectionModal';

class DetailedOfferContainer extends Component {
  static contextTypes = {
    t: propTypes.func.isRequired,
  };
  static propTypes = {
    navigation: propTypes.object.isRequired,
    activeOffer: propTypes.object.isRequired,
    skillLevels: propTypes.array.isRequired,
    setShouldFetchOffersStatus: propTypes.func.isRequired,
    changeOfferStatus: propTypes.func.isRequired,
    activeOfferType: propTypes.string.isRequired,
    setValidationModalState: propTypes.func.isRequired,
    scrollToSlide: propTypes.func.isRequired,
    setPristineToFalse: propTypes.func.isRequired,
    showButtons: propTypes.bool.isRequired,
    dirtyOfferObject: propTypes.object.isRequired,
    changeUIBlockerModalState: propTypes.func,
    setUpdatingStateActivity: propTypes.func,
    isUpdatingStateActivity: propTypes.bool,
  };

  state = {
    isRejectionModalVisible: false,
  };

  onSendDeclinePress = (reasons, comment) => {
    this.declineOffer(reasons, comment);
    this.setModalState('isRejectionModalVisible', false);
  };
  onDeclinePress = () => {
    const { offer_status: offerStatus } = this.props.activeOffer;
    if (offerStatus === 'new' || offerStatus === 'accepted' || offerStatus === 'submitted') {
      this.setModalState('isRejectionModalVisible', true);
    } else {
      this.declineOffer();
    }
  };
  setModalState = (name, state) => {
    this.setState({ [name]: state });
  };
  acceptOffer = (comment) => {
    const { activeOfferType, activeOffer } = this.props;
    const { t } = this.context;
    const entityId = activeOfferType === 'job' ? activeOffer.job_id : activeOffer.task_id;
    if (entityId === this.props.dirtyOfferObject.id) return;
    const newStatus = activeOffer.offer_status === 'accepted' ? 'new' : 'accepted';
    this.props.changeUIBlockerModalState(true);
    this.props.setUpdatingStateActivity(true);
    this.props.changeOfferStatus(activeOfferType, activeOffer.offer_id, entityId, newStatus, null, comment, (err) => {
      if (err) {
        this.props.setValidationModalState(true, 'Error during changing offer status');
        this.props.setUpdatingStateActivity(false);
        setTimeout(() => {
          this.props.setValidationModalState(false, '');
          this.props.changeUIBlockerModalState(false);
        }, 2000);
      } else {
        this.props.setPristineToFalse();
        let message = t('Sent');
        if (newStatus === 'new') message = 'Withdrawn';
        this.props.setValidationModalState(true, message);
        setTimeout(() => {
          this.props.setValidationModalState(false, '');
          this.props.scrollToSlide();
          this.props.changeUIBlockerModalState(false);
        }, 2000);
        this.props.setUpdatingStateActivity(false);
      }
    });
    this.props.setShouldFetchOffersStatus(true);
  };
  declineOffer = (reasons, comment) => {
    const { activeOfferType, activeOffer } = this.props;
    const entityId = activeOfferType === 'job' ? activeOffer.job_id : activeOffer.task_id;
    if (entityId === this.props.dirtyOfferObject.id) return;
    const newStatus = activeOffer.offer_status === 'declined' ? 'new' : 'declined';
    this.props.changeUIBlockerModalState(true);
    this.props.setUpdatingStateActivity(true);
    this.props.changeOfferStatus(
      activeOfferType,
      activeOffer.offer_id,
      entityId,
      newStatus,
      reasons,
      comment,
      (err) => {
        if (err) {
          this.props.setUpdatingStateActivity(false);
          this.props.setValidationModalState(true, 'Error during changing offer status');
          setTimeout(() => {
            this.props.setValidationModalState(false, '');
            this.props.changeUIBlockerModalState(false);
          }, 2000);
        } else {
          this.props.setPristineToFalse();
          let message = 'Invitation declined';
          if (newStatus === 'new') message = 'Undeclined';
          this.props.setValidationModalState(true, message);
          setTimeout(() => {
            this.props.setValidationModalState(false, '');
            this.props.scrollToSlide();
            this.props.changeUIBlockerModalState(false);
          }, 2000);
        }
        this.props.setUpdatingStateActivity(false);
      },
    );
    this.props.setShouldFetchOffersStatus(true);
  };
  throttledReturn = _.throttle(this.props.navigation.goBack, 300, {
    trailing: false,
  });
  render() {
    return (
      <React.Fragment>
        <RejectionModal
          visible={this.state.isRejectionModalVisible}
          closeModal={() => this.setModalState('isRejectionModalVisible', false)}
          onSendPress={this.onSendDeclinePress}
        />
        <DetailedOffer
          isUpdatingStateActivity={this.props.isUpdatingStateActivity}
          skillLevels={this.props.skillLevels}
          onAcceptPress={this.acceptOffer}
          onDeclinePress={this.onDeclinePress}
          offerStatus={this.props.activeOffer.offer_status}
          activeOffer={this.props.activeOffer}
          showButtons={this.props.showButtons}
        />
      </React.Fragment>
    );
  }
}

export default DetailedOfferContainer;
