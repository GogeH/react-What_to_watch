import { render, screen } from '@testing-library/react';

import MovieDetailsTab from './movie-details-tab';
import { createMockMovie } from '../../mocks/movieFake';

const mockMovie = createMockMovie();

describe('Component: MovieDetailsTab', () => {
  it('should render correctly', () => {
    render(<MovieDetailsTab movie={mockMovie}/>);

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
  });
});
