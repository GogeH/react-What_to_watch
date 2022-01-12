import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Movie } from '../../types/types';

function MovieCardButtonPlay(props: {
  movie: Movie
}): JSX.Element {
  return (
    <Link className="btn btn--play film-card__button" to={`/player/${props.movie?.id}`}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s" />
      </svg>
      <span>Play</span>
    </Link>
  );
}

export default memo(MovieCardButtonPlay);
