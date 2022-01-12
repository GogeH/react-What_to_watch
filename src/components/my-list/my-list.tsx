import { useEffect } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';

import Logo from '../logo/logo';
import UserBlockLogged from '../user-block-logged/user-block-logged';
import Footer from '../footer/footer';
import MovieItem from '../movie-item/movie-item';
import { fetchFavoriteListMovies } from '../../store/api-action';
import { ThunkAppDispatch } from '../../types/action';
import { getFavoriteListMoviesSelector } from '../../store/reducers/process-movies/selector-process-movies';

function mapDispatchToProps(dispatch: ThunkAppDispatch) {
  return {
    async changeFavoriteListMovies() {
      await dispatch(fetchFavoriteListMovies());
    },
  };
}

const connector = connect(null, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function MyList(props: ConnectedComponentProps): JSX.Element {
  const favoriteListMovies = useSelector(getFavoriteListMoviesSelector);

  const { changeFavoriteListMovies } = props;

  useEffect(()=> {
    changeFavoriteListMovies();
  }, [changeFavoriteListMovies]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlockLogged />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">

          {
            favoriteListMovies &&
            favoriteListMovies.map((movie) => (
              <MovieItem movie={movie}
                key={movie.id}
              />))
          }

        </div>
      </section>
      <Footer />
    </div>
  );
}

export { MyList };
export default connector(MyList);

