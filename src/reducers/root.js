import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { i18nState } from 'redux-i18n';
import initialDataReducer from './initialFetches';
import userReducer from './user';
import skillsReducer from './skills';
import authReducer from './auth';
import signUpReducer from './signUp';
import tasksJobsReducer from './tasksJobs';
import locationsReducer from './locations';
import matchingReducer from './matching';
import offersReducer from './offers';
import chatReducer from './chat';
import connectionHandlingReducer from './connectionHandling';
import matchingArchiveReducer from './matchingArchive';

const rootReducer = combineReducers({
  initialData: initialDataReducer,
  signUp: signUpReducer,
  form: formReducer,
  user: userReducer,
  userSkills: skillsReducer,
  userLocations: locationsReducer,
  auth: authReducer,
  tasksJobs: tasksJobsReducer,
  matching: matchingReducer,
  offers: offersReducer,
  chat: chatReducer,
  connectionHandling: connectionHandlingReducer,
  matchingArchive: matchingArchiveReducer,
  i18nState,
});

export default rootReducer;
