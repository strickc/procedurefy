import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from './listItem';
import { levColors } from './helpers/styles';

const getListStyle = (isDraggingOver, level) => ({
  background: isDraggingOver ? 'springgreen' : levColors[level],
  // padding: '8px 0 8px 0',
  minHeight: '8px',
  // width: 250,
});

// const pathIdGen = node => update(node.path, { $push: [node.key] }).join('-');

const padding = (show, level) => (show ? <div style={getListStyle(false, level)} /> : null);

export class SubList extends React.Component {
  render() {
    const { listHolder, showLevel } = this.props;
    if (true) {
      // (listHolder.level + 1) <= showLevel) {
      return (
        <Droppable droppableId={String(listHolder.id)} type={listHolder.level + 1}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, listHolder.level)}
            >
              {padding(get(listHolder, 'subList', []).length * listHolder.level, listHolder.level)}
              {get(listHolder, 'subList', []).map((i, index) => (
                <ListItem key={i} itemId={i} index={index} />
              ))}
            </div>
          )}
        </Droppable>
      );
    }
    // otherwise placeholder for the height for the Droppable
    return padding(true, listHolder.level);
  }
}
// SubList.propTypes = {
// forId: PropTypes.string.isRequired,
// item: PropTypes.shape(itemSchema).isRequired,
// listSettings: PropTypes.shape(listSettingsSchema).isRequired,
// handleChange: PropTypes.func.isRequired,
// };

const mapStateToProps = (state, ownProps) => ({
  listHolder: state.procedure.list[ownProps.forId],
  showLevel: state.visibilityFiler,
});
// const mapDispatchToProps = dispatch => ({
//   onDragEnd: (result) => {
//     dispatch(moveItem(result.source, result.destination));
//   },
//   onListChanged: (filter) => {
//     dispatch(setVisibilityFilter(filter));
//   },
// });
const SubListContainer = connect(
  mapStateToProps,
  // mapDispatchToProps,
)(SubList);

export default SubListContainer;
