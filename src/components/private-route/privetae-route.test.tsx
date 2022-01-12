import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, Route, Router, Switch } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../types/enum';
import { PrivateRoute } from './private-route';

const history = createMemoryHistory();

describe('Component: PrivateRoute', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Switch>
          <PrivateRoute
            dispatch={jest.fn()}
            authorizationStatus={AuthorizationStatus.NoAuth}
            path={AppRoute.MyList}
            render={
              () => <h1>This is PrivateRoute</h1>
            }
          />
          <Route exact>
            <h1>This is SignIn page</h1>
          </Route>
        </Switch>
        <Link to={AppRoute.MyList}>link</Link>
      </Router>,
    );

    const link = screen.getByText('link');
    expect(link).toBeInTheDocument();

    userEvent.click(link);
    expect(screen.getByText('This is SignIn page')).toBeInTheDocument();
    expect(screen.queryByText('This is PrivateRoute')).not.toBeInTheDocument();
  });
});
