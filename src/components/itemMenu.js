import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Sidebar, Menu, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { moveSelected, addItemAfterSelected } from '../state/actions';

const items = [
  { icon: 'arrow up', popup: 'Move Item Up', dispatch: 'up' },
  { icon: 'arrow down', popup: 'Move Item Down', dispatch: 'down' },
  { icon: 'add circle', popup: 'Add Peer Item', dispatch: 'add' },
  { icon: 'level down', popup: 'Add Child Item', dispatch: 'addChild' },
];

const ItemMenuView = props => (
  <Sidebar
    as={Menu}
    animation="overlay"
    width="very thin"
    direction="left"
    visible={props.visible}
    icon="labeled"
    vertical
    inverted
  >
    <Menu fluid inverted icon="labeled" vertical className="">
      Options
      {items.map(item => (
        <Popup
          key={item.icon}
          trigger={
            <Menu.Item name={item.icon} onClick={props[item.dispatch]}>
              <Icon name={item.icon} />
            </Menu.Item>
          }
          content={item.popup}
          position="left center"
        />
      ))}
    </Menu>
    {/* <Button.Group vertical className="">
      <Button icon onClick={props.up}>
        <Icon name="arrow up" />
      </Button>
      <Button icon onClick={props.down}>
        <Icon name="arrow down" />
      </Button>
      <Button icon onClick={props.add}>
        <Icon name="add circle" />
      </Button>
    </Button.Group> */}
  </Sidebar>
);
ItemMenuView.propTypes = {
  visible: PropTypes.bool.isRequired,
  // up: PropTypes.func.isRequired,
  // down: PropTypes.func.isRequired,
  // add: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  visible: !!state.procedure.settings.selected,
});
const mapDispatchToProps = dispatch => ({
  up: () => {
    dispatch(moveSelected(-1));
  },
  down: () => {
    dispatch(moveSelected(1));
  },
  add: (event) => {
    event.stopPropagation();
    dispatch(addItemAfterSelected());
  },
});
const ItemMenu = connect(mapStateToProps, mapDispatchToProps)(ItemMenuView);

export default ItemMenu;
