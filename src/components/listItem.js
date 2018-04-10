import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubListContainer from './subList';
import TextEdit from './textEdit';
import { levColors } from './helpers/styles';
import Schemas from './helpers/schemas';
import { setContent, selectItem } from '../state/actions';
import ItemMenu from './itemMenu';

const grid = 8;
const getItemStyle = (level, selected) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `${grid}px 0 0 ${grid}px`,
  margin: `0 0 ${grid / 4}px 0`,
  border: '1px solid black',
  borderRadius: '3px',
  // change background colour if dragging
  background: selected ? 'lightyellow' : levColors[level],
});

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.startHover = this.startHover.bind(this);
    this.endHover = this.endHover.bind(this);
    this.select = this.select.bind(this);
    this.state = { hover: false };
  }
  startHover() {
    this.setState({ hover: true });
  }
  endHover() {
    this.setState({ hover: false });
  }
  select(event) {
    event.stopPropagation();
    this.props.selectItem(this.props.item.id);
  }
  render() {
    const {
      index, item, handleChange, parentNum,
    } = this.props;
    const itemNum = `${parentNum}${parentNum.length ? '.' : ''}${String(index + 1)}`;
    return (
      <div
        style={getItemStyle(item.level, this.props.isSelected)}
        onMouseEnter={this.startHover}
        onMouseLeave={this.endHover}
        onClick={this.select}
      >
        <div className="line-content" style={{ padding: `0 0 ${grid * 0}px 0` }}>
          <div className="number-box">{itemNum}</div>
          <div className="content-box">
            <TextEdit item={item} handleChange={handleChange} />
          </div>
          {this.props.isSelected ? (
            <ItemMenu id={this.props.item.id} parent={this.props.parentId} />
          ) : null}
        </div>
        <div style={{ padding: `0 0 0 ${grid * 0}px` }}>
          <SubListContainer forId={item.id} parentNum={itemNum} />
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape(Schemas.item).isRequired,
  index: PropTypes.number.isRequired,
  parentId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  parentNum: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selectItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  item: state.procedure.list[ownProps.itemId],
  showLevel: state.visibilityFiler,
  index: ownProps.index,
  parentNum: ownProps.parentNum,
  parentId: ownProps.parentId,
  isSelected: state.procedure.settings.selected === ownProps.itemId,
});
const mapDispatchToProps = dispatch => ({
  handleChange: (content, itemId) => {
    dispatch(setContent(content, itemId));
  },
  selectItem: (id) => {
    dispatch(selectItem(id));
  },
});
const ListItemContainer = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export default ListItemContainer;
