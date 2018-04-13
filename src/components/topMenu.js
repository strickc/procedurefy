import React from 'react';
import { Menu } from 'semantic-ui-react';

const items = [{ name: 'Data', color: 'red' }, { name: 'Procedure', color: 'blue' }];

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: items[1].name };
    this.menuClick = this.menuClick.bind(this);
  }
  menuClick(event, { name }) {
    this.setState({ activeItem: name });
  }
  render() {
    return (
      <Menu pointing secondary>
        {items.map(item => (
          <Menu.Item
            name={item.name}
            color={item.color}
            active={this.state.activeItem === item.name}
            onClick={this.menuClick}
          />
        ))}
        <Menu.Menu position="right">
          <Menu.Item name="logout" active={false} onClick={this.menuClick} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default TopMenu;
