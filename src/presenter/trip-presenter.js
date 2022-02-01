import {RENDER_POSITION, render} from '../render';
import {updateItem} from '../utils';

import TripInfoView from '../view/trip-info-view';
import NavigationView from '../view/navigation-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventListView from '../view/events-list-view';
import NoPointsView from '../view/empty-list-view';
import PointPresenter from './point-presenter';

export default class TripPresenter {
    #mainContainer = null;
    #navigationContainer = null;
    #filtersContainer = null;
    #contentContainer = null;

    #tripInfoComponent = new TripInfoView();
    #navigationComponent = new NavigationView();
    #filersComponent = new FiltersView();
    #sortComponent = new SortView();
    #noPointsComponent = new NoPointsView();
    #eventListContainer = new EventListView();
    #pointPresenter = new Map();

    #tripPoints = [];
    #sourcedtripPoints = [];

    constructor(mainContainer, navigationContainer, filtersContainer, contentContainer) {
      this.#mainContainer = mainContainer;
      this.#navigationContainer = navigationContainer;
      this.#filtersContainer = filtersContainer;
      this.#contentContainer = contentContainer;
    }

    #handlePointChange = (updatedPoint) => {
      this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
      this.#sourcedtripPoints = updateItem(this.#sourcedtripPoints, updatedPoint);
      this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
    }

    #handleModeChange = () => {
      this.#pointPresenter.forEach((presenter) => presenter.resetView());
    }

    init = (tripPoints) => {
      this.#tripPoints = [...tripPoints];
      this.#sourcedtripPoints = [...tripPoints];

      render(this.#mainContainer, this.#tripInfoComponent.element, RENDER_POSITION.AFTERBEGIN);
      render(this.#navigationContainer, this.#navigationComponent.element, RENDER_POSITION.BEFOREEND);
      render(this.#filtersContainer, this.#filersComponent.element, RENDER_POSITION.BEFOREEND);
      render(this.#contentContainer, this.#eventListContainer.element, RENDER_POSITION.BEFOREEND);
      if (this.#tripPoints.length) {
        render(this.#contentContainer, this.#sortComponent.element, RENDER_POSITION.AFTERBEGIN);

        for(let i = 0; i < this.#tripPoints.length; i++) {
          this.#renderPoint(this.#eventListContainer.element, this.#tripPoints[i]);
        }

      } else {
        render(this.#contentContainer, this.#noPointsComponent.element, RENDER_POSITION.BEFOREEND);
      }
    }

  #renderPoint = (pointsContainer, point) => {
    const pointPresenter = new PointPresenter(pointsContainer, this.#handlePointChange, this.#handleModeChange);      pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };
}
