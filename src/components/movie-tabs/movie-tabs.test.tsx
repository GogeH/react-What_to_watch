import { render, screen } from '@testing-library/react';

import MovieTabs from './movie-tabs';
import { createMockComments } from '../../mocks/commentsFake';
import { createMockMovie } from '../../mocks/movieFake';

const mockComments = createMockComments();
const mockMovie = createMockMovie();

describe('Component: MovieTabs', () => {
  it('should render correctly', () => {
    const { container } = render(<MovieTabs reviews={mockComments} movie={mockMovie} />);

    expect(container.querySelector('.film-nav__list')).toBeInTheDocument();
    expect(container.querySelector('.film-card__nav')).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
