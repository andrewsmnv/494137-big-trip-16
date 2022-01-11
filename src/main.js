import TripInfoView from './view/tripInfoView';
import NavigationView from './view/navigationView';
import FiltersView from './view/filtersView';
import SortView from './view/sortView';
import EventsListView from './view/eventsListView';
import { createMockData } from './createMockData';
import { renderElement } from './render';
import { RenderPosition } from './render';
import { renderEvent } from './renderEvent';

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

const tripInfoView = new TripInfoView().element;
const navigationView = new NavigationView().element;
const filtersView = new FiltersView().element;
const sortView = new SortView().element;
const eventsListView = new EventsListView().element;

renderElement(mainContainer, tripInfoView, 'afterbegin');
renderElement(navigationContainer, navigationView, 'beforeend');
renderElement(filtersContainer, filtersView, 'beforeend');
renderElement(contentContainer, sortView, 'beforeend');
renderElement(contentContainer, eventsListView, 'beforeend');

const eventListContainer = document.querySelector('.trip-events__list');

const pointsArray = [];

for(let i = 0; i < 20; i++) {
  pointsArray.push(createMockData(i));
}

const generateMainContent = (data) => {
  for(let i = 0; i < data.length; i++) {
    renderEvent(eventListContainer, data[i], RenderPosition.BEFOREEND);
  }
};

generateMainContent(pointsArray);
