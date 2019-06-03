export const SAVE_USER_SKILLS = 'SAVE_USER_SKILLS';
export const saveUserSkills = (fields, afterRequest) => ({
  type: SAVE_USER_SKILLS,
  payload: {
    body: fields,
    afterRequest,
  },
});

export const SAVE_USER_SKILLS_SUCCESS = 'SAVE_USER_SKILLS_SUCCESS';
export const saveUserSkillsSuccess = (payload) => ({
  type: SAVE_USER_SKILLS_SUCCESS,
  payload,
});

export const SAVE_USER_SKILLS_FAILURE = 'SAVE_USER_SKILLS_FAILURE';
export const saveUserSkillsFailure = () => ({
  type: SAVE_USER_SKILLS_FAILURE,
});

export const FETCH_USER_SKILLS = 'FETCH_USER_SKILLS';
export const fetchUserSkills = (afterRequest) => ({
  type: FETCH_USER_SKILLS,
  payload: {
    afterRequest,
  },
});

export const FETCH_USER_SKILLS_SUCCESS = 'FETCH_USER_SKILLS_SUCCESS';
export const fetchUserSkillsSuccess = (payload) => ({
  type: FETCH_USER_SKILLS_SUCCESS,
  payload,
});

export const FETCH_USER_SKILLS_FAILURE = 'FETCH_USER_SKILLS_FAILURE';
export const fetchUserSkillsFailure = () => ({
  type: FETCH_USER_SKILLS_FAILURE,
});

export const DELETE_USER_SKILL = 'DELETE_USER_SKILL';
export const deleteUserSkill = (skillId, afterRequest) => ({
  type: DELETE_USER_SKILL,
  payload: {
    skillId,
    afterRequest,
  },
});

export const DELETE_USER_SKILL_SUCCESS = 'DELETE_USER_SKILL_SUCCESS';
export const deleteUserSkillSuccess = (skillId) => ({
  type: DELETE_USER_SKILL_SUCCESS,
  payload: {
    skillId,
  },
});

export const DELETE_USER_SKILL_FAILURE = 'DELETE_USER_SKILL_FAILURE';
export const deleteUserSkillFailure = () => ({
  type: DELETE_USER_SKILL_FAILURE,
});

export const SET_SKILL_LEVEL = 'SET_SKILL_LEVEL';
export const setSkillLevel = (body, afterRequest) => ({
  type: SET_SKILL_LEVEL,
  payload: {
    body,
    afterRequest,
  },
});

export const SET_SKILL_LEVEL_SUCCESS = 'SET_SKILL_LEVEL_SUCCESS';
export const setSkillLevelSuccess = (body) => ({
  type: SET_SKILL_LEVEL_SUCCESS,
  payload: {
    body,
  },
});

export const SET_SKILL_LEVEL_FAILURE = 'SET_SKILL_LEVEL_FAILURE';
export const setSkillLevelFailure = () => ({
  type: SET_SKILL_LEVEL_FAILURE,
});
