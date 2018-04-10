/*
 * action types
 */

export const ADD_ITEM = 'ADD_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const SET_CONTENT = 'SET_CONTENT';
export const SELECT_ITEM = 'SELECT_ITEM';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SECTIONS: 1,
  STEPS: 2,
  DETAIL: 3,
};

/*
 * action creators
 */

export function addItem(content, parentId) {
  return { type: ADD_ITEM, content, parentId };
}

export function setContent(content, itemId) {
  return { type: SET_CONTENT, content, itemId };
}

export function moveItem(dir, id, parent) {
  return {
    type: MOVE_ITEM, dir, id, parent,
  };
}

export function selectItem(id) {
  return {
    type: SELECT_ITEM, id,
  };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
