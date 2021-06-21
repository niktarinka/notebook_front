import {compose, createStore} from 'redux'
import { rootReducer } from './reducers/rootReducer'


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;



export const store = createStore(rootReducer, composeEnhancers())