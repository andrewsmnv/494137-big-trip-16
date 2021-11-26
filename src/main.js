import { tripInfoTemplate } from "./view/tripInfoTemplate";
import { navigationTemplate } from "./view/navigationTemplate";
import { filtersTemplate } from "./view/filtersTemplate";
import { sortTemplate } from "./view/sortTemplate";
import { editCardTemplate } from "./view/editCardTemplate.js";
import { addCardTemplate } from "./view/addCardTemplate.js";
import { eventItemTemplate } from "./view/eventItemTemplate";
import { eventsList } from "./view/eventsList";

const renderTemplate = (container, template, position) => {
    container.insertAdjacentHTML(position, template);
}

const mainContainer = document.querySelector('.trip-main')
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filtersContainer = document.querySelector('.trip-controls__filters');
const contentContainer = document.querySelector('.trip-events');

renderTemplate(mainContainer, tripInfoTemplate(), 'afterbegin');
renderTemplate(navigationContainer, navigationTemplate(), 'beforeend');
renderTemplate(filtersContainer, filtersTemplate(), 'beforeend');
renderTemplate(contentContainer, sortTemplate(), 'beforeend');
renderTemplate(contentContainer, eventsList(), 'beforeend');

const eventListContainer = document.querySelector('.trip-events__list');

renderTemplate(eventListContainer, editCardTemplate(), 'beforeend');
renderTemplate(eventListContainer, addCardTemplate(), 'beforeend');

for(let i = 0; i < 3; i++) {
    renderTemplate(eventListContainer, eventItemTemplate(), 'beforeend');
}




