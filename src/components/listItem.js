import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import SubList from './subList';
import { levColors } from './helpers/styles';

const grid = 8;
const getItemStyle = (isDragging, draggableStyle, level) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `${grid}px 0 0 ${grid}px`,
  margin: `0 0 ${grid / 4}px 0`,
  border: '1px solid black',
  borderRadius: '3px',

  // change background colour if dragging
  // background: isDragging ? 'lightyellow' : levColors[level],
  background: levColors[level],

  // styles we need to apply on draggables
  ...draggableStyle,
});

// eslint-disable-next-line react/prefer-stateless-function
class ListItem extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.item.key}
        index={this.props.index}
        type={this.props.item.level}
      >
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                this.props.item.level,
              )}
            >
              <div style={{ padding: `0 0 ${grid * 0}px 0` }}>{this.props.item.content}</div>
              <div style={{ padding: `0 0 0 ${grid}px` }}>{SubList(this.props.item)}</div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}
ListItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    content: PropTypes.string,
    level: PropTypes.number,
    subList: PropTypes.array,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default ListItem;
