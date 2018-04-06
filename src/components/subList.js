import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from './listItem';
import { levColors } from './helpers/styles';
import Schemas from './helpers/schemas';

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
    console.log(showLevel, listHolder.level);
    if ((listHolder.level + 1) <= showLevel) {
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
SubList.propTypes = {
  listHolder: PropTypes.shape(Schemas.item).isRequired,
  showLevel: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  listHolder: state.procedure.list[ownProps.forId],
  showLevel: state.visibilityFilter,
});
const SubListContainer = connect(
  mapStateToProps,
)(SubList);

export default SubListContainer;
