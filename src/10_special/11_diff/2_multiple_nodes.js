import React from 'react'
import ReactDOM from 'react-dom/client'

let oldStyle = {border: 'solid red', margin: '5px'}
let newStyle = {border: 'solid green', margin: '5px'}

let oldVDOM = (
    <ul>
        <li key="A" style={oldStyle}>A</li>
        <li key="B" style={oldStyle}>B</li>
        <li key="C" style={oldStyle}>C</li>
        <li key="D" style={oldStyle}>D</li>
        <li key="E" style={oldStyle}>E</li>
        <li key="F" style={oldStyle}>F</li>
    </ul>
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(oldVDOM)



setTimeout(()=>{
    let newVDOM = (
        <ul>
            <li key="A" style={newStyle}>A-new</li>
            <li key="C" style={newStyle}>C-new</li>
            <li key="E" style={newStyle}>E-new</li>
            <li key="B" style={newStyle}>B-new</li>
            <li key="G" style={newStyle}>G</li>
        </ul>
    )
    console.log("newVDOM", newVDOM);
    root.render(newVDOM)
}, 3000)


/**
  第一轮循环
  A=A， key&type都一样，复用，更新A就好
  B可以不一样，跳出第一轮循环
  
  第二轮循环：
  遍历剩下的fiber，构建map={'B':B, 'C':C, 'D':D, 'E':E, 'F':F}
  继续遍历新的节点，去map里查找

  移动位置时尽量少的移动：新的位置低的移动, 即老的节点往后挪动



 */