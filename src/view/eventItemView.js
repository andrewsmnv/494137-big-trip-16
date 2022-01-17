import dayjs from 'dayjs';
import AbstractView from '../abstractView';

const generateEventDuration = (data) => dayjs(data.dateTo).diff(dayjs(data.dateFrom), 'minutes');

const generateEventTimeFromTo = (data) => dayjs(data).format('HH:mm');

const generateEventMonth = (data) => dayjs(data).format('MMM DD');

const generateTimeDate = (data) => dayjs(data).format('YYYY-MM-DDTHH:mm');

const isFavorite = (data) => {
  if(data) {
    return 'active';
  }
};

const generateOffersList = (data) => {
  let string = '';
  data.forEach((offer) => {
    string += ` <li class="event__offer">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
              </li>`;
  });
  return string;
};

const createEventItemMarkup = (eventData) => (
  `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${generateEventMonth(eventData.dateTo)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventData.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventData.type} ${eventData.destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${generateTimeDate(eventData.dateFrom)}">${generateEventTimeFromTo(eventData.dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${generateTimeDate(eventData.dateTo)}">${generateEventTimeFromTo(eventData.dateTo)}</time>
        </p>
        <p class="event__duration">${generateEventDuration(eventData)}M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${eventData.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${generateOffersList(eventData.offers)}
      </ul>
      <button class="event__favorite-btn event__favorite-btn--${isFavorite(eventData.isFavorite)}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
);

export default class EventItemView extends AbstractView {
  constructor(event) {
    super();
    this.event = event;
  }

  get template() {
    return createEventItemMarkup(this.event);
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

