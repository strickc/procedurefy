import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import uniqueId from 'lodash/uniqueId';
import update from 'immutability-helper';
import _ from 'lodash';
import SubList from './subList';


const updateSubPaths = (obj, path) => {
  obj.path.splice(0, path.length, ...path);
  const subList = _.get(obj, 'subList', []);
  for (let i = 0; i < subList.length; i += 1) {
    updateSubPaths(subList[i], path);
  }
};

const getListFromIdPath = (obj, id) => {
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
  return oPath;
};

const makeUpdateObj = (procedure, path, spliceArray) => {
  const obj = {};
  let ref = obj;
  for (let i = 0; i < path.length; i += 1) {
    ref[path[i]] = {};
    ref = ref[path[i]];
  }
  ref.$splice = [spliceArray];
  return obj;
};
// a little function to help us with reordering the result
export const reorder = (procedure, source, destination) => {
  const spath = getListFromIdPath(procedure, source.droppableId);
  const sourceList = _.get(procedure, spath);
  const moveObj = sourceList[source.index];
  const supdate = makeUpdateObj(procedure, spath, [source.index, 1]);
  const dpath = getListFromIdPath(procedure, destination.droppableId);
  const dsplice = [destination.index, 0, moveObj];
  // const dupdate = makeUpdateObj(procedure, dpath, [destination.index, 0, moveObj]);
  const totupdate = supdate;
  if (_.isEqual(spath, dpath)) {
    _.get(totupdate, dpath).$splice.push(dsplice);
  } else {
    console.log('Lists are not the same');
    // dsplice[2].path = destination.droppableId.split('-');
    updateSubPaths(dsplice[2], destination.droppableId.split('-'));
    _.defaultsDeep(totupdate, makeUpdateObj(procedure, dpath, dsplice));
  }
  return update(procedure, totupdate);
};

const itemGen = (content, level, parent) => ({
  key: uniqueId(),
  content,
  level,
  path: parent ? update(parent.path, { $push: [parent.key] }) : [],
  subList: [],
});
const initState = itemGen('Top level', 0, null);
initState.subList = ['one', 'two', 'three', 'four'].map(i => itemGen(i, 1, initState));
initState.subList[0].subList = ['sone', 'stwo', 'sthree', 'sfour'].map(i => itemGen(i, 2, initState.subList[0]));
initState.subList[0].subList[0].subList = ['ssone', 'sstwo', 'ssthree', 'ssfour'].map(i => itemGen(i, 3, initState.subList[0].subList[0]));
initState.subList[2].subList = ['xone', 'xtwo', 'xthree', 'xfour'].map(i => itemGen(i, 2, initState.subList[2]));

// eslint-disable-next-line react/prefer-stateless-function
class MainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procedure: initState,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newProcedure = reorder(
      this.state.procedure,
      result.source,
      result.destination,
    );

    // const procedure = update(this.state.procedure, { subList: { $set: subList } });
    this.setState({ procedure: newProcedure });
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {SubList(this.state.procedure)}
      </DragDropContext>
    );
  }
}

export default MainList;
