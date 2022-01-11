import { createElement } from './render.js';

export default class AbstractView {
  constructor() {
    if(new.target === AbstractView) {
      throw new Error('Cannot create instance of this abstract class');
    }
  }

  _callback = {};
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }
}
