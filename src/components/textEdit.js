import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { levColors, itemSelected } from './helpers/styles';
import { itemSchema } from './helpers/schemas';

const getItemStyle = (level, isSelected) => (
  (isSelected ? itemSelected : { background: levColors[level] })
);

class TextEdit extends Component {
  constructor(props) {
    super(props);
    this.textUpdate = this.textUpdate.bind(this);
    this.myText = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if (this.props.isSelected && !prevProps.isSelected) {
      this.myText.current.focus();
    }
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
        style={getItemStyle(this.props.item.level, this.props.isSelected)}
        onChange={this.textUpdate}
        ref={this.myText}
      />
    );
  }
}
TextEdit.propTypes = {
  item: PropTypes.shape(itemSchema).isRequired,
  handleChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
export default TextEdit;
