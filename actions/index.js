import { v4 } from 'node-uuid';
import * as api from '../api'

export const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter,
});

const receiveTodos = (response, filter) => ({
  type: 'RECEIVE_TODOS',
  response,
  filter,
});

export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(response, filter)
  );

export const addTodo = (text) => ({
     type: 'ADD_TODO',
     text,
     id: v4()
   });

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
  });
