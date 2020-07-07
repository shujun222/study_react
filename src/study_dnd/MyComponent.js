import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { Button } from 'antd';
 
const spec = {
	beginDrag(props, monitor, component) {
		// 这里 return 出去的对象属性自行选择，这里只是用 id 作为演示
		return { id: props.id }
	},
 
	endDrag(props, monitor, component) {
		console.log("endDrag...");
	},
 
	canDrag(props, monitor) {
		console.log("canDrag...");
	},
 
	isDragging(props, monitor) {
	    console.log("isDragging...");
	}
}
 
const collect = (connect, monitor) => ({
	// 这里返回一个对象，会将对象的属性都赋到组件的 props 中去。这些属性需要自己定义。
	connectDropTarget: connect.dropTarget(),
	id: monitor.getItem().id
})
 
// @DragSource(type, spec, collect)
class MyComponent extends Component {
  render() {
      return <>
        <Button>查询</Button>   
        <button>提交</button>
      </>;
  }
}
 
export default MyComponent;
