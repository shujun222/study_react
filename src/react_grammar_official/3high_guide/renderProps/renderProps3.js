/**
 * Mouse和Cat可以位于兄弟节点，而且父组件无需维护state了
 * Mouse既然可以接受方法作为props, 然后再Mouse的reture内：this.props.render(this.state)
 * 惊呆了，这也可以。。。
 * 
 * Author: shujun
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
      // 写在这儿没有效果，可能是没有return，前端界面上并没有画出Cat
      // this.props.render(this.state);
      console.log("xx ", this.props.render);

      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
  
          {/* ...但我们如何渲染 <p> 以外的东西? */}
          <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
          
          {/* <Cat mouse={this.state} /> */}
          {/* {this.props.render(this.state)} */}
          {this.props.render(this.state)}
        </div>
      );
    }
  }
  
export default class MouseTracker extends React.Component {
  render() {
    return (
      <>
        <h1>移动鼠标!</h1>
        {/* render prop 是一个用于告知组件需要渲染什么内容的函数 prop */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} />
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
