import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
// import uniqueId from 'lodash/uniqueId';
// import update from 'immutability-helper';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { moveItem, setVisibilityFilter, VisibilityFilters } from '../../state/actions';
import SubListContainer from '../subList';
// import './styles.css';
// import util from './helpers/utilities';

const levels = [
  { text: 'Sections', value: VisibilityFilters.SECTIONS },
  { text: 'Steps', value: VisibilityFilters.STEPS },
  { text: 'Detail', value: VisibilityFilters.DETAIL },
];

function start(p) {
  console.log(p);
}
// eslint-disable-next-line react/prefer-stateless-function
class MainList extends Component {
  render() {
    return (
      <DragDropContext onDragStart={start} onDragEnd={this.props.onDragEnd}>
        <Dropdown placeholder="Show level" selection options={levels} onChange={this.props.onListChanged} />
        <SubListContainer forId="0" />
      </DragDropContext>
    );
  }
}
MainList.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  onListChanged: PropTypes.func.isRequired,
};


// const mapStateToProps = state => ({
//   todos: getVisibleTodos(state.todos, state.visibilityFilter),
// });
const mapDispatchToProps = dispatch => ({
  onDragEnd: (result) => {
    console.log(result);
    dispatch(moveItem(result.source, result.destination));
  },
  onListChanged: (filter) => {
    dispatch(setVisibilityFilter(filter));
  },
});
const MainListContainer = connect(
  null, // mapStateToProps
  mapDispatchToProps,
)(MainList);

export default MainListContainer;
