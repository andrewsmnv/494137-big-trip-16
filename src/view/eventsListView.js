import AbstractView from './abstractView';

const createEventsListMarkup = () => '<ul class="trip-events__list"></ul>';

export default class EventsListView extends AbstractView {
  get template() {
    return createEventsListMarkup();
  }
}
