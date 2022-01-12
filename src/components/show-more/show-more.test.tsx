import { render, screen } from '@testing-library/react';

import ShowMore from './show-more';

const LOAD_MOVIES = 16;

describe('Component: ShowMore', () => {
  it('should render correctly', () => {
    render(<ShowMore handleLoadMore={() => LOAD_MOVIES}/>);
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
