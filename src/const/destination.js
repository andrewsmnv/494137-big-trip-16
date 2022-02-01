import { getRandomInt } from './../utils';
import { createRandomDescription } from './../mock/description';

export const destinations = ['Amsterdam', 'Chamonix', 'Geneva'];
const generatePicture = () => ({
  'src': `http://picsum.photos/248/152?${getRandomInt(1, 1000)}`,
  'description': createRandomDescription(1)
});

const generateDestination = (value, index) => ({
  'description': createRandomDescription(),
  'name': destinations[index],
  'pictures': Array.from({length: getRandomInt(1, 5)}, generatePicture)
});

export const DESTINATIONS = Array.from({length: destinations.length}, generateDestination);
