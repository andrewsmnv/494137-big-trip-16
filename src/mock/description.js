import { DESTINATION_DESCRIPTION } from './../const/destinationDescription';
import { getRandomInt } from './../utils';

export const createRandomDescription  = (quantity) => {
  quantity = quantity || 5;
  const array = DESTINATION_DESCRIPTION.split('.');
  const splittedArray = [];
  for(let i = 0; i <= getRandomInt(1, quantity); i++) {
    splittedArray.push(array[getRandomInt(1, array.length)]);
  }
  const description = splittedArray.join('.');

  return description;
};
