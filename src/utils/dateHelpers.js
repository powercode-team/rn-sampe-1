import moment from 'moment';

export function isSameDay(currentDateMsg = null, diffDateMsg = null) {
  if (!diffDateMsg) {
    return false;
  }

  const currentDate = moment(currentDateMsg);
  const diffDate = moment(diffDateMsg);

  if (!currentDate.isValid() || !diffDate.isValid()) {
    return false;
  }

  return currentDate.isSame(diffDate, 'day');
}

export function getDateCreateAgo(date, t, full = false) {
  const dateNow = moment();
  const dateItem = moment(date);
  const isSame = moment(dateNow).isSame(dateItem, 'day');
  const dayText = full ? 'days' : 'd';
  const diff = dateNow.diff(dateItem, 'days');
  let returnedVal;
  if (isSame) {
    returnedVal = t('today');
  } else if (!isSame && diff === 0) {
    returnedVal = full ? `1 ${t(dayText.slice(0, -1))}` : `1${t(dayText)}`;
  } else {
    returnedVal = full ? `${diff} ${t(dayText)}` : `${diff}${t(dayText)}`;
  }
  return returnedVal;
}
