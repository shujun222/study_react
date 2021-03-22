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

export default class Optimize extends React.Component {
    render() {
        return <CounterButton color="red" />
    }
}

class CounterButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (this.props.color !== nextProps.color) {
        return true;
      }
      if (this.state.count !== nextState.count) {
        return true;
      }
      return false;
    }
  
    render() {
        // onClick={() => this.setState(state => ({count: state.count + 1}))}
        // onClick={() => this.setState({count: this.state.count + 1})}
        // https://www.jianshu.com/p/a883552c67de

      return (
        <button
          color={this.props.color}
          onClick={() => this.setState({count: this.state.count + 1})}>
          Count: {this.state.count}
        </button>
      );
    }
  }


