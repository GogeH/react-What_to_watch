import { render } from '@testing-library/react';

import MovieReviewsTab from './movie-reviews-tab';
import { createMockComments } from '../../mocks/commentsFake';

const mockComments = createMockComments();

describe('Component: MovieReviewsTab', () => {
  it('should render correctly', () => {
    const { container } = render(<MovieReviewsTab reviews={mockComments} />);

    expect(container.querySelector('.film-card__reviews-col')).toBeInTheDocument();
    expect(container.querySelector('.film-card__reviews-col')).toBeInTheDocument();
  });
});
