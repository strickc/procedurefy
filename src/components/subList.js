import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import get from 'lodash/get';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import ListItem from './listItem';
import { levColors } from './helpers/styles';
import { itemSchema, listSettingsSchema } from './helpers/schemas';

const getListStyle = (isDraggingOver, level) => ({
  background: isDraggingOver ? 'springgreen' : levColors[level],
  // padding: '8px 0 8px 0',
  minHeight: '8px',
  // width: 250,
});

const pathIdGen = node => update(node.path, { $push: [node.key] }).join('-');

const padding = (show, level) => (show ? <div style={getListStyle(false, level)} /> : null);

export default class SubList extends React.Component {
  render() {
    const { item } = this.props;
    const { showLevel } = this.props.listSettings;
    if ((item.level + 1) <= showLevel) {
      return (
        <Droppable droppableId={pathIdGen(item)} type={item.level + 1}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver, item.level)}
            >
              {padding(get(item, 'subList', []).length * item.level, item.level)}
              {get(item, 'subList', []).map((i, index) => (
                <ListItem
                  key={i.key}
                  item={i} index={index}
                  listSettings={this.props.listSettings}
                  handleChange={this.props.handleChange}
                />
              ))}
            </div>
          )}
        </Droppable>
      );
    }
    // otherwise placeholder for the height for the Droppable
    return padding(true, item.level);
  }
}
SubList.propTypes = {
  item: PropTypes.shape(itemSchema).isRequired,
  listSettings: PropTypes.shape(listSettingsSchema).isRequired,
  handleChange: PropTypes.func.isRequired,
};
