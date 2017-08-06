import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';

import Login from '../ui/Login';
import Singup from '../ui/Singup';
import NoMatch from '../ui/NoMatch';
import LinkPage from '../ui/Link';


const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/singup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
   const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if on auth page and user login, redirect to /links
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
}

export const routes = (
  <Router history={history}>

    <Switch>
      <Route
        exact
        path="/"
        render={() => (Meteor.userId() ? <Redirect to="/links" /> : <Login />)}
      />
      <Route
        path="/singup"
        render={() => (Meteor.userId() ? <Redirect to="/links" /> : <Singup />)}
      />
      <Route path="/links" component={LinkPage} />
      <Route component={NoMatch} />
    </Switch>

  </Router>
);