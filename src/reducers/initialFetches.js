import {
  FETCH_SENIORITY_DATA_SUCCESS,
  FETCH_SKILLS_DATA_SUCCESS,
  FETCH_TERMS_OF_USE_SUCCESS,
  FETCH_CATEGORIES_DATA_SUCCESS,
  FETCH_CONTRACT_TYPES_DATA_SUCCESS,
} from '../actions/initialFetches';

const initialData = {
  seniorities: [],
  categories: [],
  contractTypes: [],
  skillLevels: [],
  termsOfUse: '',
};

const initialDataReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_SENIORITY_DATA_SUCCESS: {
      return { ...state, seniorities: action.payload.sort((a, b) => b.seniority_level_id - a.seniority_level_id) };
    }
    case FETCH_SKILLS_DATA_SUCCESS: {
      return { ...state, skillLevels: action.payload.sort((a, b) => a.skill_level_id - b.skill_level_id) };
    }
    case FETCH_TERMS_OF_USE_SUCCESS: {
      return { ...state, termsOfUse: action.payload.termsOfUse };
    }
    case FETCH_CATEGORIES_DATA_SUCCESS: {
      return { ...state, categories: action.payload.categories };
    }
    case FETCH_CONTRACT_TYPES_DATA_SUCCESS: {
      return { ...state, contractTypes: action.payload.contractTypes };
    }
    default: {
      return state;
    }
  }
};

export default initialDataReducer;
