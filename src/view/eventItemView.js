import { renderEventOfferTemplate } from './eventOfferTemplate';
import dayjs from 'dayjs';
import AbstractView from './abstractView';

const renderEventOffers = (offers) => {
  if (!offers.length) {
    return '';
  } else {
    let eventOfferTempl = '';
    for (let index = 0; index < offers.length; index++) {
      eventOfferTempl += renderEventOfferTemplate(offers[index]);
    }
    return eventOfferTempl;
  }
};

const renderEventItemTemplate = (point) => {
  const {dateFrom: dateFrom, dateTo: dateTo, type, destination, offers, is_favorite: isFavorite, basePrice: basePrice} = point;
  const template = `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${dayjs(dateFrom).format('MMM DD') }</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format() }">${dayjs(dateFrom).format('hh:mm') }</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format() }">${dayjs(dateTo).format('hh:mm') }</time>
        </p>
        <p class="event__duration">${dayjs(dateTo).diff(dateFrom, 'hour') }H</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${renderEventOffers(offers)}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;

  return template;
};

export default class EventItemView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return renderEventItemTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn ').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}

