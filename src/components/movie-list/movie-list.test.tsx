import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import MovieList from './movie-list';
import { createMockMovie, createMockMovies } from '../../mocks/movieFake';
import { FIRST_LOADED_MOVIES } from '../../types/const';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const mockMovies = createMockMovies();
const mockMovie = createMockMovie();

const store = mockStore({
  MOVIES_DATA: {
    isMoviesLoaded: true,
    movies: mockMovies,
    promo: mockMovie,
  },
  PROCESS_MOVIES: {
    loadedMoviesCount: FIRST_LOADED_MOVIES,
    favoriteListMovies: mockMovies,
    similarMovies: mockMovies,
  },
});

describe('Component: MovieList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <MovieList />
        </Router>
      </Provider>,
    );
    expect(container.querySelector('.catalog__films-list')).toBeInTheDocument();
  });
});
