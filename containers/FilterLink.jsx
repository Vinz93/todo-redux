import { connect } from 'react-redux';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      store.dispatch({
         type: 'SET_VISIBILITY_FILTER',
         filter: ownProps.filter,
      })
    }
  }
}

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink
