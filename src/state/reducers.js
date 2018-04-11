import { combineReducers } from 'redux';
import update from 'immutability-helper';
import _ from 'lodash';
import {
  ADD_ITEM,
  MOVE_ITEM,
  SET_CONTENT,
  SELECT_ITEM,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  ADD_ITEM_AFTER,
  MOVE_SELECTED,
  ADD_ITEM_AFTER_SELECTED,
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
    parent: parentKey,
  };
};

const initProcState = {
  settings: { maxId: 0, selected: null },
  list: {
    0: {
      id: 0,
      level: 0,
      subList: [],
    },
  },
};

function moveItem(state, id, dir) {
  const { parent } = state.list[id];
  const { subList } = state.list[parent];
  const index = subList.indexOf(id);
  const newIndex = index + dir;
  if ((newIndex) < 0 || newIndex >= subList.length) return state;
  const uObj = {
    list: {
      [parent]: {
        subList: {
          $splice: [[index, 1], [newIndex, 0, id]],
        },
      },
    },
  };
  return update(state, uObj);
}

function addItem(state, afterId) {
  const { parent } = state.list[afterId];
  const { subList } = state.list[parent];
  const index = subList.indexOf(afterId);
  const newId = _.get(state, 'settings.maxId', 1) + 1;
  const uObj = {
    list: {
      [parent]: {
        subList: {
          $splice: [[index + 1, 0, newId]],
        },
      },
      [newId]: { $set: itemGen(newId, state, parent, '') },
    },
    settings: { maxId: { $set: newId }, selected: { $set: newId } },
  };
  return update(state, uObj);
}

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
    case ADD_ITEM_AFTER: {
      const { afterId } = action;
      return addItem(state, afterId);
    }
    case ADD_ITEM_AFTER_SELECTED: {
      const afterId = state.settings.selected;
      return addItem(state, afterId);
    }
    case MOVE_ITEM: {
      const { dir, id } = action;
      return moveItem(state, id, dir);
    }
    case MOVE_SELECTED: {
      const { dir } = action;
      const id = state.settings.selected;
      return moveItem(state, id, dir);
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
    case SELECT_ITEM: {
      return update(state, { settings: { selected: { $set: action.id } } });
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
