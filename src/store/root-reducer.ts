import { combineReducers } from '@reduxjs/toolkit';

import { moviesData } from './reducers/movies-data/movies-data';
import { commentsData } from './reducers/comments-data/comments-data';
import { userAuth } from './reducers/user-auth/user-auth';
import { processMovies } from './reducers/process-movies/process-movies';

export enum NameSpace {
  MoviesData = 'MOVIES_DATA',
  CommentsData = 'COMMENTS_DATA',
  UserAuth = 'USER_AUTH',
  ProcessMovies = 'PROCESS_MOVIES',
}

export const rootReducer = combineReducers({
  [NameSpace.MoviesData]: moviesData,
  [NameSpace.CommentsData]: commentsData,
  [NameSpace.UserAuth]: userAuth,
  [NameSpace.ProcessMovies]: processMovies,
});

export type RootState = ReturnType<typeof rootReducer>;
