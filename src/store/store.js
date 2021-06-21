// import {compose, createStore} from 'redux'
import { rootReducer } from './reducers/rootReducer'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const loggerMiddleware = store => next => action => {
  const result = next(action)
  console.log('Middleware', store.getState())
  return result
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
  loggerMiddleware,
  reduxThunk
)))

// export const store = createStore(rootReducer, composeEnhancers())