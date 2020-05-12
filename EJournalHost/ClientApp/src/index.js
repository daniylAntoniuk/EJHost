// import 'bootstrap/dist/css/bootstrap.css';
// import 'font-awesome/css/font-awesome.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './store/configureStore';
import App from './App';
import registerServiceWorker, { unregister } from './registerServiceWorker';

import * as loginActions from './views/defaultViews/LoginPage/reducer';
import jwt from 'jsonwebtoken';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

if(localStorage.jwtToken) {
    let data = {token: localStorage.jwtToken, refToken: localStorage.refreshToken};
    let user = jwt.decode(data.token);

    if (!Array.isArray(user.roles)) {
        user.roles = Array.of(user.roles);
    }
    
    loginActions.loginByJWT(data, store.dispatch);
}

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App />
        </ConnectedRouter>
    </Provider>,
    rootElement);

registerServiceWorker(unregister);