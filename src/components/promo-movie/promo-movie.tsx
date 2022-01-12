import { connect, ConnectedProps, useSelector } from 'react-redux';

import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../types/enum';
import UserBlockLogged from '../user-block-logged/user-block-logged';
import UserBlockUnLogged from '../user-block-logged/user-block-un-logged';
import MovieCardButtonPlay from '../movie-card-button-play/movie-card-button-play';
import { State } from '../../types/state';
import Spinner from '../spinner/spinner';
import MovieCardButtonListFavorite from '../movie-card-button-favorite-list/movie-card-button-favorite-list';
import { getPromoSelector } from '../../store/reducers/movies-data/selector-movies-data';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';

function mapStateToProps({ MOVIES_DATA }: State) {
  return {
    promoIsLoading: MOVIES_DATA.promoIsLoading,
  };
}

const connector = connect(mapStateToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function PromoMovie(props: ConnectedComponentProps): JSX.Element {
  const promo = useSelector(getPromoSelector);
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if(props.promoIsLoading) {
    return <Spinner />;
  }

  if(!promo) {
    return <div>Во время загрузки промо фильма возникли проблемы с сервером!</div>;
  }

  const { id, isFavorite } = promo;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promo?.backgroundImage} alt={promo?.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header film-card__head">
        <div className="logo">
          <Logo />
        </div>

        {
          authorizationStatus === AuthorizationStatus.Auth
            ?
            <UserBlockLogged />
            :
            <UserBlockUnLogged />
        }

      </header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={promo?.posterImage} alt={promo?.name} width="218" height="327"/>
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{promo?.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promo?.genre}</span>
              <span className="film-card__year">{promo?.released}</span>
            </p>

            <div className="film-card__buttons">

              <MovieCardButtonPlay movie={promo}/>

              {authorizationStatus === AuthorizationStatus.Auth &&
              <MovieCardButtonListFavorite
                movie={promo}
                id={id}
                isFavorite={isFavorite}
              />}

            </div>
          </div>
        </div>
      </div>
    </section>

  );
}

export { PromoMovie };
export default connector(PromoMovie);
