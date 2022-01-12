import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import UserBlockUnLogged from './user-block-un-logged';
import { AppRoute } from '../../types/enum';

const history = createMemoryHistory();

describe('Component: UserBlockUnLogged', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <UserBlockUnLogged />
      </Router>);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link in UserBlockUnLogged component', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.SignIn} exact>
            <h1>This is SignIn page</h1>
          </Route>
          <Route>
            <UserBlockUnLogged />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is SignIn page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is SignIn page/i)).toBeInTheDocument();
  });
});
