import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from './listItem';
import { levColors } from './helpers/styles';
import Schemas from './helpers/schemas';

const getListStyle = level => ({
  background: levColors[level],
  minHeight: '8px',
});

// const pathIdGen = node => update(node.path, { $push: [node.key] }).join('-');

const padding = (show, level) => (show ? <div style={getListStyle(false, level)} /> : null);

export const SubList = ({ listHolder, showLevel, parentNum }) => {
  if (listHolder.level + 1 <= showLevel) {
    return (
      <div style={getListStyle(listHolder.level)}>
        {padding(get(listHolder, 'subList', []).length * listHolder.level, listHolder.level)}
        {get(listHolder, 'subList', []).map((i, index) => (
          <ListItem key={i} itemId={i} index={index} parentNum={parentNum} />
        ))}
      </div>
    );
  }
  // otherwise placeholder for the height for the Droppable
  return padding(true, listHolder.level);
};

SubList.propTypes = {
  listHolder: PropTypes.shape(Schemas.item).isRequired,
  showLevel: PropTypes.number.isRequired,
  parentNum: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  listHolder: state.procedure.list[ownProps.forId],
  showLevel: state.visibilityFilter,
  parentNum: ownProps.parentNum,
});
const SubListContainer = connect(mapStateToProps)(SubList);

export default SubListContainer;
