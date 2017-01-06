import { getIsFetching } from '../reducers';
import * as api from '../api'

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter,
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        response,
        filter,
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'something went wrong with server',
      })
    }
  );
};

export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(
    response => {
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        response,
      });
  });

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
  });
