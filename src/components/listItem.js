import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubListContainer from './subList';
import TextEdit from './textEdit';
import { levColors } from './helpers/styles';
import Schemas from './helpers/schemas';
import { setContent } from '../state/actions';

const grid = 8;
const getItemStyle = level => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `${grid}px 0 0 ${grid}px`,
  margin: `0 0 ${grid / 4}px 0`,
  border: '1px solid black',
  borderRadius: '3px',
  // change background colour if dragging
  background: levColors[level],
});

// eslint-disable-next-line react/prefer-stateless-function
const ListItem = ({
  index, item, handleChange, parentNum,
}) => {
  const itemNum = `${parentNum}${parentNum.length ? '.' : ''}${String(index + 1)}`;
  return (
    <div>
      <div style={getItemStyle(item.level)}>
        <div className="line-content" style={{ padding: `0 0 ${grid * 0}px 0` }}>
          <div className="number-box">{itemNum}</div>
          <div className="content-box">
            <TextEdit item={item} handleChange={handleChange} />
          </div>
        </div>
        <div style={{ padding: `0 0 0 ${grid * 0}px` }}>
          <SubListContainer forId={item.id} parentNum={itemNum} />
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape(Schemas.item).isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  parentNum: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  item: state.procedure.list[ownProps.itemId],
  showLevel: state.visibilityFiler,
  index: ownProps.index,
  parentNum: ownProps.parentNum,
});
const mapDispatchToProps = dispatch => ({
  handleChange: (content, itemId) => {
    dispatch(setContent(content, itemId));
  },
});
const ListItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export default ListItemContainer;
