import { createMockData } from './createMockData';
import { TripPresenter } from './presenter/tripPresenter';

const POINT_COUNT = 20;
const points = [];

for(let i = 0; i < POINT_COUNT; i++) {
  points.push(createMockData(i));
}

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const eventListContainer = new TripPresenter(mainContainer, navigationContainer, filtersContainer, contentContainer);
eventListContainer.init(points);
