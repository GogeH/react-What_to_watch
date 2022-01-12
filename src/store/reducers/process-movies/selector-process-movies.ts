import { createSelector } from 'reselect';

import { getMovies } from '../movies-data/selector-movies-data';
import { ALL_GENRES } from '../../../types/const';
import { State } from '../../../types/state';
import { Movie } from '../../../types/types';
import { NameSpace } from '../../root-reducer';

export const getFavoriteListMovies = (state: State): Movie[] | undefined => state[NameSpace.ProcessMovies].favoriteListMovies;

export const getFavoriteListMoviesSelector = createSelector(getFavoriteListMovies, (movies) =>
  movies,
);

export const getGenresSelector = createSelector(getMovies,
  (movies) => {
    const set = new Set(movies.map((movie) => movie.genre));
    return [ALL_GENRES].concat(Array.from(set));
  },
);
