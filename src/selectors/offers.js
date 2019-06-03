import { createSelector } from 'reselect';
import moment from 'moment';
import { orderBy } from 'lodash';
import { filterByType } from './../utils/sorting';
import { offersTabsMap } from './../utils/statuses';

const sortingMap = {
  New: 'timestamp',
  Applied: 'updated',
  Accepted: 'updated',
  Declined: 'updated',
};

const offerRelatedSkills = (state) => (state.offers.activeOffer && state.offers.activeOffer.related_skills) || [];
const getParentSkills = createSelector(
  offerRelatedSkills,
  (relatedSkills) =>
    relatedSkills.reduce((parentSkills, currentObj) => {
      if (!parentSkills.find((parentSkill) => parentSkill.parent_skill_id === currentObj.parent_skill_id)) {
        const parentSkillObj = {
          parent_skill_id: currentObj.parent_skill_id,
          parent_skill_name: currentObj.parent_skill_name,
          parent_skill_searched_level_id: currentObj.parent_skill_searched_level_id,
        };
        parentSkills.push(parentSkillObj);
      }
      return parentSkills;
    }, []),
);

export const getOfferOrganizedRelatedSkills = createSelector(
  [offerRelatedSkills, getParentSkills],
  (allSkills, parentSkills) => {
    const organizedSkills = [];
    parentSkills.forEach((parentSkill) => {
      const parentSkillCopy = { ...parentSkill, subSkills: [] };
      allSkills.forEach((skillObj) => {
        if (skillObj.parent_skill_id === parentSkill.parent_skill_id) {
          const subSkillObj = {
            related_skill_id: skillObj.related_skill_id,
            related_skill_name: skillObj.related_skill_name,
            related_skill_user_level_id: skillObj.related_skill_user_level_id,
            related_skill_user_level_name: skillObj.related_skill_user_level_name,
            correlation_score:
              skillObj.correlation_score < 1 && skillObj.correlation_score !== 0
                ? 1
                : Math.round(skillObj.correlation_score),
          };
          parentSkillCopy.subSkills.push(subSkillObj);
        }
        parentSkillCopy.subSkills = parentSkillCopy.subSkills.sort((objA, objB) => objB.correlation_score - objA.correlation_score);
      });
      organizedSkills.push(parentSkillCopy);
    });
    return organizedSkills;
  },
);

function sortOffersBy(array, type, timeField) {
  let tempArray = [];
  if (type === 'location') {
    tempArray = orderBy(
      array.map((item) => (item.job ? { ...item, location: item.job.city } : { ...item, location: item.task.city })),
      ['location', 'timestamp'],
      ['asc', 'asc'],
    );
  }
  if (type === 'receivedDate') {
    tempArray = array.sort((a, b) => moment(b[timeField]).valueOf() - moment(a[timeField]).valueOf());
  }
  if (type === 'alphabet') {
    tempArray = orderBy(
      array.map((item) =>
        (item.job ? { ...item, offerTitle: item.job.title } : { ...item, offerTitle: item.task.title })),
      ['offerTitle', 'timestamp'],
      ['asc', 'asc'],
    );
  }
  if (type === 'category') {
    tempArray = orderBy(
      array.map((item) =>
        (item.job
          ? { ...item, categoryName: item.job.category_name }
          : { ...item, categoryName: item.task.category_name })),
      ['categoryName', 'timestamp'],
      ['asc', 'asc'],
    );
  }
  return tempArray;
}

const getOffers = (state) => state.offers.offers;
const sortingTypeSelector = (state) => state.offers.sorting;
const getTabs = (state) => state.offers.tabs;
const getTabIndex = (state) => state.offers.activeTabIndex;
export const selectActiveTab = createSelector(
  [getTabs, getTabIndex],
  (tabs, i) => tabs[i],
);
export const selectActiveFilter = createSelector(
  [selectActiveTab, (state) => state.offers],
  (activeTab, state) => state[`${activeTab.toLowerCase()}FilterBy`],
);

const selectOffersByTab = createSelector(
  [getOffers, selectActiveTab],
  (offers, tab) => {
    if (tab === 'New') {
      return offers.filter((item) => {
        if (item.job) {
          return offersTabsMap[tab].includes(item.offer_status) && !item.job.is_archived;
        }
        return offersTabsMap[tab].includes(item.offer_status) && !item.task.is_archived;
      });
    }
    return offers.filter((item) => offersTabsMap[tab].includes(item.offer_status));
  },
);

export const selectOffers = createSelector(
  [selectOffersByTab, sortingTypeSelector, selectActiveFilter, selectActiveTab],
  (offers, sortBy, filterBy, activeTab) => {
    const filteredOffers = filterByType(offers, filterBy);
    return sortOffersBy(filteredOffers, sortBy, sortingMap[activeTab]);
  },
);

export const selectNewUnViewedCount = createSelector(
  getOffers,
  (offers) => offers.filter((item) => item.offer_status === 'new' && !item.is_viewed_by_candidate).length,
);

export const selectAcceptedUnViewedCount = createSelector(
  getOffers,
  (offers) => offers.filter((item) => item.offer_status === 'submitted' && !item.is_viewed_by_candidate).length,
);

export const selectRejectedUnViewedCount = createSelector(
  getOffers,
  (offers) =>
    offers.filter((item) => (item.offer_status === 'rejected' || item.offer_status === 'canceled') && !item.is_viewed_by_candidate).length,
);
