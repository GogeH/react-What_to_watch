import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MovieCardButtonFavoriteList from './movie-card-button-favorite-list';
import { createMockMovie } from '../../mocks/movieFake';
import { AuthorizationStatus } from '../../types/enum';
import { createMockAuthInfo } from '../../mocks/authorizationFake';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockMovie = createMockMovie();
const mockAuth = createMockAuthInfo();

const store = mockStore({
  USER_AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    authInfo: mockAuth,
  },
});

describe('Component: MovieCardButtonFavoriteList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <MovieCardButtonFavoriteList isFavorite movie={mockMovie} id={mockMovie.id} />
        </Router>
      </Provider>);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });
});
