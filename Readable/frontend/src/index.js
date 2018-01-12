import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/root_reducer';
import { Provider } from 'react-redux'
import bootstrap from './orm/bootstrap';
import { orm } from './orm/model';
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const createStoreWithMiddleware = applyMiddleware(logger,thunk)(createStore);

const store = createStoreWithMiddleware(rootReducer, bootstrap(orm),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()