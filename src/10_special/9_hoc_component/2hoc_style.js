/**
 * 实现一个功能：文本框 && 文本输入域
 * 管理自己的state，button弹出state
 * 
 *  使用高阶组件语法
 * 
 * Author: shujun
 * Date: 2020-11-22
 */

import React from 'react';
import {message} from 'antd';
import 'antd/dist/antd.css';

// 1. 定义高级组件函数方法
function getHocCom(Com) {
    class HocCom extends React.Component {
        constructor(){
            super();
            this.state = {
                textValue: ""
            };
        }
    
        changeTextValue = (e)=> {
            this.setState({
                textValue: e.target.value
            });
        }
    
        showValue = ()=> {
            message.success(this.state.textValue);
        }
        
        // 函数也可以不在当前return中申明，但是可以单独给具体基础组件调用
        // handBlur=(event)=>{
        //     message.warn(event.target.value);
        // }

        render() {
            return(<>
                <Com type="text" value={this.state.textValue} onChange={this.changeTextValue} 
                />
                <button onClick={this.showValue}>show value</button>
            </>);
        }
    }
    return HocCom;
}

// 2. 定义基础函数组件
// 从参数props中可以取高阶组件的函数
function Input() { 
    // onBlur={props.handBlur}
    return <input type="text"  />
}

function Textarea() {
    return <input type="textarea"  />
}

// 这样会报错，不能传递一个对象<input/>，只能传递一个String类型（指针吧）：Input
// const HocInput = getHocCom(<input/>);

// 3. 整合，调用生成高级组件
const HocInput = getHocCom(Input);
const HocTextArea = getHocCom(Textarea);

export default function TextHoc() {
    return(<>
        用户名：<HocInput/> <br/>
        班级: <HocInput /> <br/>

        个人介绍：<HocTextArea /> <br/>
        班级介绍：<HocTextArea />
    </>);
}