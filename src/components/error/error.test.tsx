import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import Error from './error';
import { AppRoute } from '../../types/enum';

const history = createMemoryHistory();

describe('Component: Error', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Error />
      </Router>);

    expect(screen.getAllByRole('link')[0].getAttribute('href')).toEqual(AppRoute.Main);
    expect(screen.getAllByRole('link')[1].getAttribute('href')).toEqual(AppRoute.SignIn);
  });

  it('should redirect to root url when user clicked to link in Error component', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main} exact>
            <h1>This is SignIn page</h1>
          </Route>
          <Route>
            <Error />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is SignIn page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getAllByRole('link')[0]);
    expect(screen.queryByText(/This is SignIn page/i)).toBeInTheDocument();
  });
});
