import eventItem from './view/eventItem';
import editEventCard from './view/editEventCard';
import { renderElement } from './render';
import { RenderPosition } from './render';

export const renderEvent = (eventElement, task) => {
  const eventComponent = new eventItem(task);
  const eventEditComponent = new editEventCard(task);

  const replaceCardToForm = () => {
    eventElement.replaceChild(eventEditComponent.element, eventComponent.element);
  };

  const replaceFormToCard = () => {
    eventElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };

  eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });

  eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  renderElement(eventElement, eventComponent.element, RenderPosition.BEFOREEND);
};
