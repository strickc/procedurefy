import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import uniqueId from 'lodash/uniqueId';
import update from 'immutability-helper';
import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import SubList from './subList';
import './styles.css';
import util from './helpers/utilities';

const updateSubPaths = (obj, path) => {
  obj.path.splice(0, path.length, ...path);
  const subList = _.get(obj, 'subList', []);
  for (let i = 0; i < subList.length; i += 1) {
    updateSubPaths(subList[i], path);
  }
};

// reorder the result of a drag
export const reorder = (procedure, source, destination) => {
  const spath = util.getListFromIdPath(procedure, source.droppableId);
  const sourceList = _.get(procedure, spath);
  const moveObj = sourceList[source.index];
  const supdate = util.makeUpdateObj(procedure, spath, '$splice', [[source.index, 1]]);
  const dsplice = [destination.index, 0, moveObj];
  // const dupdate = makeUpdateObj(procedure, dpath, [destination.index, 0, moveObj]);
  const totupdate = supdate;
  if (source.droppableId === destination.droppableId) {
    _.get(totupdate, spath).$splice.push(dsplice);
  } else {
    const dpath = util.getListFromIdPath(procedure, destination.droppableId);
    updateSubPaths(dsplice[2], destination.droppableId.split('-'));
    _.defaultsDeep(totupdate, util.makeUpdateObj(procedure, dpath, '$splice', [dsplice]));
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
initState.subList[0].subList = ['sone', 'stwo', 'sthree', 'sfour'].map(i =>
  itemGen(i, 2, initState.subList[0]),
);
initState.subList[0].subList[0].subList = ['ssone', 'sstwo', 'ssthree', 'ssfour'].map(i =>
  itemGen(i, 3, initState.subList[0].subList[0]),
);
initState.subList[2].subList = ['xone', 'xtwo', 'xthree', 'xfour'].map(i =>
  itemGen(i, 2, initState.subList[2]),
);

const levels = [
  { text: 'Sections', value: 1 },
  { text: 'Steps', value: 2 },
  { text: 'Detail', value: 3 },
];

// eslint-disable-next-line react/prefer-stateless-function
class MainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      procedure: initState,
      listSettings: { showLevel: 1 },
    };
    ['onDragEnd', 'changeLevel', 'handleChange'].forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newProcedure = reorder(this.state.procedure, result.source, result.destination);

    // const procedure = update(this.state.procedure, { subList: { $set: subList } });
    this.setState({ procedure: newProcedure });
  }
  changeLevel(event, value) {
    this.setState({
      listSettings: update(this.state.listSettings, { showLevel: { $set: value.value } }),
    });
  }
  handleChange(idPath, value) {
    const path = util.getListFromIdPath(this.state.procedure, idPath, 'content');
    const updateObj = util.makeUpdateObj(this.state.procedure, path, '$set', value);
    this.setState({ procedure: update(this.state.procedure, updateObj) });
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Dropdown placeholder="Show level" selection options={levels} onChange={this.changeLevel} />
        <SubList
          item={this.state.procedure}
          listSettings={this.state.listSettings}
          handleChange={this.handleChange}
        />
      </DragDropContext>
    );
  }
}

export default MainList;
