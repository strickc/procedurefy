import update from 'immutability-helper';
import _ from 'lodash';

const pathIdGen = node => update(node.path, { $push: [node.key] }).join('-');

/**
 * Get an array of procedure object keys and indexes that constitute a path
 * to the object where the droppable subList resides in the structure.  Can
 * be used with _.get to access the subList
 * @param {Object} obj state procedure object to search
 * @param {String} id id of the droppable, hyphen-seperated string of keys
 */
const getListFromIdPath = (obj, id, last = 'subList') => {
  const path = id.split('-');
  let cur = obj.subList;
  const oPath = path.reduce((p, c, i) => {
    if (i === 0) {
      p.push('subList');
    } else {
      const ind = _.findIndex(cur, ['key', c]);
      cur = cur[ind].subList;
      p.push(ind, 'subList');
    }
    return p;
  }, []);
  oPath[obj.length - 1] = last;
  return oPath;
};

/**
 *
 * @param {Object} procedure state object for the procedure
 * @param {Array} path array of strings path compatible with _.get
 * @param {String} op $-operation used by immutibility-helper
 * @param {*} opValue any value to be assigned as the value for the operation
 */
const makeUpdateObj = (procedure, path, op, opValue) => {
  const obj = {};
  let ref = obj;
  for (let i = 0; i < path.length; i += 1) {
    ref[path[i]] = {};
    ref = ref[path[i]];
  }
  ref[op] = opValue;
  return obj;
};

const util = {
  pathIdGen,
  getListFromIdPath,
  makeUpdateObj,
};
export default util;
