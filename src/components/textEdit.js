import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { levColors } from './helpers/styles';
import { itemSchema } from './helpers/schemas';
import util from './helpers/utilities';

const getItemStyle = level => ({
  // some basic styles to make the items look a bit nicer
  width: '100%',
  padding: 0,
  border: 'none',

  // change background colour if dragging
  // background: isDragging ? 'lightyellow' : levColors[level],
  background: levColors[level],
});

// eslint-disable-next-line react/prefer-stateless-function
class TextEdit extends Component {
  constructor(props) {
    super(props);
    this.textUpdate = this.textUpdate.bind(this);
  }
  textUpdate(event) {
    const { value } = event.target;
    return this.props.handleChange(util.pathIdGen(this.props.item), value);
  }
  render() {
    return (
      <textarea
        rows={1}
        defaultValue={this.props.item.content}
        style={getItemStyle(this.props.item.level)}
        onChange={this.textUpdate}
      />
    );
  }
}
TextEdit.propTypes = {
  item: PropTypes.shape(itemSchema).isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default TextEdit;
