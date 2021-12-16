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

renderElement(mainContainer, new TripInfoView().element, 'afterbegin');
renderElement(navigationContainer, new NavigationView().element, 'beforeend');
renderElement(filtersContainer, new FiltersView().element, 'beforeend');
renderElement(contentContainer, new SortView().element, 'beforeend');
renderElement(contentContainer, new EventsListView().element, 'beforeend');

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
