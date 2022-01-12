import { Comment } from '../../types/types';
import { getDatetime, getHumanizedDateTime } from '../../utils/get-date-time';

function MovieReviewsTabItem (props: {
  review: Comment,
}): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{props.review.user.name}</cite>
          <time className="review__date" dateTime={getDatetime(props.review.date)}>{getHumanizedDateTime(props.review.date)}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{props.review.rating}</div>
    </div>
  );
}

export default MovieReviewsTabItem;
