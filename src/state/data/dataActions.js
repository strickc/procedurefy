export const ADD_DATA_CATEGORY = 'ADD_DATA_CATEGORY';
export const ADD_SUBDATA = 'ADD_SUBDATA';

export function addDataCategory(varName) {
  return { type: ADD_DATA_CATEGORY, varName };
}

export function addSubdata(category, displayName, varName, units, value) {
  return {
    type: ADD_SUBDATA, category, displayName, varName, units, value,
  };
}
