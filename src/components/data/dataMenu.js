import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataNode from './dataNode';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

class DataMenuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: props.categories[0] };
    this.menuClick = this.menuClick.bind(this);
  }
  menuClick(event, { name }) {
    this.setState({ activeItem: name });
  }
  render() {
    return (
      <Segment>
        <Menu pointing secondary>
          {this.props.categories.map((cat, i) => (
            <Menu.Item
              key={cat}
              name={cat}
              color={colors[i]}
              active={this.state.activeItem === cat}
              onClick={this.menuClick}
            />
          ))}
        </Menu>
        <DataNode category={this.state.activeItem} />
      </Segment>
    );
  }
}
DataMenuView.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  categories: Object.keys(state.data),
});
// const mapDispatchToProps = dispatch => ({
  // onListChanged: (event, data) => {
  //   dispatch(setVisibilityFilter(data.value));
  // },
// });
const DataMenu = connect(mapStateToProps, null)(DataMenuView);

export default DataMenu;
