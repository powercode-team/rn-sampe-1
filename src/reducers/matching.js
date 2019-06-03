import {
  SET_ACTIVE_TAB_INDEX,
  SET_ACTIVE_ITEM,
  CLEAR_ACTIVE_ITEM,
  FETCH_MATCHING_JOB_SUCCESS,
  FETCH_MATCHING_JOB_FAILURE,
  FETCH_MATCHING_TASK_SUCCESS,
  FETCH_MATCHING_TASK_FAILURE,
  UPDATE_MATCHING_FOR_JOB_SUCCESS,
  UPDATE_MATCHING_FOR_TASK_SUCCESS,
  INVITE_ALL_CANDIDATES_SUCCESS,
  SET_USER_IN_REVIEW,
  CLEAR_MATCHING_INFO,
  CLEAR_USER_IN_REVIEW,
  FETCH_SELECTED_USER_SKILLS_SUCCESS,
  SET_OFFER_STATUS_ACCEPTED_SUCCESS,
  SET_OFFER_STATUS_REJECTED_SUCCESS,
  CHANGE_MATCHING_OFFER_STATUS_SUCCESS,
  SET_MATCHING_SORTING_TYPE,
  SET_SWIPEABLE_CANDIDATES,
  CHECK_AND_CLEAR_SWIPEABLE_LIST,
  SET_SWIPE_ITEM_INDEX,
  MARK_CANDIDATE_AS_VIEWED_SUCCESS,
  SET_MATCHING_FILTER_VALUE,
  FILTER_MATCHING_USERS,
  FILTER_MATCHING_USERS_SUCCESS,
  SET_ACTIVITY_DATA_FOR_FILTER,
  CHANGE_SENIORITY_CHECKBOX_STATE,
  RESET_FILTER,
  FULL_MATCHING_FILTER_RESET,
} from '../actions/matching';
import { UPDATE_TASK_SUCCESS, UPDATE_JOB_SUCCESS } from '../actions/tasksJobs';
import { LOGOUT_SUCCESS } from '../actions/auth';

function modifyUserById(oldArray, userId, fieldName, fieldValue) {
  return oldArray.map((item) => (item.user_id === userId ? { ...item, [fieldName]: fieldValue } : item));
}

const initialState = {
  tabs: ['Interested', 'Accepted', 'Declined'],
  activeTabIndex: 0,
  activeItem: null,
  candidates: [],
  filter: {
    value: 0,
    appliedValue: 0,
    isApplied: false,
    seniorities: [],
    appliedSeniorities: [],
  },
  userInReview: {
    related_skills: [],
    matched_skills: [],
  },
  swipeableUsers: [],
  swipeItemIndex: null,
  userInReviewSkills: [],
  sorting: 'alphabet',
  dirtyUserObject: {
    id: '',
    dirty: false,
    initialStatus: '',
  },
  isErrorModalVisible: false,
  isLoading: false,
  errorModalMsg: '',

  isRefreshing: false,

  currentActivityType: '',
  currentMatchingTab: '',
};

