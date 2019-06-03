import {
  SET_OFFERS_TAB_INDEX,
  FETCH_OFFERS_SUCCESS,
  SET_OFFERS_SORTING_TYPE,
  SET_ACTIVE_OFFER,
  SET_SHOULD_FETCH_OFFERS_STATUS,
  CLEAR_OFFERS_INFO,
  SET_OFFERS_SWIPE_ITEM_INDEX,
  SET_SWIPEABLE_OFFERS,
  CHECK_AND_CLEAR_SWIPEABLE_OFFERS_LIST,
  CHANGE_OFFER_STATUS_SUCCESS,
  FILTER_OFFERS,
  ADD_OFFER,
  DELETE_OFFER,
  MARK_OFFER_AS_VIEWED_SUCCESS,
} from '../actions/offers';
import { LOGOUT_SUCCESS } from '../actions/auth';

function modifyOfferById(oldArray, offerId, fieldName, fieldValue) {
  return oldArray.map((item) => (item.offer_id === offerId ? { ...item, [fieldName]: fieldValue } : item));
}

const initialState = {
  tabs: ['New', 'Interested', 'Accepted', 'Declined'],
  activeTabIndex: 0,
  offers: [],
  swipeableOffers: [],
  activeSwipeableOfferIndex: null,
  dirtyOfferObject: {
    id: '',
    dirty: false,
  },
  activeOfferType: null,
  sorting: 'receivedDate',
  activeOffer: null,
  shouldFetch: false,

  newFilterBy: 'none',
  interestedFilterBy: 'none',
  acceptedFilterBy: 'none',
  declinedFilterBy: 'none',
};

const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OFFERS_TAB_INDEX: {
      return { ...state, activeTabIndex: action.payload.index };
    }
    case FETCH_OFFERS_SUCCESS: {
      return { ...state, offers: action.payload.offers };
    }
    case SET_OFFERS_SORTING_TYPE: {
      return { ...state, sorting: action.payload.sortingOption };
    }
    case SET_ACTIVE_OFFER: {
      return { ...state, activeOffer: action.payload.offer, activeOfferType: action.payload.type };
    }
    case SET_SHOULD_FETCH_OFFERS_STATUS: {
      return { ...state, shouldFetch: action.payload.status };
    }
    case CLEAR_OFFERS_INFO: {
      return {
        ...state,
        swipeableOffers: [],
        activeSwipeableOfferIndex: null,
        dirtyOfferObject: { ...initialState.dirtyOfferObject },
        activeOfferType: null,
        activeOffer: null,
      };
    }
    case SET_SWIPEABLE_OFFERS: {
      return { ...state, swipeableOffers: action.payload.offers };
    }
    case SET_OFFERS_SWIPE_ITEM_INDEX: {
      return { ...state, activeSwipeableOfferIndex: action.payload.index };
    }
    case CHECK_AND_CLEAR_SWIPEABLE_OFFERS_LIST: {
      if (!state.dirtyOfferObject.id) return state;
      // const offer = state.swipeableOffers.find(offerObj =>
      //   (offerObj.job__id || offerObj.task_id) === state.dirtyOfferObject.id);
      // if (offer.offer_status === state.dirtyOfferObject.initialStatus) {
      //   return { ...state, dirtyOfferObject: { ...initialState.dirtyOfferObject } };
      // }
      const newSwipeableList = state.swipeableOffers.filter((offerObj) => offerObj[`${state.activeOfferType}_id`] !== state.dirtyOfferObject.id);
      return {
        ...state,
        swipeableOffers: newSwipeableList,
        dirtyOfferObject: { ...initialState.dirtyOfferObject },
      };
    }
    case CHANGE_OFFER_STATUS_SUCCESS: {
      return {
        ...state,
        dirtyOfferObject: { ...state.dirtyOfferObject, dirty: true, id: action.payload.offerId },
      };
    }
    case FILTER_OFFERS: {
      return {
        ...state,
        [`${action.payload.offersType}FilterBy`]: action.payload.filterType,
      };
    }
    case ADD_OFFER: {
      const entity = action.payload.offer.job_id ? 'job_id' : 'task_id';
      const isAlreadyAdded = state.offers.some((offer) => offer[entity] === action.payload.offer[entity]);
      const data = { ...state };
      if (!isAlreadyAdded) {
        data.offers = [...state.offers, action.payload.offer];
        if (state.swipeableOffers.length) data.swipeableOffers = [...state.swipeableOffers, action.payload.offer];
      }
      return data;
    }
    case DELETE_OFFER: {
      // const offerType = action.payload.offerType === 'job_offer' ? 'job' : 'task';
      const filteringFunc = (offerObj) => (offerObj.offer_id || offerObj.id) !== action.payload.offerId;
      const deletedOfferIndex = state.swipeableOffers.findIndex((offerObj) => (offerObj.offer_id || offerObj.id) === action.payload.offerId);
      let newIndex = state.activeSwipeableOfferIndex;
      if (deletedOfferIndex < state.activeSwipeableOfferIndex) {
        newIndex -= 1;
      }
      const data = {
        ...state,
        offers: state.offers.filter(filteringFunc),
        activeSwipeableOfferIndex: newIndex,
      };
      if (state.swipeableOffers.length) {
        data.swipeableOffers = state.swipeableOffers.filter(filteringFunc);
      }
      return data;
    }
    case MARK_OFFER_AS_VIEWED_SUCCESS: {
      const newOffers = modifyOfferById(state.offers, action.payload.offerId, 'is_viewed_by_candidate', true);
      return { ...state, offers: newOffers };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default offersReducer;
