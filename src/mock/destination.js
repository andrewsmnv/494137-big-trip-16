import { DESTINATIONS } from './../const/destination';
import { getRandomInt } from './../utils';

export const generateDestination = () => (DESTINATIONS[getRandomInt(0, DESTINATIONS.length - 1)]);
