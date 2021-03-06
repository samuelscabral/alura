import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

import * as serviceWorker from './serviceWorker';

function isLoggedIn() {
  return localStorage.getItem('auth-token') === null;
}

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route exact path="/timeline" render={() => (
        isLoggedIn() ? (
          <Redirect to="/?msg=Você precisa estar logado para acessar o endereço" />
        ) : (
            <App />
          )
      )} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
