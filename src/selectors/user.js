import { createSelector } from 'reselect';

export const getMastersAccounts = (state) => state.user.masters;

export const getUserSubstitutes = (state) => state.user.substitutes;

export const getUserId = (state) => state.user.id;

export const getUserVacationStatus = (state) => state.user.isInVacation;

export const getActiveSubstituteStatus = (state) => state.user.isActiveSubstitute;

export const getUserFirstName = (state) => state.user.firstName;

export const getUserLastName = (state) => state.user.lastName;

export const getUsername = createSelector(
  [getUserFirstName, getUserLastName],
  (firstName, lastName) => `${firstName} ${lastName}`,
);

export const getCurrentSubstituteEmail = createSelector(
  [getUserSubstitutes, getUserVacationStatus],
  (substitutes, isInVacation) => {
    if (isInVacation) {
      const [activeSubstitutes] = substitutes.filter((substitute) => substitute.is_active_relation);
      return activeSubstitutes.email;
    }
    return '';
  },
);

export const selectMySubstituteStatus = createSelector(
  [getMastersAccounts],
  (masters) => masters.some((master) => master.is_active_relation),
);
