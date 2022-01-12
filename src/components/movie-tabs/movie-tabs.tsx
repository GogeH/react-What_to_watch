import { useState } from 'react';

import { Movie, Comment } from '../../types/types';
import MovieDetailsTab from './movie-details-tab';
import MovieOverviewTab from './movie-overview-tab';
import MovieReviewsTab from './movie-reviews-tab';

enum MovieTab {
  OverviewTab,
  DetailsTab,
  ReviewsTab,
}

function MovieTabs(props: {
  movie: Movie,
  reviews: Comment[],
}): JSX.Element {
  const [activeTab, setActiveTab] = useState<MovieTab>(MovieTab.OverviewTab);

  const handleOverviewTab = () => {
    setActiveTab(MovieTab.OverviewTab);
  };

  const handleDetailsTab = () => {
    setActiveTab(MovieTab.DetailsTab);
  };

  const handleReviewsTab = () => {
    setActiveTab(MovieTab.ReviewsTab);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={activeTab === MovieTab.OverviewTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={handleOverviewTab}
          >
            <div className="film-nav__link">Overview</div>
          </li>
          <li className={activeTab === MovieTab.DetailsTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={handleDetailsTab}
          >
            <div className="film-nav__link">Details</div>
          </li>
          <li className={activeTab === MovieTab.ReviewsTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            onClick={handleReviewsTab}
          >
            <div className="film-nav__link">Reviews</div>
          </li>
        </ul>
      </nav>
      <div className={'film-card__content film-card__content--active'}>
        {activeTab === MovieTab.OverviewTab && <MovieOverviewTab movie={props.movie}/>}
        {activeTab === MovieTab.DetailsTab && <MovieDetailsTab movie={props.movie}/>}
        {activeTab === MovieTab.ReviewsTab && <MovieReviewsTab reviews={props.reviews}/>}
      </div>
    </div>
  );
}

export default MovieTabs;
