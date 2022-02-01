import dayjs from 'dayjs';
import { getRandomInt } from './../utils';
import { offersData } from './offer';
import { generateDestination } from './destination';
import { OFFER_TYPE } from './../const/offer-type';

const generateDate = (later) => {
  const maxHoursGap = later ? 10 : 4;
  const minHoursGap = later ? 5 : 1;
  const hoursGap = getRandomInt(minHoursGap, maxHoursGap);

  return dayjs().add(hoursGap, 'hour').toDate();
};

const generateOffers = (type) => {
  const data = offersData.find((item) => item.type === type);
  return data.offers;
};

export const generatePoint = (index) => {
  const type = OFFER_TYPE[getRandomInt(0, OFFER_TYPE.length -1)];
  return {
    'basePrice': getRandomInt(1000, 1500),
    'dateFrom': generateDate(),
    'dateTo': generateDate('later'),
    'destination': generateDestination(),
    'id': index,
    'isFavorite': Boolean(getRandomInt(0, 1)),
    'offers': generateOffers(type),
    'type': type
  };
};
