import { ActionType } from '../types/action';
import { AuthInfo, Comment, Movie } from '../types/types';
import { AuthorizationStatus } from '../types/enum';
import { AppRoute } from '../types/enum';
import { PostedComment } from '../types/types';

export type Action<T> = {
  type: ActionType,
  payload?: T,
}

export type SetLoadedMoviesCountAction = {
  type: ActionType,
  payload: number,
}

function setLoadedMoviesCount(count: number): SetLoadedMoviesCountAction {
  return ({
    type: ActionType.SetLoadedMoviesCount,
    payload: count,
  }) as const;
}

function setGenre(genre: string): Action<string> {
  return ({
    type: ActionType.SetGenre,
    payload: genre,
  }) as const;
}

function loadMovies(movies: Movie[]): Action<Movie[]> {
  return ({
    type: ActionType.LoadMovies,
    payload: movies,
  }) as const;
}

function requireAuthorization(authStatus: AuthorizationStatus): Action<AuthorizationStatus> {
  return ({
    type: ActionType.RequireAuthorization,
    payload: authStatus,
  }) as const;
}

function requireLogout(): Action<undefined> {
  return ({
    type: ActionType.RequireLogout,
  }) as const;
}

function requireAuthInfo(authInfo: AuthInfo | undefined): Action<AuthInfo> {
  return ({
    type: ActionType.RequireAuthInfo,
    payload: authInfo,
  }) as const;
}

const redirectToRoute = (url: AppRoute | string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

function setReviews(reviews: PostedComment[]): Action<PostedComment[]> {
  return ({
    type: ActionType.SetReviews,
    payload: reviews,
  } as const);
}

function loadComments(comments: Comment[]): Action<Comment[]> {
  return ({
    type: ActionType.LoadComments,
    payload: comments,
  }) as const;
}

function loadPromo(movie: Movie | undefined): Action<Movie>  {
  return ({
    type: ActionType.LoadPromo,
    payload: movie,
  }) as const;
}

function setPromoLoadingStatus(status: boolean): Action<boolean>  {
  return ({
    type: ActionType.SetPromoLoadingStatus,
    payload: status,
  }) as const;
}

function loadSimilarMovies(movies: Movie[]): Action<Movie[]> {
  return ({
    type: ActionType.LoadSimilarMovies,
    payload: movies,
  }) as const;
}

function setSelectedMovie(movie: Movie): Action<Movie> {
  return ({
    type: ActionType.SetSelectedMovie,
    payload: movie,
  }) as const;
}

function setSelectedMovieId(id: number): Action<number> {
  return ({
    type: ActionType.SetSelectedMovieId,
    payload: id,
  }) as const;
}

function setFavoriteListMovies(movies: Movie[] | null): Action<Movie[] | null> {
  return ({
    type: ActionType.SetFavoriteListMovies,
    payload: movies,
  }) as const;
}

function setFavoriteMovie(status: number): Action<number> {
  return ({
    type: ActionType.SetFavoriteMovie,
    payload: status,
  }) as const;
}

function requireUnknown(authStatus: AuthorizationStatus): Action<AuthorizationStatus> {
  return ({
    type: ActionType.RequireUnknown,
    payload: authStatus,
  }) as const;
}

export {
  setLoadedMoviesCount,
  setGenre,
  loadMovies,
  requireAuthorization,
  requireLogout,
  requireAuthInfo,
  requireUnknown,
  redirectToRoute,
  setReviews,
  loadComments,
  loadPromo,
  loadSimilarMovies,
  setSelectedMovie,
  setSelectedMovieId,
  setFavoriteListMovies,
  setFavoriteMovie,
  setPromoLoadingStatus
};
