import update from 'immutability-helper';
import { ADD_SUBDATA, ADD_DATA_CATEGORY } from './dataActions';

export default function data(state = {}, action) {
  switch (action.type) {
    case ADD_SUBDATA: {
      const {
        category, displayName, varName, units, value,
      } = action;
      return update(state, {
        [category]: {
          $merge: { [varName]: { name: displayName, units, value } },
        },
      });
    }
    case ADD_DATA_CATEGORY: {
      const { varName } = action;
      return update(state, { $merge: { [varName]: {} } });
    }
    default:
      return state;
  }
}
