import { State } from './state';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  setGenre,
  loadMovies,
  requireAuthorization,
  requireLogout,
  SetLoadedMoviesCountAction,
  redirectToRoute,
  setReviews,
  requireAuthInfo,
  loadComments,
  loadPromo,
  loadSimilarMovies,
  setSelectedMovie,
  setSelectedMovieId,
  setFavoriteListMovies,
  setFavoriteMovie,
  setPromoLoadingStatus
} from '../store/action';

export enum ActionType {
  SetGenre = 'change/setGenre',
  LoadMovies = 'data/movie',
  RequireAuthorization = 'user/requireAuthorization',
  RequireUnknown = 'user/requireUnknown',
  RequireLogout = 'user/requireLogout',
  RequireAuthInfo = 'user/requireAuthInfo',
  SetLoadedMoviesCount = 'change/setLoadedMoviesCount',
  RedirectToRoute = 'app/redirectToRoute',
  SetReviews = 'app/setReviews',
  LoadComments = 'data/comments',
  LoadPromo = 'data/promo',
  SetPromoLoadingStatus = 'data/setPromoLoadingStatus',
  LoadSimilarMovies = 'data/similarMovie',
  SetSelectedMovie = 'data/setSelectedMovie',
  SetSelectedMovieId = 'data/setSelectedMovieId',
  SetFavoriteListMovies = 'change/setFavoriteListMovies',
  SetFavoriteMovie = 'change/setFavoriteMovie',
}

export type Actions =
  | ReturnType<typeof setGenre>
  | ReturnType<typeof loadMovies>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof requireAuthInfo>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof setReviews>
  | ReturnType<typeof loadComments>
  | ReturnType<typeof loadPromo>
  | ReturnType<typeof loadSimilarMovies>
  | ReturnType<typeof setSelectedMovie>
  | ReturnType<typeof setSelectedMovieId>
  | ReturnType<typeof setFavoriteListMovies>
  | ReturnType<typeof setFavoriteMovie>
  | ReturnType<typeof setPromoLoadingStatus>
  | SetLoadedMoviesCountAction

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
