import { combineReducers } from 'redux';
import update from 'immutability-helper';
import _ from 'lodash';
import {
  ADD_ITEM,
  MOVE_ITEM,
  SET_CONTENT,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
} from './actions';

const { SECTIONS } = VisibilityFilters;

function visibilityFilter(state = SECTIONS, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const itemGen = (id, state, parentKey, content) => {
  const { level } = state.list[parentKey];
  return {
    id,
    content,
    level: level + 1,
    subList: [],
  };
};

const initProcState = {
  settings: { maxId: 0 },
  list: {
    0: {
      id: 0, level: 0, subList: [],
    },
  },
};

function procedure(state = initProcState, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const { content, parentId } = action;
      const parentKey = parentId || '0';
      const newId = _.get(state, 'settings.maxId', 1) + 1;
      const uObj = {
        list: {
          [parentKey]: { subList: { $push: [newId] } },
          [newId]: { $set: itemGen(newId, state, parentKey, content) },
        },
        settings: { maxId: { $set: newId } },
      };
      return update(state, uObj);
    }
    case MOVE_ITEM: {
      const { source, dest } = action;
      const itemId = state.list[source.droppableId].subList[source.index];
      const uObj = {
        list: {
          [source.droppableId]: {
            subList: {
              $splice: [[source.index, 1]],
            },
          },
        },
      };
      const dsplice = [dest.index, 0, itemId];
      if (source.droppableId === dest.droppableId) {
        uObj.list[source.droppableId].subList.$splice.push(dsplice);
      } else {
        uObj.list[dest.droppableId] = {
          subList: {
            $splice: [dsplice],
          },
        };
      }
      return update(state, uObj);
    }
    case SET_CONTENT: {
      const { content, itemId } = action;
      return update(state, {
        list: {
          [itemId]: {
            content: {
              $set: content,
            },
          },
        },
      });
    }
    default:
      return state;
  }
}

const procedurefyApp = combineReducers({
  visibilityFilter,
  procedure,
});

export default procedurefyApp;
