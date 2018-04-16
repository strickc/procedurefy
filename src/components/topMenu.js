import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Views, setView } from '../state/actions';

const items = [
  { name: 'Data', color: 'red', view: Views.DATA },
  { name: 'Procedure', color: 'blue', view: Views.PROCEDURE },
];

const TopMenuView = props => (
  <Menu pointing secondary>
    {items.map(item => (
      <Menu.Item
        key={item.name}
        name={item.name}
        view={item.view}
        color={item.color}
        active={props.curView === item.view}
        onClick={props.setView}
      />
    ))}
    <Menu.Menu position="right">
      <Menu.Item name="logout" active={false} onClick={props.setView} />
    </Menu.Menu>
  </Menu>
);

TopMenuView.propTypes = {
  setView: PropTypes.func.isRequired,
  curView: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
  curView: state.view,
});
const mapDispatchToProps = dispatch => ({
  setView: (event, { view }) => {
    dispatch(setView(view));
  },
});
const TopMenu = connect(mapStateToProps, mapDispatchToProps)(TopMenuView);

export default TopMenu;
