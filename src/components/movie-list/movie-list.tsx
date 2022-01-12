import { connect, ConnectedProps } from 'react-redux';

import MovieItem from '../movie-item/movie-item';
import { State } from '../../types/state';
import { getFilterMovie } from '../../utils/get-filter-movie';
import Loading from '../loading/loading';

function mapStateToProps({MOVIES_DATA, PROCESS_MOVIES}: State) {
  const moviesByGenre = getFilterMovie(MOVIES_DATA.movies, PROCESS_MOVIES.genre);
  return {
    movies: moviesByGenre.slice(0, PROCESS_MOVIES.loadedMoviesCount),
    isMoviesLoaded: MOVIES_DATA.isMoviesLoaded,
    loadedMoviesCount: PROCESS_MOVIES.loadedMoviesCount,
  };
}

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function MovieList(props: ConnectedComponentProps): JSX.Element {
  if(!props.isMoviesLoaded) {
    <Loading />;
  }

  return (
    <div className="catalog__films-list">
      {props.movies.slice(0, props.loadedMoviesCount).map((movie) => (
        <MovieItem movie={movie}
          key={movie.id}
        />
      ))}
    </div>
  );
}

export { MovieList };
export default connector(MovieList);
