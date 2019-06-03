import { orderBy } from 'lodash';
import moment from 'moment';

export const sortByLocation = (sortData) => orderBy(sortData, ['city'], ['asc']);

export const sortByPostingDate = (sortData) =>
  sortData.sort((a, b) => new Date(b.last_update) - new Date(a.last_update));

export const sortByAlphabet = (sortData) => orderBy(sortData, ['title'], ['asc']);

export const sortByAlphabetCustom = (sortData, fieldName) =>
  orderBy(sortData, [(data) => data[fieldName].toLowerCase()], [fieldName], ['asc']);

export const sortByCategory = (sortData) => orderBy(sortData, ['category_id'], ['asc']);

export const sortMessagesByDate = (sortData) =>
  sortData.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

export const sortByMatchedSkills = (a, b) => {
  const numA = a.matched_description.split(' ')[0];
  const numB = b.matched_description.split(' ')[0];
  if (numA === numB) {
    const compareNum = a.username.localeCompare(b.username);
    return compareNum || a.status_timestamp.localeCompare(b.status_timestamp);
  }
  return numB - numA;
};

export const filterByType = (offers, filterBy) => {
  if (filterBy === 'none' || filterBy === 'all') return offers;
  const type = filterBy === 'jobs' ? 'job' : 'task';
  return offers.filter((offer) => Object.prototype.hasOwnProperty.call(offer, `${type}_id`) && offer.task_id !== null);
};
