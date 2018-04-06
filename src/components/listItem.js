import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import SubListContainer from './subList';
import TextEdit from './textEdit';
import { levColors } from './helpers/styles';
import Schemas from './helpers/schemas';
import { setContent } from '../state/actions';

const grid = 8;
const getItemStyle = (isDragging, draggableStyle, level) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `${grid}px 0 0 ${grid}px`,
  margin: `0 0 ${grid / 4}px 0`,
  border: '1px solid black',
  borderRadius: '3px',
  // change background colour if dragging
  background: levColors[level],
  // styles we need to apply on draggables
  ...draggableStyle,
});

// eslint-disable-next-line react/prefer-stateless-function
const ListItem = ({ index, item, handleChange }) => (
  <Draggable draggableId={String(item.id)} index={index} type={item.level}>
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            item.level,
          )}
        >
          <div style={{ padding: `0 0 ${grid * 0}px 0` }}>
            <span className="inline">1.1</span>
            <span className="inline">
              <TextEdit item={item} handleChange={handleChange} />
            </span>
          </div>
          <div style={{ padding: `0 0 0 ${grid * 0}px` }}>
            <SubListContainer forId={item.id} />
          </div>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Draggable>
);

ListItem.propTypes = {
  item: PropTypes.shape(Schemas.item).isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  item: state.procedure.list[ownProps.itemId],
  showLevel: state.visibilityFiler,
  index: ownProps.index,
});
const mapDispatchToProps = dispatch => ({
  handleChange: (content, itemId) => {
    dispatch(setContent(content, itemId));
  },
});
const ListItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export default ListItemContainer;
