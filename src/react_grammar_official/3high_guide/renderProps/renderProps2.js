/**
 * 如果要展示有个类Cat想读取Mouse的state，即鼠标位置呢？
 * 1. Cat嵌入Mouse内，自然可以很方便的读取到state
 *    本例子
 * 2. Cat和Mouse共享一个父组件，父组件维护state&传递改变state方法到Mouse，mouse同步修改掉父组件state
 * 3. 还有新招：见rederPros3.js
 * 
 * Author: shujun620
 * Date: 2021-4-3
 */
import React from 'react';
class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
  
          {/* ...但我们如何渲染 <p> 以外的东西? */}
          <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
          <Cat mouse={this.state} />
        </div>
      );
    }
  }
  
 export default class MouseTracker extends React.Component {
    render() {
      return (
        <>
          <h1>移动鼠标!</h1>
          <Mouse />
        </>
      );
    }
  }

  class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <img src={require('./cat.jpg')} alt=""
        style={{width:'200px', height:'200px', border: '1px solid green', 
        position: 'absolute', left: mouse.x, top: mouse.y}}
         />
      );
    }
  }
