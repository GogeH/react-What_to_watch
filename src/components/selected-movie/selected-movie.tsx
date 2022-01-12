import { useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { Movie } from '../../types/types';
import { MovieParam } from '../../types/types';
import MovieTabs  from '../movie-tabs/movie-tabs';
import Error from '../error/error';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../types/enum';
import UserBlockLogged from '../user-block-logged/user-block-logged';
import UserBlockUnLogged from '../user-block-logged/user-block-un-logged';
import { ThunkAppDispatch } from '../../types/action';
import {
  fetchCommentsAction,
  fetchSelectedMovieAction,
  fetchSimilarMoviesAction
} from '../../store/api-action';
import { setSelectedMovieId } from '../../store/action';
import MovieItem from '../movie-item/movie-item';
import Footer from '../footer/footer';
import Loading from '../loading/loading';
import MovieCardButtonPlay from '../movie-card-button-play/movie-card-button-play';
import MovieCardButtonListFavorite from '../movie-card-button-favorite-list/movie-card-button-favorite-list';
import { getMoviesSelector, getSimilarMoviesSelector } from '../../store/reducers/movies-data/selector-movies-data';
import { getCommentsSelector } from '../../store/reducers/comments-data/selector-comments-data';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    fetchSelectedMovie(id: number) {
      dispatch(fetchSelectedMovieAction(id));
    },
    fetchSimilarMovies(id: number) {
      dispatch(fetchSimilarMoviesAction(id));
    },
    saveSelectedMovieId(id: number) {
      dispatch(setSelectedMovieId(id));
    },
    fetchComments(id: number) {
      dispatch(fetchCommentsAction(id));
    },
  };
}

const connector = connect(null, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function SelectedMovie(props: ConnectedComponentProps): JSX.Element {
  const movies = useSelector(getMoviesSelector);
  const similarMovies = useSelector(getSimilarMoviesSelector);
  const comments = useSelector(getCommentsSelector);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const { saveSelectedMovieId, fetchSelectedMovie, fetchSimilarMovies, fetchComments } = props;
  const { id } = useParams<MovieParam>();
  const idIsNumber = Number(id);

  const selectedMovie = movies.find((movie: Movie) => movie.id.toString() === id);

  useEffect(() => {
    saveSelectedMovieId(idIsNumber);
    fetchSelectedMovie(idIsNumber);
  },[saveSelectedMovieId, fetchSelectedMovie, idIsNumber]);

  useEffect(() => {
    fetchComments(idIsNumber);
  },[fetchComments, idIsNumber]);

  useEffect(() => {
    fetchSimilarMovies(idIsNumber);
  },[fetchSimilarMovies, idIsNumber]);

  if(!movies) {
    return <Loading />;
  }

  if (!selectedMovie) {
    return <Error />;
  }

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={selectedMovie.backgroundImage} alt={selectedMovie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Logo/>
            </div>

            {authorizationStatus === AuthorizationStatus.Auth
              ?
              <UserBlockLogged />
              :
              <UserBlockUnLogged />}

          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{selectedMovie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{selectedMovie.genre}</span>
                <span className="film-card__year">{selectedMovie.released}</span>
              </p>

              <div className="film-card__buttons">

                <MovieCardButtonPlay movie={selectedMovie}/>

                {authorizationStatus === AuthorizationStatus.Auth &&
                  <>
                    <MovieCardButtonListFavorite
                      movie={selectedMovie}
                      id={selectedMovie.id}
                      isFavorite={selectedMovie.isFavorite}
                    />

                    <Link to={`/films/${selectedMovie.id}/review`} className="btn film-card__button">Add review</Link>
                  </>}

              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={selectedMovie.previewImage} alt={selectedMovie.name} width="218"
                height="327"
              />
            </div>

            <MovieTabs movie={selectedMovie} reviews={comments}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similarMovies.map((movie) => (
              <MovieItem movie={movie}
                key={movie.id}
              />
            ))}
          </div>

        </section>

        <Footer />

      </div>
    </div>
  );
}

export { SelectedMovie };
export default connector(SelectedMovie);


