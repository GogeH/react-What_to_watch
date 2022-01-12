import { ViewGenre } from '../../types/view-genre';
import { MouseEvent } from 'react';

const GENRE_ITEM_ACTIVE = 'catalog__genres-item--active';

function GenresList({genres, activeGenre, onGenreChange}: ViewGenre): JSX.Element {
  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => (
          <li
            className={['catalog__genres-item',
              genre === activeGenre
                ?
                GENRE_ITEM_ACTIVE
                :
                ''].join(' ')}
            key={genre}
          >
            <a href="/" className="catalog__genres-link"
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                onGenreChange(genre);}}
            >
              {genre}
            </a>
          </li>
        ))
      }
    </ul>
  );
}

export default GenresList;
