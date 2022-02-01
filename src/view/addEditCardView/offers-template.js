const offerTemplate = (offer, index) => (
  `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-${index}" type="checkbox" name="event-offer-${offer.name}">
    <label class="event__offer-label" for="event-offer-${offer.name}-${index}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
    </label>
    </div>`
);

export const renderOffers = (offers, index) => {
  let offersTempalte = '';

  offers.forEach((element) => {
    offersTempalte += offerTemplate(element, index);
  });

  return offersTempalte;
};
