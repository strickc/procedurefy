import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import update from 'immutability-helper';
import ListItem from './listItem';
import { levColors } from './helpers/styles';

const getListStyle = (isDraggingOver, level) => ({
  background: isDraggingOver ? 'springgreen' : levColors[level],
  // padding: '8px 0 8px 0',
  minHeight: '8px',
  // width: 250,
});

const pathIdGen = node => update(node.path, { $push: [node.key] }).join('-');

export default function SubList(item) {
  if (isArray(item.subList) && get(item, 'subList', []).length >= 0) {
    return (
      <Droppable droppableId={pathIdGen(item)} type={item.level + 1}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver, item.level)}
          >
            {item.subList.map((i, index) => (
              <ListItem key={i.key} item={i} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    );
  }
  return null;
}
