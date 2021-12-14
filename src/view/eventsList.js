import { createElement } from '../render';

const createEventsListMarkup = () => '<ul class="trip-events__list"></ul>';

export default class eventsList {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createEventsListMarkup();
  }

  removeElement() {
    this.#element = null;
  }
}