const matching = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB_INDEX: {
      return { ...state, activeTabIndex: action.payload.index };
    }
    case SET_ACTIVE_ITEM: {
      return {
        ...state,
        activeItem: action.payload.data,
        filter: {
          ...initialState.filter,
          value: action.payload.data.needed_skills_count_for_matching,
        },
      };
    }
    case UPDATE_JOB_SUCCESS:
    case UPDATE_TASK_SUCCESS: {
      return {
        ...state,
        activeItem: action.payload,
        filter: { ...initialState.filter, value: action.payload.needed_skills_count_for_matching },
      };
    }
    case CLEAR_ACTIVE_ITEM: {
      return { ...state, activeItem: null, filter: { ...initialState.filter } };
    }
    case FETCH_MATCHING_JOB_SUCCESS:
    case FETCH_MATCHING_TASK_SUCCESS:
    case UPDATE_MATCHING_FOR_JOB_SUCCESS:
    case UPDATE_MATCHING_FOR_TASK_SUCCESS: {
      return {
        ...state,
        candidates: action.payload,
        isErrorModalVisible: false,
        errorModalMsg: '',
      };
    }
    case INVITE_ALL_CANDIDATES_SUCCESS: {
      return { ...state, activeItem: { ...state.activeItem, is_mass_mailing: true } };
    }
    case FETCH_MATCHING_JOB_FAILURE:
    case FETCH_MATCHING_TASK_FAILURE: {
      return { ...state, isErrorModalVisible: true, errorModalMsg: action.payload };
    }
    case SET_USER_IN_REVIEW: {
      return { ...state, userInReview: { ...action.payload } };
    }
    case SET_SWIPEABLE_CANDIDATES: {
      return { ...state, swipeableUsers: action.payload.candidates };
    }
    case CLEAR_USER_IN_REVIEW: {
      return {
        ...state,
        userInReview: { ...initialState.userInReview },
        userInReviewSkills: [],
        dirtyUserObject: { ...initialState.dirtyUserObject },
      };
    }
    case CLEAR_MATCHING_INFO: {
      return {
        ...initialState,
        activeTabIndex: state.activeTabIndex,
        activeItem: state.activeItem,
        filter: state.filter,
      };
    }
    case FETCH_SELECTED_USER_SKILLS_SUCCESS: {
      return { ...state, userInReviewSkills: action.payload.skills };
    }
    case SET_OFFER_STATUS_ACCEPTED_SUCCESS:
    case SET_OFFER_STATUS_REJECTED_SUCCESS:
    case CHANGE_MATCHING_OFFER_STATUS_SUCCESS: {
      const { userId, status } = action.payload;
      const newArray = modifyUserById(state.candidates, userId, 'offer_status', status);
      const newSwipeableArray = modifyUserById(state.swipeableUsers, userId, 'offer_status', status);
      return {
        ...state,
        userInReview: { ...state.userInReview, offer_status: status },
        candidates: newArray,
        swipeableUsers: newSwipeableArray,
        dirtyUserObject: {
          ...state.dirtyUserObject,
          id: userId,
          dirty: true,
          initialStatus: state.dirtyUserObject.initialStatus || state.userInReview.offer_status,
        },
      };
    }
    case CHECK_AND_CLEAR_SWIPEABLE_LIST: {
      if (!state.dirtyUserObject.id) return state;
      const user = state.swipeableUsers.find((userObj) => userObj.user_id === state.dirtyUserObject.id);
      if (user.offer_status === state.dirtyUserObject.initialStatus) {
        return { ...state, dirtyUserObject: { ...initialState.dirtyUserObject } };
      }
      const newSwipeableList = state.swipeableUsers.filter((userObj) => userObj.user_id !== state.dirtyUserObject.id);
      return {
        ...state,
        swipeableUsers: newSwipeableList,
        dirtyUserObject: { ...initialState.dirtyUserObject },
      };
    }
    case SET_MATCHING_SORTING_TYPE: {
      return { ...state, sorting: action.payload.sortingType };
    }
    case SET_SWIPE_ITEM_INDEX: {
      return { ...state, swipeItemIndex: action.payload.index };
    }
    case MARK_CANDIDATE_AS_VIEWED_SUCCESS: {
      const newMatchedUsers = modifyUserById(state.candidates, action.payload.candidateId, 'is_viewed_by_hr', true);
      return { ...state, candidates: newMatchedUsers };
    }
    case SET_MATCHING_FILTER_VALUE: {
      return { ...state, filter: { ...state.filter, value: action.payload.value } };
    }
    case FILTER_MATCHING_USERS: {
      return {
        ...state,
        isRefreshing: true,
      };
    }
    case FILTER_MATCHING_USERS_SUCCESS: {
      return {
        ...state,
        filter: {
          ...state.filter,
          isApplied: true,
          appliedValue: state.filter.value,
          appliedSeniorities: state.filter.seniorities,
        },
        candidates: action.payload.filteredUsers,
        isRefreshing: false,
      };
    }
    case SET_ACTIVITY_DATA_FOR_FILTER: {
      return {
        ...state,
        currentActivityType: action.payload.activityType,
        currentMatchingTab: action.payload.matchingTab,
        filter: {
          ...state.filter,
          seniorities: [
            { seniority_level_id: 666, seniority_level_name: 'All', isActive: false },
            ...action.payload.seniorities.map((item) => ({ ...item, isActive: false })),
          ],
        },
      };
    }
    case CHANGE_SENIORITY_CHECKBOX_STATE: {
      const {
        payload: { name, newState },
      } = action;
      // if it's ALL option and newState is true - check all, otherwise - uncheck all
      const checkAll = (item) => ({ ...item, isActive: newState });
      const unCheckAll = (item) => (item.seniority_level_name === name ? { ...item, isActive: newState } : item);
      const mapFunc = name === 'All' ? checkAll : unCheckAll;
      return {
        ...state,
        filter: { ...state.filter, seniorities: state.filter.seniorities.map(mapFunc) },
      };
    }
    // reset to the applied state or task/job criteria state
    case RESET_FILTER: {
      const uncheckedSeniorities = state.filter.seniorities.map((item) => ({ ...item, isActive: false }));
      return {
        ...state,
        filter: {
          ...state.filter,
          value: state.filter.appliedValue || state.activeItem.needed_skills_count_for_matching || 0,
          seniorities: state.filter.appliedSeniorities.length ? state.filter.appliedSeniorities : uncheckedSeniorities,
        },
      };
    }
    // reset to 0
    case FULL_MATCHING_FILTER_RESET: {
      return {
        ...state,
        filter: {
          ...state.filter,
          value: state.activeItem.needed_skills_count_for_matching || 0,
          seniorities: state.filter.seniorities.map((item) => ({ ...item, isActive: false })),
        },
      };
    }

    case LOGOUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default matching;
