import { render, screen } from '@testing-library/react';

import MovieOverviewTab from './movie-overview-tab';
import { createMockMovie } from '../../mocks/movieFake';

const mockMovie = createMockMovie();

describe('Component: MovieOverviewTab', () => {
  it('should render correctly', () => {
    render(<MovieOverviewTab movie={mockMovie}/>);

    expect(screen.getByText(/Director:/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring:/i)).toBeInTheDocument();
    expect(screen.getByText(/ratings/i)).toBeInTheDocument();
  });
});
