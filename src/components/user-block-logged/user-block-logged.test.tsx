import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import { createMockAuthInfo } from '../../mocks/authorizationFake';
import { configureMockStore } from '@jedmao/redux-mock-store';
import UserBlockLogged from './user-block-logged';
import { AppRoute } from '../../types/enum';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  'USER_AUTH': {authInfo: createMockAuthInfo()},
});

describe('Component: UserBlockLogged', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlockLogged />
        </Router>
      </Provider>,
    );

    expect(screen.getAllByRole('link')[0].getAttribute('href')).toEqual(AppRoute.MyList);
    expect(screen.getAllByRole('link')[1].getAttribute('href')).toEqual('/');

    expect(container.querySelector('.user-block__avatar')).toBeInTheDocument();
    expect(container.querySelector('.user-block__item')).toBeInTheDocument();
  });
});
