import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

/*
 * The reducers
 */

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO' :
      if(state.id !== action.id)
        return state;
      return {
        id: state.id,
        text: state.text,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) =>{

    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          todo(undefined, action)
        ];
      case 'TOGGLE_TODO':
        return state.map(t => todo(t, action));
      default:
        return state;
    }
};

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
     return action.filter;
    default:
      return state;
  }
};
/*
 * Reducer Composition with Objects
 */
    const todoApp = combineReducers({
      todos,
      visibilityFilter
    });

const store = createStore(todoApp);


/*
 * Components
 */
 const FilterLink = (props) => {
   if (props.filter === props.currentFilter)
      return (<span>{props.children}</span>);
   return(
     <a href="#"
       onClick={
         e => {
           e.preventDefault();
           props.onClick(props.filter);
         }}
       >
       {props.children}
     </a>
   );
 }
 const Footer = ({
   visibilityFilter,
   onFilterClick
 }) => {
   return(
     <div>
       Show:
       {' '}
       <FilterLink
         filter='SHOW_ALL'
         currentFilter={visibilityFilter}
         onClick={onFilterClick}
         >
         All
       </FilterLink>
       {' '}
       <FilterLink
         filter='SHOW_ACTIVE'
         currentFilter={visibilityFilter}
         onClick={onFilterClick}
         >
         Active
       </FilterLink>
       {' '}
       <FilterLink
         filter='SHOW_COMPLETED'
         currentFilter={visibilityFilter}
         onClick={onFilterClick}
         >
         Completed
       </FilterLink>
     </div>
   );
 }
 const Todo = (props) => {
   return(
     <li
       onClick={props.onClick}
         style={{
           textDecoration:
             props.completed ? 'line-through' : 'none'
         }}>
       {props.text}
     </li>
   );
 }

 const TodoList = (props) => {
   return(
     <ul>
       { props.todos.map( todo =>{
         return (
           <Todo
             key={todo.id}
              {...todo}
              onClick={() => props.onTodoClick(todo.id)}
            />
          );
       })}
     </ul>
   );
 }

 const AddTodo = ({onAddClick}) => {
   let input;
   return (
      <div>
        <input ref={
            node => {
             input = node;
            }}/>
        <button
          onClick={ () =>{
            onAddClick(input.value);
            input.value = '';
          }}>
          Add Todo
        </button>
      </div>
    );
 }

 const getVisibleTodos = (todos, filter) => {
   switch(filter){
     case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completed );
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completed );
   }
 }
let nextId = 0;
class TodoApp extends React.Component {
  constructor(){
    super();
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.filter = this.filter.bind(this);
  }

  addTodo(text){
    store.dispatch({
      type: 'ADD_TODO',
      text,
      id: nextId++
    });
  }

  toggleTodo(id){
    store.dispatch({
      type: 'TOGGLE_TODO',
      id: id
    })
  }

  filter(filter){
    store.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter,
    });
  }

  render() {
    const { todos, visibilityFilter} = this.props;
    const visibleTodos = getVisibleTodos(
        todos,
        visibilityFilter
      );
    return(
      <div>
        <AddTodo
          onAddClick={this.addTodo} />
        <TodoList todos={visibleTodos} onTodoClick={this.toggleTodo} />
        <Footer visibilityFilter={visibilityFilter} onFilterClick={this.filter} />
      </div>
    );
  }
}

const render = () =>{
  ReactDOM.render(
    <TodoApp { ...store.getState() } />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
