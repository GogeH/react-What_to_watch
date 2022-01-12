import { render, screen } from '@testing-library/react';
import { generatePath, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AuthorizationStatus, AppRoute } from '../../types/enum';
import App from './app';
import { createMockMovie, createMockMovies } from '../../mocks/movieFake';
import { ALL_GENRES, FIRST_LOADED_MOVIES } from '../../types/const';
import { createMockAuthInfo } from '../../mocks/authorizationFake';
import { createMockComments } from '../../mocks/commentsFake';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockMovies = createMockMovies();
const mockMovie = createMockMovie();
const mockAuth = createMockAuthInfo();
const mockComments = createMockComments();

const store = mockStore({
  USER_AUTH: {
    authorizationStatus: AuthorizationStatus.Auth,
    authInfo: mockAuth,
  },
  MOVIES_DATA: {
    isMoviesLoaded: true,
    movies: mockMovies,
    promo: mockMovie,
    similarMovies: mockMovies,
  },
  PROCESS_MOVIES: {
    genre: ALL_GENRES,
    loadedMoviesCount: FIRST_LOADED_MOVIES,
    favoriteListMovies: mockMovies,
    selectedMovie: mockMovie,
    favoriteMovie: mockMovie,
  },
  COMMENTS_DATA: {
    comments: mockComments,
  },
});

const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render AuthScreen when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should render Error when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/404!/i)).toBeInTheDocument();
  });

  it('should render Player when user navigate to "/Player/1"', () => {
    history.push(generatePath(AppRoute.Player, { id: mockMovies[0].id }));
    render(fakeApp);

    expect(screen.getByText(/exit/i)).toBeInTheDocument();
  });
});
