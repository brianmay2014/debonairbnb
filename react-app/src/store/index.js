import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import estateReducer from './estate';
import searchReducer from './search';
import charterReducer from './charter'
import critiqueReducer from './critique';
import estateTypeReducer from './estateType';

const rootReducer = combineReducers({
  session,
  estates: estateReducer,
  searchResults: searchReducer,
  charters: charterReducer,
  critiques: critiqueReducer,
  estateTypes: estateTypeReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
