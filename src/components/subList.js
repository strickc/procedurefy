import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from './listItem';
import { levColors } from './helpers/styles';
import Schemas from './helpers/schemas';

const getListStyle = level => ({
  background: levColors[level],
});

export const SubList = ({ listHolder, showLevel, parentNum }) => {
  if (listHolder.level + 1 <= showLevel) {
    return (
      <div style={getListStyle(listHolder.level)}>
        {get(listHolder, 'subList', []).map((i, index) => (
          <ListItem
            key={i}
            itemId={i}
            index={index}
            parentNum={parentNum}
            parentId={listHolder.id}
          />
        ))}
      </div>
    );
  }
  return null;
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
