import dayjs from 'dayjs';
import { TRIP_POINTS_ARRAY, CITIES_ARRAY } from '../createMockData';
import { getRandomInt } from '../utils';
import { createElement } from '../render';

const formatTime = (data) => dayjs(data).format('DD/MM/YY HH:mm');

const generateEventTypeList = (data) => {
  let string = '';
  let checked = '';

  data.forEach((item) => {
    checked = item === data.type ? 'checked' : '';

    string += `
    <div class="event__type-item">
    <input id="event-type-${item.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item.toLowerCase()}" ${checked}>
    <label class="event__type-label  event__type-label--${item.toLowerCase()}" for="event-type-${item.toLowerCase()}-1">${item}</label>
    </div>`;
  });
  return string;
};

const generateDestinationList = (data) => {
  let string = '';

  data.forEach((item) => {
    string += `<option value="${item}"></option>`;
  });

  return string;
};

const generateOffersList = (data) => {
  let string = '';
  let checked = '';

  data.forEach((item) => {
    checked = getRandomInt(0,1) ? 'checked' : '';

    string += `
    <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.title}-1" type="checkbox" name="event-offer-${item.title}" ${checked}>
    <label class="event__offer-label" for="event-offer-${item.title}-1">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
    </div>`;
  });

  return string;
};

const createEditCardMarkup = (event) => (
  `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${generateEventTypeList(TRIP_POINTS_ARRAY)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${event.type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${generateDestinationList(CITIES_ARRAY)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatTime(event.dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatTime(event.dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${generateOffersList(event.offers)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${event.destination.description}</p>
      </section>
    </section>
  </form>
  </li>`
);

export default class EditEventCardView {
  constructor(event) {
    this.event = event;
  }

  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createEditCardMarkup(this.event);
  }

  removeElement() {
    this.#element = null;
  }
}
