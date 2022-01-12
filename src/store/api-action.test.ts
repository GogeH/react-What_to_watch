import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute, AppRoute, AuthorizationStatus } from '../types/enum';
import {
  checkAuthAction, fetchCommentsAction, fetchFavoriteListMovies, fetchFavoriteMovie,
  fetchMoviesAction,
  fetchPromoAction, fetchSelectedMovieAction,
  fetchSimilarMoviesAction,
  loginAction,
  logoutAction,
  sendReview
} from './api-action';
import {
  loadComments,
  loadMovies,
  loadPromo,
  loadSimilarMovies,
  redirectToRoute,
  requireAuthInfo,
  requireAuthorization,
  requireLogout,
  setFavoriteListMovies, setPromoLoadingStatus,
  setSelectedMovie
} from './action';
import { adaptAuthInfoDataToClient, adaptMoviesDataToClient } from '../utils/adapters';
import { createMockAuthData, createMockServerAuthInfo } from '../mocks/authorizationFake';
import { createMockMovie, createMockMovies } from '../mocks/movieFake';
import { createMockCommentForMovie, createMockComments } from '../mocks/commentsFake';
import { generatePath } from 'react-router-dom';

const mockServerAuthInfo = createMockServerAuthInfo();
const mockAuthData = createMockAuthData();
const mockMovie = createMockMovie();
const mockMovies = createMockMovies();
const mockComments = createMockComments();
const mockComment = createMockCommentForMovie();

const idMockMovie = 3;
const mockMovieNewStatus = 1;

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch LoadMovies when GET / movies', async () => {
    mockAPI
      .onGet(APIRoute.Movies)
      .reply(200, mockMovies);

    const store = mockStore();
    await store.dispatch(fetchMoviesAction());

    expect(store.getActions()).toEqual([
      loadMovies(mockMovies.map(adaptMoviesDataToClient)),
    ]);
  });

  it('should dispatch PromoMovies when GET / movie', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockMovie);

    const store = mockStore();
    await store.dispatch(fetchPromoAction());

    expect(store.getActions()).toEqual([
      setPromoLoadingStatus(true),
      loadPromo(adaptMoviesDataToClient(mockMovie)),
      setPromoLoadingStatus(false),
    ]);
  });

  it('should dispatch SimilarMovies when GET / movies', async () => {
    mockAPI
      .onGet(generatePath(APIRoute.SimilarMovies.replace(':id', idMockMovie.toString())))
      .reply(200, mockMovies);

    const store = mockStore();
    await store.dispatch(fetchSimilarMoviesAction(idMockMovie));

    expect(store.getActions()).toEqual([
      loadSimilarMovies(mockMovies.map(adaptMoviesDataToClient)),
    ]);
  });

  it('should dispatch SelectedMovie when GET / movie', async () => {
    mockAPI
      .onGet(`${APIRoute.Movies}/${idMockMovie}`)
      .reply(200, mockMovie);

    const store = mockStore();
    await store.dispatch(fetchSelectedMovieAction(idMockMovie));

    expect(store.getActions()).toEqual([
      setSelectedMovie(adaptMoviesDataToClient(mockMovie)),
    ]);
  });

  it('should dispatch FavoriteMovies when GET / movies', async () => {
    mockAPI
      .onGet(APIRoute.FavoriteMovies)
      .reply(200, mockMovies);

    const store = mockStore();
    await store.dispatch(fetchFavoriteListMovies());

    expect(store.getActions()).toEqual([
      setFavoriteListMovies(mockMovies.map(adaptMoviesDataToClient)),
    ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, mockServerAuthInfo);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      requireAuthInfo(adaptAuthInfoDataToClient(mockServerAuthInfo)),
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, mockServerAuthInfo);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockAuthData));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
      requireAuthInfo(adaptAuthInfoDataToClient(mockServerAuthInfo)),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('user-token', mockServerAuthInfo.token);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('user-token');
  });

  it('should dispatch Comments when GET / comments', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${idMockMovie}`)
      .reply(200, mockComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(idMockMovie));

    expect(store.getActions()).toEqual([
      loadComments(mockComments),
    ]);
  });

  it('should dispatch SendReview when Post / comment', async () => {
    const url = `${APIRoute.Comments}/${idMockMovie}`;

    mockAPI
      .onPost(url)
      .reply((config) => {
        expect(config.data).toEqual(JSON.stringify({
          rating: mockComment.rating,
          comment: mockComment.comment,
        }));
        expect(`${url}`).toEqual(config.url);
        return [200, {}];
      });

    const store = mockStore();
    await store.dispatch(sendReview({
      ratingValue: mockComment.rating,
      commentValue: mockComment.comment,
      movieId: idMockMovie,
    }));
  });

  it('should dispatch FavoriteMovie when POST / movies', async () => {
    const url = `${APIRoute.FavoriteMovies}/${idMockMovie}/${mockMovieNewStatus}`;

    mockAPI
      .onPost(url)
      .reply((config) => {
        expect(`${url}`).toEqual(config.url);
        return [200, {}];
      });

    const store = mockStore();
    await store.dispatch(fetchFavoriteMovie(idMockMovie, mockMovieNewStatus));
  });

});
