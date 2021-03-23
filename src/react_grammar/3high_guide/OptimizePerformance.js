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

class CounterButton extends React.Component {
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


