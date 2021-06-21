import { combineReducers } from 'redux'
// import { filesReducer } from './files'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  // page: filesReducer,
  user: userReducer,
})