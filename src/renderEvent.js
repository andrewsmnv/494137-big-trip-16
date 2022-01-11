import eventItemView from './view/eventItemView';
import editEventCardView from './view/editEventCardView';
import { renderElement } from './render';
import { RenderPosition } from './render';

export const renderEvent = (eventElement, task) => {
  const eventComponent = new eventItemView(task);
  const eventEditComponent = new editEventCardView(task);

  const replaceCardToForm = () => {
    eventElement.replaceChild(eventEditComponent.element, eventComponent.element);
  };

  const replaceFormToCard = () => {
    eventElement.replaceChild(eventComponent.element, eventEditComponent.element);
  };

  eventComponent.setEditClickHandler(() => {
    replaceCardToForm();
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
  });

  renderElement(eventElement, eventComponent.element, RenderPosition.BEFOREEND);
};
