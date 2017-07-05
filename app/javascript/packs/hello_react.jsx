import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, Route, hashHistory, IndexRedirect, Redirect } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

const middleware = routerMiddleware(hashHistory);
const store = createStore(
  reducers,
  applyMiddleware(middleware)
);

const history = syncHistoryWithStore(hashHistory, store);

function scrollToTop() {
  window.scrollTo(0, 0);
}

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: require('../containers/App').default,
    indexRoute: { onEnter: (nextState, replace) => replace('/app/dashboard') },//'/app/dashboard',
    childRoutes: [
      require('../routes/app').default,
      require('../routes/404').default,
      require('../routes/500').default,
      require('../routes/confirmEmail').default,
      require('../routes/forgotPassword').default,
      require('../routes/lockScreen').default,
      require('../routes/login').default,
      require('../routes/signUp').default,
      require('../routes/fullscreen').default,
      {
        path: '*',
        indexRoute: { onEnter: (nextState, replace) => replace('/404') },
      }
    ]
  }]
};

render(
  <Provider store={store}>
    <Router
      onUpdate={scrollToTop}
      history={history}
      routes={rootRoute}
    />
  </Provider>,
  document.getElementById('app-container')
);