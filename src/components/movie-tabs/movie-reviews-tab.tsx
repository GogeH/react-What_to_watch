import { memo } from 'react';

import MovieReviewsTabItem from './movie-reviews-tab-item';
import { Comment } from '../../types/types';

function MovieReviewsTab(props: {
  reviews: Comment[],
}): JSX.Element {
  const firstHalfColumn: Comment[] = props.reviews.filter((_, index) => index % 2 === 0);
  const secondHalfColumn: Comment[] = props.reviews.filter((_, index) => index % 2 !== 0);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {
          firstHalfColumn.map((comment) => (
            <MovieReviewsTabItem review={comment} key={comment.id}/>
          ))
        }

      </div>
      <div className="film-card__reviews-col">

        {
          secondHalfColumn.map((comment) => (
            <MovieReviewsTabItem review={comment} key={comment.id}/>
          ))
        }

      </div>
    </div>
  );
}

export default memo(MovieReviewsTab);
