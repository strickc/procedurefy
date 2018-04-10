import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { levColors } from './helpers/styles';
import { itemSchema } from './helpers/schemas';

const getItemStyle = level => ({
  // change background colour if dragging
  background: levColors[level],
});

class TextEdit extends Component {
  constructor(props) {
    super(props);
    this.textUpdate = this.textUpdate.bind(this);
  }
  textUpdate(event) {
    const { value } = event.target;
    return this.props.handleChange(value, this.props.item.id);
  }
  render() {
    return (
      <textarea
        rows={1}
        className="proc-text"
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
