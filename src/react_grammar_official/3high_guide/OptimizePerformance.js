/**
 * UI 更新需要昂贵的DOM 操作，而React内部使用几种巧妙的技术以便最小化 DOM 操作次数。
 * 
 * 本篇主要研究：shouldComponentUpdate
 * https://react.docschina.org/docs/optimizing-performance.html
 * 
 * Author: shujun
 * Date: 2021-3-23
 * 
 */

import React from 'react';
import { Radio } from 'antd';

export default class Optimize extends React.Component {
  state = {
    color: 'red',
    text: '不影响子组件的渲染?'
  };

  onRadioChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({color: e.target.value});
  };

  onTextChange = e => {
    console.log('text value', e.target.value);
    this.setState({text: e.target.value});
  };

  render() {
    console.log("father Optimize render ...");
    const {color, text} = this.state;
    return <>
      <Radio.Group onChange={this.onRadioChange} value={color}>
        <Radio value="red">red</Radio>
        <Radio value="green">green</Radio>
        <Radio value="blue">blue</Radio>
        <Radio value="yellow">yellow</Radio>
      </Radio.Group>

      <input type="text" value={text} onChange={this.onTextChange} /> 
      <br />

      <CounterButton color={color} />
    </>
  }
}

/**
 * 1. 如果继承的是 React.Component, shouldComponentUpdate 默认是return true的
 *    即父组件如何state改变时，必定会造成父组件render，这一过程中也就把子组件带着一起render了
 *    但是呢，如果写上shouldComponentUpdate进行判断，可以避免重复的render
 * 2. 如果继承的是 React.PureComponent, shouldComponentUpdate默认就写好了，
 *    但是呢，它只进行浅层比较，例如string，int基本类型，如果props是数组、对象，那么就翻车了
 *    例如 Optimize2.js
 */
class CounterButton extends React.Component {
// class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("start shouldComponentUpdate");
    
    // 只有这两种情况才进行render
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    
    console.log("end shouldComponentUpdate, retrun false, 不render");
    return false;
  }

  render() {
    // onClick={() => this.setState(state => ({count: state.count + 1}))}
    // onClick={() => this.setState({count: this.state.count + 1})}
    // setState有两种使用方式
    // https://www.jianshu.com/p/a883552c67de
    console.log("son CounterButton render ...");

    return (
      <button
        style={{background: this.props.color}}
        onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}


