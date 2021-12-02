import { tripInfoTemplate } from './view/tripInfoTemplate';
import { navigationTemplate } from './view/navigationTemplate';
import { filtersTemplate } from './view/filtersTemplate';
import { sortTemplate } from './view/sortTemplate';
import { editCardTemplate } from './view/editCardTemplate.js';
import { eventItemTemplate } from './view/eventItemTemplate';
import { eventsList } from './view/eventsList';
import { createMockData } from './createMockData';

const renderTemplate = (container, template, position) => {
  container.insertAdjacentHTML(position, template);
};

const mainContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

renderTemplate(mainContainer, tripInfoTemplate(), 'afterbegin');
renderTemplate(navigationContainer, navigationTemplate(), 'beforeend');
renderTemplate(filtersContainer, filtersTemplate(), 'beforeend');
renderTemplate(contentContainer, sortTemplate(), 'beforeend');
renderTemplate(contentContainer, eventsList(), 'beforeend');

const eventListContainer = document.querySelector('.trip-events__list');

const pointsArray = [];

for(let i = 0; i < 20; i++) {
  pointsArray.push(createMockData(i));
}

const generateMainContent = (data) => {
  for(let i = 0; i < data.length; i++) {
    if(i === 0) {
      renderTemplate(eventListContainer, editCardTemplate(data[i]), 'beforeend');
    } else {
      renderTemplate(eventListContainer, eventItemTemplate(data[i]), 'beforeend');
    }
  }
};

generateMainContent(pointsArray);
