import React, { Component } from 'react';
import PropTypes from 'prop-types';
import math from 'mathjs';
import { levColors, itemSelected } from './helpers/styles';
import { itemSchema } from './helpers/schemas';

const getItemStyle = (level, isSelected) => (
  (isSelected ? itemSelected : { background: levColors[level] })
);

function onKeyDown(event) {
  if (event.keyCode === 13) event.preventDefault();
}

class TextEdit extends Component {
  constructor(props) {
    super(props);
    this.textUpdate = this.textUpdate.bind(this);
    this.evalText = this.evalText.bind(this);
    this.focus = this.focus.bind(this);
    this.myText = React.createRef();
    this.state = {
      evalContent: '',
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.isSelected && !prevProps.isSelected) {
      this.myText.current.focus();
    }
  }
  focus() {
    this.setState({ evalContent: '' });
  }
  textUpdate(event) {
    const { value } = event.target;
    return this.props.handleChange(value, this.props.item.id);
  }
  evalText() {
    let matches = 0;
    const newVal = this.props.item.content.replace(/{([^{}]+)}/gm, (match, p1) => {
      matches += 1;
      try {
        return math.eval(p1, { foo: 45 });
      } catch (error) {
        return '{ERROR}';
      }
    });
    if (matches) this.setState({ evalContent: newVal });
  }
  render() {
    return (
      <textarea
        rows={1}
        className="proc-text"
        value={this.state.evalContent ? this.state.evalContent : this.props.item.content}
        style={getItemStyle(this.props.item.level, this.props.isSelected)}
        onChange={this.textUpdate}
        onKeyDown={onKeyDown}
        ref={this.myText}
        onFocus={this.focus}
        onBlur={this.evalText}
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
