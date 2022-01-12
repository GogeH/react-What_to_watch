import { memo } from 'react';

import { getRatingMovie, getFormattedRating } from '../../utils/get-grade-movie';
import { Movie } from '../../types/types';

function MovieOverviewTab(props: {
  movie: Movie,
}): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{getFormattedRating(props.movie.rating)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingMovie(Number(Math.round(props.movie.rating)))}</span>
          <span className="film-rating__count">{props.movie.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{props.movie.description}</p>
        <p className="film-card__director"><strong>Director: {props.movie.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {props.movie.starring.slice(0, 4).join(', ')} and other</strong></p>
      </div>
    </>
  );
}

export default memo(MovieOverviewTab);
