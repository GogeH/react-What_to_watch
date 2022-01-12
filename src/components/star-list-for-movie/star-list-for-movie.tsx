import { ChangeEvent, Fragment, memo } from 'react';

const RATING_STARS_COUNT = 10;

function StarListForMovie(props: {
  ratingValue: number,
  disabled: boolean,
  onChangeRating: (event: ChangeEvent<HTMLInputElement>) => void,
}): JSX.Element {
  return (
    <>
      {new Array(RATING_STARS_COUNT).fill(null).map((currentValue, index) => {
        const number = index + 1;

        return (
          <Fragment key={number}>
            <input
              className="rating__input"
              id={`star-${number}`}
              type="radio"
              name="rating"
              value={number}
              checked={number === props.ratingValue}
              onChange={props.onChangeRating}
              alt={`звезда номер ${number}`}
              disabled={props.disabled}
            />
            <label
              className="rating__label"
              htmlFor={`star-${number}`}
            >Rating {number}
            </label>
          </Fragment>
        );
      }).reverse()}
    </>
  );
}

export default memo(StarListForMovie);
