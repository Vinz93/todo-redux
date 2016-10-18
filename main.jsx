import { createStore, combineReducers } from 'redux';
import React from 'react';
import { Provider, connect } from 'react-redux';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

import VisibleTodoList from './containers/VisibleTodoList';
import AddTodo from './containers/AddTodo';

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


/*
 * Components
 */

 const Link = (props) => {
   if (props.active)
      return (<span>{props.children}</span>);
   return(
     <a href="#"
       onClick={
         e => {
           e.preventDefault();
           props.onClick();
         }}
       >
       {props.children}
     </a>
   );
 }

 class FilterLink extends React.Component {
   componentDidMount() {
     const { store } = this.context;
     this.unsubscribe = store.subscribe(() => this.forceUpdate());
   }

  componentWillUnmount() {
    this.unsubscribe();
  }
   render(){
     const { store } = this.context;
     const props = this.props;
     const state = store.getState();
     return(
       <Link
         active={props.filter === state.visibilityFilter}
         onClick={ () =>{
           store.dispatch({
             type: 'SET_VISIBILITY_FILTER',
             filter: props.filter,
           })
         }}
         >
         {props.children}
       </Link>
     );
   }
 }
 FilterLink.contextTypes = {
   store: React.PropTypes.object
 };

 const Footer = () => {
   return(
     <div>
       Show:
       {' '}
       <FilterLink filter='SHOW_ALL'>
         All
       </FilterLink>
       {' '}
       <FilterLink filter='SHOW_ACTIVE'>
         Active
       </FilterLink>
       {' '}
       <FilterLink filter='SHOW_COMPLETED'>
         Completed
       </FilterLink>
     </div>
   );
 }

const TodoApp = () => {
  return(
    <div>
      <AddTodo />
      <VisibleTodoList  />
      <Footer  />
    </div>
  );
}

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp  />
  </Provider>,
   document.getElementById('root')
 );
