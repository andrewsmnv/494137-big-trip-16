import { OFFER_TYPE } from '../../const/offerType';
import { DESTINATIONS } from '../../const/destination';
import { offersData } from '../../mock/offer';
import { renderDestionationsTemplate } from '../destinationListTemplate';
import { renderOfferSectionTempalte } from './offersSectionTemplate';
import SmartView from './../smartView';
import flatpickr from 'flatpickr';

import dayjs from 'dayjs';
import '../../../node_modules/flatpickr/dist/flatpickr.min.css';

const renderPictureTemplate = (picture) => (`
  <img class="event__photo" src="${picture.src}" alt="${picture.description}">
`);
const renderPicturesTemplate = (pictures) => {
  if (pictures.length === 0) {
    return '';
  }

  let template = '';
  pictures.forEach((item) => {
    template += renderPictureTemplate(item);
  });
  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${template}
      </div>
    </div>
  `;
};

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

const renderEditCardTemplate = (point) => {
  const {dateFrom: dateFrom, dateTo: dateTo, type, destination, offers, basePrice: basePrice, id: index} = point;
  const template = `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${index + 1}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
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
        <label class="event__label  event__type-output" for="event-destination-${index + 1}">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${index + 1}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${index + 1}">
        <datalist id="destination-list-${index + 1}">
          ${renderDestionationsTemplate(destination)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${index + 1}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${index + 1}" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY hh:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${index + 1}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${index + 1}" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY hh:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${index + 1}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${index + 1}" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>

    </header>
    <section class="event__details">
      ${renderOfferSectionTempalte(offers, index)}
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
      </section>
      ${renderPicturesTemplate(destination.pictures)}
    </section>
  </form>
</li>`;
  return template;
};

export default class EditCardView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point) {
    super();
    this._data = EditCardView.parseTaskToData(point);

    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  removeElement = () => {
    super.removeElement();

    this.#datepickerFrom.destroy();
    this.#datepickerTo.destroy();
    this.#datepickerFrom = null;
    this.#datepickerTo = null;
  }

  get template() {
    return renderEditCardTemplate(this._data);
  }

  setSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(this._data);
  }

  setCloseHandler = (callback) => {
    this._callback.close = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.#setPointTypeHandler();
  }

  #closeHandler = (evt) => {
    evt.preventDefault();
    this._callback.close(evt);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
    this.setSubmitHandler(this._callback.submit);
    this.setCloseHandler(this._callback.close);
  }

  #setDatepickerFrom = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name=event-start-time]'),
      {
        enableTime: true,
        dateFormat: 'd-m-y H:i',
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  }

  #setDatepickerTo = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name=event-end-time]'),
      {
        enableTime: true,
        dateFormat: 'd-m-y H:i',
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    }, true);
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTO: userDate,
    }, true);
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;
    if (value.length) {
      const price = parseInt(value, 10);
      this.updateData({
        basePrice: price,
      }, true);
    }
  }

  #setPointTypeHandler = () => {
    this.element.querySelectorAll('.event__type-input').forEach((item) => {
      item.addEventListener('change', this.#pointTypeChangeHandler);
    });
  }

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedOffers = offersData.find((item) => item.type.toLowerCase() === evt.target.value);
    this.updateData({
      offers: selectedOffers.offers,
      type: selectedOffers.type,
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = DESTINATIONS.find((item) => item.name === evt.target.value);
    this.updateData({
      destination: selectedDestination,
    });
  }

  static parseTaskToData = (_data) => ({..._data,});

  static parseDataToTask = (data) => {
    const point = {...data};
    return point;
  }

  reset = (point) => {
    this.updateData(
      EditCardView.parseTaskToData(point),
    );
  }
}
