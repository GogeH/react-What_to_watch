import { AuthorizationStatus } from './enum';
import { AuthInfo, Comment, Movie } from './types';
import { RootState } from '../store/root-reducer';

export type MoviesData = {
  movies: Movie[],
  promo?: Movie | undefined,
  promoIsLoading: boolean,
  similarMovies: Movie[],
  isMoviesLoaded: boolean,
};

export type ProcessMovies = {
  genre: string,
  loadedMoviesCount: number,
  selectedMovie?: Movie,
  selectedMovieId: number,
  favoriteListMovies?: Movie[],
  favoriteMovie?: number,
};

export type UserAuth = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};

export type CommentsData = {
  comments: Comment[],
};

export type State = RootState;

