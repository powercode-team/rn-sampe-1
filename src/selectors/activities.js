import { createSelector } from 'reselect';

const getTabsList = (state) => state.tasksJobs.tabs;

const getTabIndex = (state) => state.tasksJobs.activeTabIndex;

export const getFilterAccounts = (state) => state.tasksJobs.jobsFilter.accounts;

export const selectActiveTab = createSelector(
  [getTabsList, getTabIndex],
  (tabs, i) => tabs[i],
);

const selectFilter = createSelector(
  [selectActiveTab, (state) => state.tasksJobs],
  (tab, state) => state[`${tab.toLowerCase().slice(0, -1)}sFilter`],
);

export const selectAppliedStatus = createSelector(
  selectFilter,
  (filterObj) => filterObj.isApplied,
);

export const selectFilterLocations = createSelector(
  [selectFilter],
  (filter) => filter.locations,
);
