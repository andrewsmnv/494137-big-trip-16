import { getRandomInt } from './utils';
import dayjs from 'dayjs';

export const TRIP_POINTS_ARRAY = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
export const CITIES_ARRAY = ['London', 'Paris', 'New-York', 'San-Francisco', 'Moscow', 'Dubai', 'Bejin'];
export const OFFERS_ARRAY = ['luggage', 'comfort', 'meal', 'seats', 'train'];
const DESCRIPTION_STRING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const createRandomDescription  = () => {
  const array = DESCRIPTION_STRING.split('.');
  const splittedArray = [];
  for(let i = 0; i <= getRandomInt(1, 5); i++) {
    splittedArray.push(array[getRandomInt(1, 12)]);
  }
  const newString = splittedArray.join('.');
  return newString;
};

//
const createPhotosArray = () => {
  const array = [];
  for(let i = 0; i < getRandomInt(1,5); i++) {
    array.push(
      {
        src: `https://picsum.photos/seed/${getRandomInt(1,100)}/200/300`,
        description: createRandomDescription(),
      }
    );
  }
  return array;
};

const createOffer = (id) => {
  const offer = {
    _id: id,
    title: OFFERS_ARRAY[id],
    price: getRandomInt(10, 150),
  };
  return offer;
};

export const createOffersArray = (counter) => {
  const offers = [];

  for(let i = 0; i <= counter; i++) {
    offers.push(createOffer(i));
  }
  return offers;
};

const createTimeString = (later) => {
  let date = dayjs().set('minutes', getRandomInt(1, 30)).format();

  if(later) {
    date = dayjs().set('minutes', getRandomInt(30, 60)).format();
  }
  return date;
};

export const createMockData = (index) => {
  const data = {
    basePrice: getRandomInt(1, 120),
    dateFrom: createTimeString(),
    dateTo: createTimeString(true),
    destination: {
      description: createRandomDescription(),
      name: CITIES_ARRAY[getRandomInt(0, CITIES_ARRAY.length - 1)],
      photos: createPhotosArray(),
    },
    id: index,
    isFavorite: Boolean(getRandomInt(0,1)),
    offers: createOffersArray(getRandomInt(1, 4)),
    type: TRIP_POINTS_ARRAY[getRandomInt(0, TRIP_POINTS_ARRAY.length - 1)],
  };
  return data;
};
