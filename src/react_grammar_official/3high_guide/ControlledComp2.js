/**
 * 1. 受控组件
 * https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
 * 
 * Author: shujun
 * Date: 2021-4-4 
 */

import React from 'react';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}