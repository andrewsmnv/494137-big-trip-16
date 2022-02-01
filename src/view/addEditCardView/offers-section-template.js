import { renderOffers } from './offers-template';

export const renderOfferSectionTempalte = (offers, index) => {
  if (offers.length) {
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${renderOffers(offers, index)}
    </div>
  </section>`;
  } else {
    return '';
  }
};
