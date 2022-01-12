import { createSelector } from 'reselect';

import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Movie } from '../../../types/types';

const SIMILAR_MOVIES_COUNT = 4;

export const getMovies = (state: State): Movie[] => state[NameSpace.MoviesData].movies;
export const getPromo = (state: State): Movie | undefined => state[NameSpace.MoviesData].promo;
export const getSimilarMovies = (state: State): Movie[] => state[NameSpace.MoviesData].similarMovies;

export const getMoviesSelector = createSelector(getMovies, (movies) =>
  movies,
);

export const getPromoSelector = createSelector(getPromo, (movie) =>
  movie,
);

export const getSimilarMoviesSelector = createSelector(getSimilarMovies, (movies) =>
  movies.slice(0, SIMILAR_MOVIES_COUNT),
);
