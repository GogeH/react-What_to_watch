import { MoviesData } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { Movie } from '../../../types/types';

const initialState: MoviesData = {
  movies: [],
  promo: undefined,
  promoIsLoading: false,
  similarMovies: [],
  isMoviesLoaded: false,
};

const moviesData = (state = initialState, action: Actions): MoviesData => {
  switch (action.type) {
    case ActionType.LoadMovies:
      return {...state, movies: action.payload as Movie[], isMoviesLoaded: true };
    case ActionType.LoadPromo:
      return {...state, promo: action.payload as Movie};
    case ActionType.SetPromoLoadingStatus:
      return {...state, promoIsLoading: action.payload as boolean };
    case ActionType.LoadSimilarMovies:
      return {...state, similarMovies: action.payload as Movie[]};
    default:
      return state;
  }
};

export {moviesData};
