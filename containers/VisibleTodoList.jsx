import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter){
      this.fetchData();
    }
  }
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
  render() {
    const { toggleTodo, todos, errorMessage, isFetching } = this.props;
    if(isFetching && !todos.length){
      return <p> Loading... </p>
    }
    if(errorMessage && !todos.length){
      return(
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
    );
    }
    return (<TodoList
              todos={todos}
              onTodoClick={toggleTodo}
            />);
  }
};


 const mapStoreToProps = (state, { params}) => {
    const filter =  params.filter || 'all';
    return {
     filter,
     errorMessage: getErrorMessage(state, filter),
     isFetching: getIsFetching(state, filter),
     todos: getVisibleTodos(state, filter),
    }
};

VisibleTodoList = withRouter(connect(
  mapStoreToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList;



//{ onTodoClick: toggleTodo, receiveTodos }

// const mapDispatchToProps = dispatch => ({
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     }
//   });
