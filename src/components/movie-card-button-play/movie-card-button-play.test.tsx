import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import MovieCardButtonPlay from './movie-card-button-play';
import { AppRoute } from '../../types/enum';
import { createMockMovie } from '../../mocks/movieFake';

const history = createMemoryHistory();

const mockMovie = createMockMovie();

describe('Component: MovieCardButtonPlay', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <MovieCardButtonPlay movie={mockMovie} />
      </Router>);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link in MovieCardButtonPlay component', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={`${AppRoute.Player.replace(':id', mockMovie.id.toString())}`} exact>
            <h1>This is SignIn page</h1>
          </Route>
          <Route>
            <MovieCardButtonPlay movie={mockMovie}/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is SignIn page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is SignIn page/i)).toBeInTheDocument();
  });
});
