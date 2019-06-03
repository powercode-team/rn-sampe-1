export const SET_OFFERS_TAB_INDEX = 'SET_OFFERS_TAB_INDEX';
export const setOffersTabIndex = (index) => ({
  type: SET_OFFERS_TAB_INDEX,
  payload: {
    index,
  },
});

export const FETCH_OFFERS = 'FETCH_OFFERS';
export const fetchOffers = (afterRequest) => ({
  type: FETCH_OFFERS,
  payload: {
    afterRequest,
  },
});

export const FETCH_OFFERS_SUCCESS = 'FETCH_OFFERS_SUCCESS';
export const fetchOffersSuccess = (offers) => ({
  type: FETCH_OFFERS_SUCCESS,
  payload: {
    offers,
  },
});

export const FETCH_OFFERS_FAILURE = 'FETCH_OFFERS_FAILURE';
export const fetchOffersFailure = () => ({
  type: FETCH_OFFERS_FAILURE,
});

export const SET_OFFERS_SORTING_TYPE = 'SET_OFFERS_SORTING_TYPE';
export const setOffersSortingType = (sortingOption) => ({
  type: SET_OFFERS_SORTING_TYPE,
  payload: {
    sortingOption,
  },
});

export const SET_ACTIVE_OFFER = 'SET_ACTIVE_OFFER';
export const setActiveOffer = (offer, type) => ({
  type: SET_ACTIVE_OFFER,
  payload: {
    offer,
    type,
  },
});

export const SET_SHOULD_FETCH_OFFERS_STATUS = 'SET_SHOULD_FETCH_OFFERS_STATUS';
export const setShouldFetchOffersStatus = (status) => ({
  type: SET_SHOULD_FETCH_OFFERS_STATUS,
  payload: {
    status,
  },
});

export const CHANGE_OFFER_STATUS = 'CHANGE_OFFER_STATUS';
export const changeOfferStatus = (type, offerId, entityId, status, reasons, comment, callback) => ({
  type: CHANGE_OFFER_STATUS,
  payload: {
    type,
    entityId,
    status,
    reasons,
    comment,
    callback,
    offerId,
  },
});

export const CHANGE_OFFER_STATUS_SUCCESS = 'CHANGE_OFFER_STATUS_SUCCESS';
export const changeOfferStatusSuccess = (offerId) => ({
  type: CHANGE_OFFER_STATUS_SUCCESS,
  payload: {
    offerId,
  },
});

export const CHANGE_OFFER_STATUS_FAILURE = 'CHANGE_OFFER_STATUS_FAILURE';
export const changeOfferStatusFailure = () => ({
  type: CHANGE_OFFER_STATUS_FAILURE,
});

export const CLEAR_OFFERS_INFO = 'CLEAR_OFFERS_INFO';
export const clearOffersInfo = () => ({
  type: CLEAR_OFFERS_INFO,
});

export const SET_SWIPEABLE_OFFERS = 'SET_SWIPEABLE_OFFERS';
export const setSwipeableOffers = (offers) => ({
  type: SET_SWIPEABLE_OFFERS,
  payload: {
    offers,
  },
});

export const CHECK_AND_CLEAR_SWIPEABLE_OFFERS_LIST = 'CHECK_AND_CLEAR_SWIPEABLE_OFFERS_LIST';
export const checkAndClearSwipeableOffersList = () => ({
  type: CHECK_AND_CLEAR_SWIPEABLE_OFFERS_LIST,
});

export const SET_OFFERS_SWIPE_ITEM_INDEX = 'SET_OFFERS_SWIPE_ITEM_INDEX';
export const setOffersSwipeItemIndex = (index) => ({
  type: SET_OFFERS_SWIPE_ITEM_INDEX,
  payload: {
    index,
  },
});

export const FILTER_OFFERS = 'FILTER_OFFERS';
export const filterOffers = (offersType, filterType) => ({
  type: FILTER_OFFERS,
  payload: { offersType, filterType },
});

export const MARK_OFFER_AS_VIEWED = 'MARK_OFFER_AS_VIEWED';
export const markOfferAsViewed = (userId, offerId, type, entityId) => ({
  type: MARK_OFFER_AS_VIEWED,
  payload: {
    userId,
    offerId,
    type,
    entityId,
  },
});

export const MARK_OFFER_AS_VIEWED_SUCCESS = 'MARK_OFFER_AS_VIEWED_SUCCESS';
export const markOfferAsViewedSuccess = (offerId, type) => ({
  type: MARK_OFFER_AS_VIEWED_SUCCESS,
  payload: {
    offerId,
    type,
  },
});

export const MARK_OFFER_AS_VIEWED_FAILURE = 'MARK_OFFER_AS_VIEWED_FAILURE';
export const markOfferAsViewedFailure = () => ({
  type: MARK_OFFER_AS_VIEWED_FAILURE,
});

export const ADD_OFFER = 'ADD_OFFER';
export const addOffer = (offer) => ({
  type: ADD_OFFER,
  payload: {
    offer,
  },
});

export const DELETE_OFFER = 'DELETE_OFFER';
export const deleteOffer = (offerId, offerType) => ({
  type: DELETE_OFFER,
  payload: {
    offerId,
    offerType,
  },
});
