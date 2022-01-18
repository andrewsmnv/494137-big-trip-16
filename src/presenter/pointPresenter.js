import { RENDER_POSITION, render, replace, remove } from '../render';
import EditEventCardView from '../view/editEventCardView';
import EventItemView from '../view/eventItemView';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export class PointPresenter {
  #point = null;
  #mode = MODE.DEFAULT;
  #pointsContainer = null;
  #changeData = null;
  #changeMode = null;
  #pointComponent = null;
  #pointEditComponent = null;


  constructor(pointsContainer, changeData, changeMode) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventItemView(point);
    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent = new EditEventCardView(point);
    this.#pointEditComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setCloseHandler(this.#handleFormClose);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointsContainer, this.#pointComponent.element, RENDER_POSITION.BEFOREEND);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent.element, prevPointComponent.element);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#pointEditComponent.element, prevPointEditComponent.element);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm = () => {
    this.#pointsContainer.replaceChild(this.#pointEditComponent.element, this.#pointComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #replaceFormToPoint = () => {
    this.#pointsContainer.replaceChild(this.#pointComponent.element, this.#pointEditComponent.element);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  }

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  }
}