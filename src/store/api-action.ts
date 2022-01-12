import { ThunkActionResult } from '../types/action';
import { toast } from 'react-toastify';
import { generatePath } from 'react-router-dom';

import {
  loadComments,
  loadMovies,
  loadPromo,
  setSelectedMovie,
  loadSimilarMovies,
  redirectToRoute,
  requireAuthInfo,
  requireAuthorization,
  requireLogout,
  setFavoriteListMovies, setPromoLoadingStatus
} from './action';
import { dropToken, saveToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../types/enum';
import { AuthData, Comment, PostedComment, Movie } from '../types/types';
import { adaptAuthInfoDataToClient, adaptMoviesDataToClient } from '../utils/adapters';
import { FavoriteStatusType } from '../types/enum';

const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться!';
const AUTH_MESSAGE = 'Спасибо за авторизацию!';
const LOGIN_ACTION_ERROR = 'При авторизации возникли проблемы с сервером!';
const LOGOUT_ACTION_ERROR = 'При выходе из профиля возникли проблемы с сервером!';
const MOVIES_ACTION_ERROR = 'Во время загрузки фильмов возникли проблемы!';
const PROMO_ACTION_ERROR = 'Во время загрузки промо фильма возникли проблемы!';
const SIMILAR_MOVIES_ACTION_ERROR = 'Во время загрузки похожих фильма возникли проблемы!';
const COMMENTS_MOVIES_ACTION_ERROR = 'Во время загрузки комметариев к фильму возникли проблемы!';
const SELECT_FAVORITE_MOVIE_ERROR = 'При добавлнении или удалении фильма произошла ошибка!';

export const fetchMoviesAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Movie[]>(APIRoute.Movies);
      const adaptedMoviesData = data.map((movie) => adaptMoviesDataToClient(movie));
      dispatch(loadMovies(adaptedMoviesData));
    } catch(exception) {
      dispatch(loadMovies([]));
      toast.error(MOVIES_ACTION_ERROR);
    }
  };

export const fetchFavoriteListMovies = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie[]>(APIRoute.FavoriteMovies);
    const adaptedMoviesData = data.map((movie) => adaptMoviesDataToClient(movie));
    dispatch(setFavoriteListMovies(adaptedMoviesData));
  };

export const fetchFavoriteMovie = (movieId: number, newStatus: FavoriteStatusType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.post(`${APIRoute.FavoriteMovies}/${movieId}/${newStatus}`);
    } catch(exception) {
      toast.error(SELECT_FAVORITE_MOVIE_ERROR);
    }
  };

export const fetchCommentsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadComments(data));
    } catch(exception) {
      dispatch(loadComments([]));
      toast.error(COMMENTS_MOVIES_ACTION_ERROR);
    }
  };

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Movie>(APIRoute.Promo);
      const adaptedMoviesData = adaptMoviesDataToClient(data);

      dispatch(setPromoLoadingStatus(true));
      dispatch(loadPromo(adaptedMoviesData));
    } catch(exception) {
      dispatch(loadPromo(undefined));
      toast.error(PROMO_ACTION_ERROR);
    } finally {
      dispatch(setPromoLoadingStatus(false));
    }
  };

export const fetchSimilarMoviesAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Movie[]>(generatePath(APIRoute.SimilarMovies.replace(':id', id.toString())));
      const adaptedMoviesData = data.map((movie) => adaptMoviesDataToClient(movie));
      dispatch(loadSimilarMovies(adaptedMoviesData));
    } catch(exception) {
      dispatch(loadSimilarMovies([]));
      toast.error(SIMILAR_MOVIES_ACTION_ERROR);
    }
  };

export const fetchSelectedMovieAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Movie>(`${APIRoute.Movies}/${id}`);
    const adaptedMoviesData =  adaptMoviesDataToClient(data);
    dispatch(setSelectedMovie(adaptedMoviesData));
  };

export const sendReview = (data: { ratingValue: number, commentValue: string, movieId: number }): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const url = `${APIRoute.Comments}/${data.movieId}`;
    await api.post<PostedComment>(url, {
      rating: data.ratingValue,
      comment: data.commentValue,
    });
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(requireAuthInfo(adaptAuthInfoDataToClient(data)));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const {data} = await api.post(APIRoute.Login, {email, password});
      const authData = adaptAuthInfoDataToClient(data);

      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(requireAuthInfo(authData));
      toast.info(AUTH_MESSAGE);
    } catch(exception) {
      dispatch(requireAuthInfo(undefined));
      toast.error(LOGIN_ACTION_ERROR);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogout());
    } catch(exception) {
      toast.error(LOGOUT_ACTION_ERROR);
    }
  };
