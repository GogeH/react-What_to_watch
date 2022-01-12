import { ALL_GENRES, FIRST_LOADED_MOVIES } from '../../../types/const';
import { ProcessMovies } from '../../../types/state';
import { Actions, ActionType } from '../../../types/action';
import { Movie } from '../../../types/types';

const initialState: ProcessMovies = {
  genre: ALL_GENRES,
  loadedMoviesCount: FIRST_LOADED_MOVIES,
  selectedMovie: undefined,
  selectedMovieId: 0,
  favoriteListMovies: undefined,
  favoriteMovie: undefined,
};

const processMovies = (state= initialState, action: Actions): ProcessMovies => {
  switch (action.type) {
    case ActionType.SetGenre:
      return {...state, genre: action.payload as string};
    case ActionType.SetLoadedMoviesCount:
      return {...state, loadedMoviesCount: action.payload as number};
    case ActionType.SetSelectedMovie:
      return {...state, selectedMovie: action.payload as Movie};
    case ActionType.SetSelectedMovieId:
      return {...state, selectedMovieId: action.payload as number};
    case ActionType.SetFavoriteListMovies:
      return {...state, favoriteListMovies: action.payload as Movie[]};
    case ActionType.SetFavoriteMovie:
      return {...state, favoriteMovie: action.payload as number};
    default:
      return state;
  }
};

export {processMovies};
