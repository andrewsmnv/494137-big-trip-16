import { getRandomInt } from './../utils';
import { OFFERS } from './../const/offers';
import { OFFER_TYPE } from '../const/offerType';

const getOffers = () => OFFERS.filter((item, index) => index <= getRandomInt(0, OFFERS.length - 1));

const generateOffer = (type) => ({
  'type': type,
  'offers': getOffers()
});

export const offersData = (() => {
  const items = [];
  OFFER_TYPE.forEach((item) => {
    const offer = generateOffer(item);
    items.push(offer);
  });
  return items;
})();
