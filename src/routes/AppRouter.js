import React from 'react';
import { Router } from 'react-router-dom';
import App from '../../src/App';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <App/>
    </Router>
);

export default AppRouter;