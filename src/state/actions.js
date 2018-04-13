/*
 * action types
 */

export const ADD_ITEM = 'ADD_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const MOVE_SELECTED = 'MOVE_SELECTED';
export const SET_CONTENT = 'SET_CONTENT';
export const SELECT_ITEM = 'SELECT_ITEM';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const ADD_ITEM_AFTER = 'ADD_ITEM_AFTER';
export const ADD_CHILD = 'ADD_CHILD';
export const ADD_ITEM_AFTER_SELECTED = 'ADD_ITEM_AFTER_SELECTED';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const DELETE_SELECTED = 'DELETE_SELECTED';

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

export function moveSelected(dir) {
  return {
    type: MOVE_SELECTED, dir,
  };
}

export function addItemAfter(afterId, parent) {
  return {
    type: ADD_ITEM_AFTER, afterId, parent,
  };
}

export function addItemAfterSelected() {
  return {
    type: ADD_ITEM_AFTER_SELECTED,
  };
}

export function addChild() {
  return {
    type: ADD_CHILD,
  };
}

export function selectItem(id) {
  return {
    type: SELECT_ITEM, id,
  };
}

export function clearSelection() {
  return {
    type: CLEAR_SELECTION,
  };
}

export function deleteSelected() {
  return {
    type: DELETE_SELECTED,
  };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
