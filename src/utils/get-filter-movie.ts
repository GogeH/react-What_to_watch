import { Movie } from '../types/types';
import { ALL_GENRES } from '../types/const';

export function getFilterMovie(movies: Movie[], activeGenre: string): Movie[] {
  if (activeGenre === ALL_GENRES) {
    return movies;
  }
  return movies.filter((movie) => movie.genre === activeGenre);
}
