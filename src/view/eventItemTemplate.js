import dayjs from 'dayjs';

export const eventItemTemplate = (item) => {
  const isFavorite = () => {
    if(item.isFavorite === true) {
      return 'active';
    }
  };

  const generateOffersList = () => {
    let string = '';
    item.offers.forEach((offer) => {
      string += ` <li class="event__offer">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
                </li>`;
    });
    return string;
  };

  const generateEventDuration = () => {
    const timeFrame = dayjs(item.dateTo).diff(dayjs(item.dateFrom), 'minutes');
    return timeFrame;
  };

  const generateEventTimeFromTo = (data) => {
    const time = dayjs(data).format('HH:mm');
    return time;
  };

  const generateEventMonth = (data) => {
    const date = dayjs(data).format('MMM DD');
    return date;
  };

  const generateTimeDate = (data) => {
    const date = dayjs(data).format('YYYY-MM-DDTHH:mm');
    return date;
  };

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${generateEventMonth(item.dateTo)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${item.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${item.type} ${item.destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${generateTimeDate(item.dateFrom)}">${generateEventTimeFromTo(item.dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="${generateTimeDate(item.dateTo)}">${generateEventTimeFromTo(item.dateTo)}</time>
        </p>
        <p class="event__duration">${generateEventDuration()}M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${item.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${generateOffersList()}
      </ul>
      <button class="event__favorite-btn event__favorite-btn--${isFavorite()}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;
};
