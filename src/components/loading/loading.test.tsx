import { render, screen } from '@testing-library/react';

import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    render(<Loading />);
    expect(screen.getByText(/G/i)).toBeInTheDocument();
    expect(screen.getByText(/N/i)).toBeInTheDocument();
    expect(screen.getByText(/I/i)).toBeInTheDocument();
    expect(screen.getByText(/D/i)).toBeInTheDocument();
    expect(screen.getByText(/A/i)).toBeInTheDocument();
    expect(screen.getByText(/O/i)).toBeInTheDocument();
    expect(screen.getByText(/L/i)).toBeInTheDocument();
  });
});
