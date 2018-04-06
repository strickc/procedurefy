import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { moveItem, setVisibilityFilter, VisibilityFilters } from '../../state/actions';
import SubListContainer from '../subList';

const levels = [
  { text: 'Sections', value: VisibilityFilters.SECTIONS },
  { text: 'Steps', value: VisibilityFilters.STEPS },
  { text: 'Detail', value: VisibilityFilters.DETAIL },
];

const MainList = props => (
  <DragDropContext onDragEnd={props.onDragEnd}>
    <Dropdown placeholder="Show level" selection options={levels} value={props.visibilityFilter} onChange={props.onListChanged} />
    <SubListContainer forId="0" />
  </DragDropContext>
);

MainList.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  onListChanged: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.number.isRequired,
};


const mapStateToProps = state => ({
  visibilityFilter: state.visibilityFilter,
});
const mapDispatchToProps = dispatch => ({
  onDragEnd: (result) => {
    dispatch(moveItem(result.source, result.destination));
  },
  onListChanged: (event, data) => {
    dispatch(setVisibilityFilter(data.value));
  },
});
const MainListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainList);

export default MainListContainer;
