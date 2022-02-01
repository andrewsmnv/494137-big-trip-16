import { OFFER_TYPE } from '../../const/offer-type';
import { renderDestionationsTemplate } from '../destination-list-template';
import { renderOfferSectionTempalte } from './offers-section-template';
import { createElement } from '../../render';

import dayjs from 'dayjs';

const renderTypeItem = (offerType) => (
  `<div class="event__type-item">
    <input id="event-type-${offerType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType.toLowerCase()}">
    <label class="event__type-label  event__type-label--${offerType.toLowerCase()}" for="event-type-${offerType.toLowerCase()}-1">${offerType}</label>
  </div>`
);

const renderTypeItems = (offerTypes) => {
  let typeItemsTmpl = '';
  offerTypes.forEach((element) => {
    typeItemsTmpl += renderTypeItem(element);
  });

  return typeItemsTmpl;
};

const renderAddCardTemplate = (point, index) => `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index + 1}" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
              ${renderTypeItems(OFFER_TYPE)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${point.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${index + 1}" type="text" name="event-destination" value="${point.destination.name}" list="destination-list-${index + 1}">
        <datalist id="destination-list-${index + 1}">
          ${renderDestionationsTemplate()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${index + 1}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${index + 1}" type="text" name="event-start-time" value="${dayjs(point.dateFrom).format('DD/MM/YY hh:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${index + 1}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${index + 1}" type="text" name="event-end-time" value="${dayjs(point.dateTo).format('DD/MM/YY hh:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${index + 1}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${index + 1}" type="text" name="event-price" value="${point.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>

    </header>
    <section class="event__details">
      ${renderOfferSectionTempalte(point.offers, index)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${point.destination.description}</p>
      </section>
    </section>
  </form>
</li>`;

export default class AddCardView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return renderAddCardTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
