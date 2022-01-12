import { render, screen } from '@testing-library/react';

import GenresList from './genres-list';
import { ALL_GENRES } from '../../types/const';

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    const { container } = render(<GenresList genres={[ALL_GENRES]} activeGenre={ALL_GENRES} onGenreChange={() => ALL_GENRES}/>);

    expect(container.querySelector('.catalog__genres-list')).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });
});
