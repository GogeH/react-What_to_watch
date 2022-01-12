import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { memo } from 'react';

import Logo from '../logo/logo';
import ReviewForm from '../review-form/review-form';
import { Movie } from '../../types/types';
import { MovieParam } from '../../types/types';
import Error from '../error/error';
import { AppRoute, AuthorizationStatus } from '../../types/enum';
import UserBlockLogged from '../user-block-logged/user-block-logged';
import UserBlockUnLogged from '../user-block-logged/user-block-un-logged';
import { getMoviesSelector } from '../../store/reducers/movies-data/selector-movies-data';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';

function Review(): JSX.Element {
  const movies = useSelector(getMoviesSelector);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const { id } = useParams<MovieParam>();
  const selectedMovie = movies.find((movie: Movie) => movie.id.toString() === id);

  if (!selectedMovie) {
    return <Error />;
  }

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return <Redirect to={AppRoute.SignIn}/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={selectedMovie.backgroundImage} alt={selectedMovie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Logo />
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${selectedMovie.id}`} className="breadcrumbs__link">{selectedMovie.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${selectedMovie.id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          {
            authorizationStatus === AuthorizationStatus.Auth
              ?
              <UserBlockLogged />
              :
              <UserBlockUnLogged />
          }

        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={selectedMovie.previewImage} alt={selectedMovie.name} width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm/>
      </div>

    </section>
  );
}

export default memo(Review);
