import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import postsReducer from '../reducers/posts';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
      combineReducers({
        posts: postsReducer,
        user: userReducer
      }),
      composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}