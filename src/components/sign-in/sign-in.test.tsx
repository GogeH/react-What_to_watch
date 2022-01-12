import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import SignIn from './sign-in';
import { createMockAuthData } from '../../mocks/authorizationFake';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const authData = createMockAuthData();

const store = mockStore({
  authData,
});

describe('Component: SignIn', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});

