import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

/*
 * Reducer Composition with Objects
 */
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp
