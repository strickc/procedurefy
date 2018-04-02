import update from 'immutability-helper';

const pathIdGen = node => update(node.path, { $push: [node.key] }).join('-');

const util = {
  pathIdGen,
};
export default util;
