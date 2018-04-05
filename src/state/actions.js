/*
 * action types
 */

export const ADD_ITEM = 'ADD_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  OVERVIEW: 'OVERVIEW',
  PROCEDURE: 'PROCEDURE',
  DETAIL: 'DETAIL',
};

/*
 * action creators
 */

export function addItem(content, parentId) {
  return { type: ADD_ITEM, content, parentId };
}

export function moveItem(source, dest) {
  return {
    type: MOVE_ITEM, source, dest,
  };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
