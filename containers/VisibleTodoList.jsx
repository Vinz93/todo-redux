import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from '../components/TodoList';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers/todos';


 const mapStoreToProps = (state, { params}) => ({
     todos: getVisibleTodos(state.todos, params.filter || 'all')
   });


 // const mapDispatchToProps = dispatch => ({
 //     onTodoClick(id) {
 //       dispatch(toggleTodo(id));
 //     }
 //   });


const VisibleTodoList = withRouter(connect(
  mapStoreToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList
