import {RENDER_POSITION, render} from '../render';
import {updateItem} from './../utils';
import { SortType } from '../const/sort-type';
import { sortByPrice, sortByDate, sortByDuration} from '../mock/point.js';

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
    #currentSortType = null;

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
        this.#renderSort();
        for(let i = 0; i < this.#tripPoints.length; i++) {
          this.#renderPoint(this.#eventListContainer.element, this.#tripPoints[i]);
        }

      } else {
        this.#renderNoPoints();
      }
    }

  #renderSort = () => {
    render(this.#contentContainer, this.#sortComponent.element, RENDER_POSITION.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNoPoints = () => {
    render(this.#contentContainer, this.#noPointsComponent.element, RENDER_POSITION.BEFOREEND);
  }

  #renderPoint = (pointsContainer, point) => {
    const pointPresenter = new PointPresenter(pointsContainer, this.#handlePointChange, this.#handleModeChange);      pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderTripEvents = () => {
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#eventListContainer.element ,this.#tripPoints[i]);
    }
  }

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.DURATION:
        this.#tripPoints.sort(sortByDuration);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      default:
        this.#tripPoints.sort(sortByDate);
    }

    if (sortType) {
      this.#currentSortType = sortType;
    } else {
      this.#currentSortType = SortType.DATE;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearEventsList();
    this.#renderTripEvents();
  }

  #clearEventsList = () => {
    this.#pointPresenter.forEach((p) => p.destroy());
    this.#pointPresenter.clear();
  }
}
