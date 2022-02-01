
import TripPresenter from './presenter/tripPresenter';
import { generatePoint } from './mock/point';

const POINT_COUNT = 16;
const points = Array.from({length: POINT_COUNT}, (item, index) => generatePoint(index));


const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const eventListContainer = new TripPresenter(mainContainer, navigationContainer, filtersContainer, contentContainer);
eventListContainer.init(points);
