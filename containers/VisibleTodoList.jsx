import { connect } from 'react-redux';
import TodoList from '../components/TodoList'

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

 const mapStoreToProps = (state) => {
   return {
     todos: getVisibleTodos(
       state.todos,
       state.visibilityFilter
     )
   };
 };

 const mapDispatchToProps = (dispatch) => {
   return {
     onTodoClick: (id) => {
       dispatch({
         type: 'TOGGLE_TODO',
         id
       })
     }
   };
 };

const VisibleTodoList = connect(
  mapStoreToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList
