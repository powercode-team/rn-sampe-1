import {
  SAVE_USER_SKILLS_SUCCESS,
  FETCH_USER_SKILLS_SUCCESS,
  DELETE_USER_SKILL_SUCCESS,
  SET_SKILL_LEVEL_SUCCESS,
} from '../actions/skills';
import { LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  skills: [],
};

const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_SKILLS_SUCCESS:
    case FETCH_USER_SKILLS_SUCCESS: {
      return {
        ...state,
        skills: action.payload,
      };
    }
    case DELETE_USER_SKILL_SUCCESS: {
      const newSkills = state.skills.filter((skill) => skill.skill_id !== action.payload.skillId);
      return { ...state, skills: newSkills };
    }
    case SET_SKILL_LEVEL_SUCCESS: {
      const oldSkillObjectIndex = state.skills.findIndex((skill) => skill.skill_id === action.payload.body.skill_id);
      const oldSkillObject = state.skills[oldSkillObjectIndex];
      const newSkillObject = { ...oldSkillObject, skill_level_id: action.payload.body.skill_level_id };
      const oldSkillsCopy = [...state.skills];
      oldSkillsCopy.splice(oldSkillObjectIndex, 1, newSkillObject);
      return { ...state, skills: oldSkillsCopy };
    }
    case LOGOUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default skillsReducer;
