import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from '../components/TodoList';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';


 const mapStoreToProps = (state, { params}) => ({
     todos: getVisibleTodos(state, params.filter || 'all')
   });

const VisibleTodoList = withRouter(connect(
  mapStoreToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList

// const mapDispatchToProps = dispatch => ({
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     }
//   });
