import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import SubListContainer from './subList';
import { connect } from 'react-redux';
import TextEdit from './textEdit';
import { levColors } from './helpers/styles';
import { listSettingsSchema } from './helpers/schemas';
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
  // background: isDragging ? 'lightyellow' : levColors[level],
  background: levColors[level],

  // styles we need to apply on draggables
  ...draggableStyle,
});

// eslint-disable-next-line react/prefer-stateless-function
class ListItem extends Component {
  render() {
    const {
      id, content, index, level,
    } = this.props.item;
    return (
      <Draggable draggableId={id} index={index} type={level}>
        {(provided, snapshot) => (
          <div>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style,
                level,
              )}
            >
              <div style={{ padding: `0 0 ${grid * 0}px 0` }}>
                <span className="inline">1.1</span>
                <span className="inline">
                  <TextEdit item={this.props.item} handleChange={this.props.handleChange} />
                </span>
              </div>
              <div style={{ padding: `0 0 0 ${grid * 0}px` }}>
                <SubListContainer forId={id} />
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}
// ListItem.propTypes = {
//   item: PropTypes.shape({
//     key: PropTypes.string,
//     content: PropTypes.string,
//     level: PropTypes.number,
//     subList: PropTypes.array,
//   }).isRequired,
//   listSettings: PropTypes.shape(listSettingsSchema).isRequired,
//   index: PropTypes.number.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

const mapStateToProps = (state, ownProps) => ({
  item: state.procedure.list[ownProps.itemId],
  showLevel: state.visibilityFiler,
});
const mapDispatchToProps = dispatch => ({
  handleChange: (content, itemId) => {
    dispatch(setContent(content, itemId));
  },
});
const ListItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export default ListItemContainer;
