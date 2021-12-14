import tripInfo from './view/tripInfo';
import navigation from './view/navigation';
import filters from './view/filters';
import sort from './view/sort';
import eventsList from './view/eventsList';
import { createMockData } from './createMockData';
import { renderElement } from './render';
import { RenderPosition } from './render';
import { renderEvent } from './renderEvent';

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

renderElement(mainContainer, new tripInfo().element, 'afterbegin');
renderElement(navigationContainer, new navigation().element, 'beforeend');
renderElement(filtersContainer, new filters().element, 'beforeend');
renderElement(contentContainer, new sort().element, 'beforeend');
renderElement(contentContainer, new eventsList().element, 'beforeend');

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
