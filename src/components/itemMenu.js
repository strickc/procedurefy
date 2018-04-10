import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { moveItem, addItemAfter } from '../state/actions';

const ItemMenuVue = props => (
  <Button.Group vertical className="item-menu-container">
    <Button icon onClick={props.up}>
      <Icon name="arrow up" />
    </Button>
    <Button icon onClick={props.down}>
      <Icon name="arrow down" />
    </Button>
    <Button icon onClick={props.add}>
      <Icon name="add circle" />
    </Button>
  </Button.Group>
);
ItemMenuVue.propTypes = {
  up: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};
const mapStateToProps = null;
const mapDispatchToProps = (dispatch, ownProps) => ({
  up: () => {
    dispatch(moveItem(-1, ownProps.id, ownProps.parent));
  },
  down: () => {
    dispatch(moveItem(1, ownProps.id, ownProps.parent));
  },
  add: (event) => {
    event.stopPropagation();
    dispatch(addItemAfter(ownProps.id, ownProps.parent));
  },
});
const ItemMenu = connect(mapStateToProps, mapDispatchToProps)(ItemMenuVue);

export default ItemMenu;
