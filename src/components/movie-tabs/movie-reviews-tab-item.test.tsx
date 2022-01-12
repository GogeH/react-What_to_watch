import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import MovieReviewsTabItem from './movie-reviews-tab-item';
import { createMockComment } from '../../mocks/commentsFake';

const mockComment = createMockComment();
const history = createMemoryHistory();

describe('Component: MovieReviewsTabItem', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Router history={history}>
        <MovieReviewsTabItem review={mockComment}/>
      </Router>);

    expect(container.querySelector('.review__quote')).toBeInTheDocument();
  });
});
