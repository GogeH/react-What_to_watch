import { processMovies } from './process-movies';
import { ActionType } from '../../../types/action';
import { createMockMovie, createMockMovies } from '../../../mocks/movieFake';
import { ProcessMovies } from '../../../types/state';
import { ALL_GENRES, FIRST_LOADED_MOVIES } from '../../../types/const';

const mockMovies = createMockMovies();
const mockMovie = createMockMovie();
const LOADED_MOVIES = 16;
const SELECTED_MOVIES_ID = 4;

describe('Reducer: process-movies', () => {
  const state: ProcessMovies = {
    genre: ALL_GENRES,
    loadedMoviesCount: FIRST_LOADED_MOVIES,
    selectedMovie: undefined,
    selectedMovieId: 0,
    favoriteListMovies: undefined,
    favoriteMovie: undefined,
  };

  it('should return set genre', ()=> {
    const action = {
      type: ActionType.SetGenre,
      payload: ALL_GENRES,
    };

    expect(processMovies(state, action))
      .toEqual({
        genre: ALL_GENRES,
        loadedMoviesCount: FIRST_LOADED_MOVIES,
        selectedMovie: undefined,
        selectedMovieId: 0,
        favoriteListMovies: undefined,
        favoriteMovie: undefined,
      });
  });

  it('should return set loaded movies count', ()=> {
    const action = {
      type: ActionType.SetLoadedMoviesCount,
      payload: LOADED_MOVIES,
    };

    expect(processMovies(state, action))
      .toEqual({
        genre: ALL_GENRES,
        loadedMoviesCount: LOADED_MOVIES,
        selectedMovie: undefined,
        selectedMovieId: 0,
        favoriteListMovies: undefined,
        favoriteMovie: undefined,
      });
  });

  it('should return selected movie', ()=> {
    const action = {
      type: ActionType.SetSelectedMovie,
      payload: mockMovie,
    };

    expect(processMovies(state, action))
      .toEqual({
        genre: ALL_GENRES,
        loadedMoviesCount: FIRST_LOADED_MOVIES,
        selectedMovie: mockMovie,
        selectedMovieId: 0,
        favoriteListMovies: undefined,
        favoriteMovie: undefined,
      });
  });

  it('should return selected movie id', ()=> {
    const action = {
      type: ActionType.SetSelectedMovieId,
      payload: SELECTED_MOVIES_ID,
    };

    expect(processMovies(state, action))
      .toEqual({
        genre: ALL_GENRES,
        loadedMoviesCount: FIRST_LOADED_MOVIES,
        selectedMovie: undefined,
        selectedMovieId: SELECTED_MOVIES_ID,
        favoriteListMovies: undefined,
        favoriteMovie: undefined,
      });
  });

  it('should return set favorite list movies', ()=> {
    const action = {
      type: ActionType.SetFavoriteListMovies,
      payload: mockMovies,
    };

    expect(processMovies(state, action))
      .toEqual({
        genre: ALL_GENRES,
        loadedMoviesCount: FIRST_LOADED_MOVIES,
        selectedMovie: undefined,
        selectedMovieId: 0,
        favoriteListMovies: mockMovies,
        favoriteMovie: undefined,
      });
  });

  it('should return set favorite movie', ()=> {
    const action = {
      type: ActionType.SetFavoriteMovie,
      payload: mockMovie,
    };

    expect(processMovies(state, action))
      .toEqual({
        genre: ALL_GENRES,
        loadedMoviesCount: FIRST_LOADED_MOVIES,
        selectedMovie: undefined,
        selectedMovieId: 0,
        favoriteListMovies: undefined,
        favoriteMovie: mockMovie,
      });
  });
});
