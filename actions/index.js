let nextId = 0;

export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text,
    id: nextId++
  }
}

export const setVisibilityFilter = (filter) => {
  return {
     type: 'SET_VISIBILITY_FILTER',
     filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
