import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { moveSelected, addItemAfterSelected, clearSelection, addChild } from '../state/actions';

const items = [
  { icon: 'arrow up', popup: 'Move Item Up', dispatch: 'up' },
  { icon: 'arrow down', popup: 'Move Item Down', dispatch: 'down' },
  { icon: 'add circle', popup: 'Add Peer Item', dispatch: 'add' },
  { icon: 'level down', popup: 'Add Child Item', dispatch: 'addChild' },
];

const ItemMenuView = props => (
  <div className={`sidebar ${props.visible ? 'show' : 'hide'}`}>
    <Menu fluid inverted icon="labeled" vertical className="">
      <div style={{ position: 'relative', height: '2em' }}>
        <Icon
          inverted
          style={{ position: 'absolute', right: '0' }}
          name="remove circle"
          onClick={props.close}
          link
        />
        Options
      </div>
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
  </div>
);
ItemMenuView.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
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
  addChild: (event) => {
    event.stopPropagation();
    dispatch(addChild());
  },
  close: () => {
    dispatch(clearSelection());
  },
});
const ItemMenu = connect(mapStateToProps, mapDispatchToProps)(ItemMenuView);

export default ItemMenu;
