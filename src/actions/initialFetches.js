export const FETCH_SENIORITY_DATA = 'FETCH_SENIORITY_DATA';
export const fetchSeniorityData = () => ({
  type: FETCH_SENIORITY_DATA,
});

export const FETCH_SENIORITY_DATA_SUCCESS = 'FETCH_SENIORITY_DATA_SUCCESS';
export const fetchSeniorityDataSuccess = (data) => ({
  type: FETCH_SENIORITY_DATA_SUCCESS,
  payload: data,
});

export const FETCH_SENIORITY_DATA_FAILURE = 'FETCH_SENIORITY_DATA_FAILURE';
export const fetchSeniorityDataFailure = () => ({
  type: FETCH_SENIORITY_DATA_FAILURE,
});
export const FETCH_CATEGORIES_DATA = 'FETCH_CATEGORIES_DATA';
export const fetchCategoriesData = () => ({
  type: FETCH_CATEGORIES_DATA,
});

export const FETCH_CATEGORIES_DATA_SUCCESS = 'FETCH_CATEGORIES_DATA_SUCCESS';
export const fetchCategoriesDataSuccess = (categories) => ({
  type: FETCH_CATEGORIES_DATA_SUCCESS,
  payload: {
    categories,
  },
});

export const FETCH_CATEGORIES_DATA_FAILURE = 'FETCH_CATEGORIES_DATA_FAILURE';
export const fetchCategoriesDataFailure = () => ({
  type: FETCH_CATEGORIES_DATA_FAILURE,
});

export const FETCH_CONTRACT_TYPES_DATA = 'FETCH_CONTRACT_TYPES_DATA';
export const fetchContractTypesData = () => ({
  type: FETCH_CONTRACT_TYPES_DATA,
});

export const FETCH_CONTRACT_TYPES_DATA_SUCCESS = 'FETCH_CONTRACT_TYPES_DATA_SUCCESS';
export const fetchContractTypesDataSuccess = (contractTypes) => ({
  type: FETCH_CONTRACT_TYPES_DATA_SUCCESS,
  payload: {
    contractTypes,
  },
});

export const FETCH_CONTRACT_TYPES_DATA_FAILURE = 'FETCH_CONTRACT_TYPES_DATA_FAILURE';
export const fetchContractTypesDataFailure = () => ({
  type: FETCH_CONTRACT_TYPES_DATA_FAILURE,
});
export const FETCH_SKILLS_DATA = 'FETCH_SKILLS_DATA';
export const fetchSkillsData = () => ({
  type: FETCH_SKILLS_DATA,
});

export const FETCH_SKILLS_DATA_SUCCESS = 'FETCH_SKILLS_DATA_SUCCESS';
export const fetchSkillsDataSuccess = (data) => ({
  type: FETCH_SKILLS_DATA_SUCCESS,
  payload: data,
});

export const FETCH_SKILLS_DATA_FAILURE = 'FETCH_SKILLS_DATA_FAILURE';
export const fetchSkillsDataFailure = () => ({
  type: FETCH_SKILLS_DATA_FAILURE,
});

export const FETCH_TERMS_OF_USE = 'FETCH_TERMS_OF_USE';
export const fetchTermsOfUse = (lang) => ({
  type: FETCH_TERMS_OF_USE,
  payload: {
    language: lang,
  },
});

export const FETCH_TERMS_OF_USE_SUCCESS = 'FETCH_TERMS_OF_USE_SUCCESS';
export const fetchTermsOfUseSuccess = (termsOfUse) => ({
  type: FETCH_TERMS_OF_USE_SUCCESS,
  payload: {
    termsOfUse,
  },
});

export const FETCH_TERMS_OF_USE_FAILURE = 'FETCH_TERMS_OF_USE_FAILURE';
export const fetchTermsOfUseFailure = () => ({
  type: FETCH_TERMS_OF_USE_FAILURE,
});
