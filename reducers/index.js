import { combineReducers } from 'redux';
import todos from './todos';

/*
 * Reducer Composition with Objects
 */
const todoApp = combineReducers({
  todos,
});

export default todoApp
