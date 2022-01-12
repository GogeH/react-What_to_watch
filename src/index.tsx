import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { createAPI } from './services/api';
import { rootReducer } from './store/root-reducer';
import App from './components/app/app';
import { AuthorizationStatus } from './types/enum';
import { ThunkAppDispatch } from './types/action';
import {
  checkAuthAction,
  fetchMoviesAction,
  fetchPromoAction
} from './store/api-action';
import { requireAuthorization } from './store/action';
import { redirect } from './store/middlewares/redirect';
import browserHistory from './browser-history';

import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchMoviesAction());
(store.dispatch as ThunkAppDispatch)(fetchPromoAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={browserHistory}>
        <ToastContainer />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
