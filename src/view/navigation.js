import { createElement } from '../render';

const createNavigationMarkup = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
);

export default class navigation {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createNavigationMarkup();
  }

  removeElement() {
    this.#element = null;
  }
}
