/**
 * 竟然有个propsTypes可以进行类型检查、默认值设置
 * 
 * Author: shujun
 * Date: 2021-4-4
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}, sex is defualt: {this.props.sex}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};

// 指定 props 的默认值：
Greeting.defaultProps = {
  sex: 'man'
};