/**
 * 实现一个功能：文本框 && 文本输入域
 * 管理自己的state，button弹出state
 * 
 *  但是text&&textarea不同，就得新建两个组件了；
 * 
 * Author: shujun
 * Date: 2020-11-22
 */

import React from 'react';
import {message} from 'antd';
import 'antd/dist/antd.css';


class Input extends React.Component {
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

    render() {
        return(<>
            <input type="text" value={this.state.textValue} onChange={this.changeTextValue} />
            <button onClick={this.showValue}>show value</button>
        </>);
    }
}

class Textarea extends React.Component {
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

    render() {
        return(<>
            <textarea value={this.state.textValue} onChange={this.changeTextValue} />
            <button onClick={this.showValue}>show value</button>
        </>);
    }
}

export default function TextHoc() {
    return(<>
        用户名：<Input/> <br/>
        班级: <Input /> <br/>
        年龄：<input type="text" /> <br/>

        个人介绍：<Textarea /> <br/>
        班级介绍：<Textarea />
    </>);
}