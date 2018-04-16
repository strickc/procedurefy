import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

const items = [{ name: 'Well', color: 'red' }, { name: 'Sections', color: 'blue' }];

class DataEntry extends React.Component {
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
      <Segment>
        <Menu pointing secondary>
          {items.map(item => (
            <Menu.Item
              key={item.name}
              name={item.name}
              color={item.color}
              active={this.state.activeItem === item.name}
              onClick={this.menuClick}
            />
          ))}
        </Menu>
      </Segment>
    );
  }
}

export default DataEntry;
