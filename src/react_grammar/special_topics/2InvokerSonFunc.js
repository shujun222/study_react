/**
 * 子组件如何更改父组件的state呢？
 * 父组件传递下来的props不满足要求，往往需要修改
 * 
 * 
 * Author: shujun
 * Date: 2020-10-25
 */

import React from 'react';
import {message} from 'antd';
import 'antd/dist/antd.css';

export default class Father extends React.Component{
    render(){
        
        return <div style={{width: '600px', paddingBottom: '20px', border: '1px solid red' }}>
            <h3>father:</h3> 
            <p>
                在父组件上调用子组件的方法，或者父组件访问子组件的内容？<br/>
                此父组件没有state，onChange时直接改变子组件内容
            </p>

            <button onClick={() => {this.sonObj.showSonInfo()}}>
                调用子组件方法
            </button>
            {/* 这么写为什么是错误的呢？难道是this.child.showSonInfo还没加载完成？而箭头函数声明写法只是申明，要等点击时候再触发？ */}
            {/* <button onClick={this.child.showSonInfo}>调用子组件方法</button> */}

            &nbsp;
            <button onClick={() => {message.success("子组件state: "+this.sonObj.state.name)}}>
                show 子组件state
            </button>
            <Son getSonFuncs={(son)=>{this.sonObj=son}} />
        </div>    
    }
    
}


class Son extends React.Component {
    state = {
        "name": "sbjun"
    };

    componentDidMount(){
        // 调用父组件传入的函数，把自身赋给父组件
        this.props.getSonFuncs(this);
    }

    showSonInfo = ()=>{
        message.info("我是子组件Son的方法");
    }

    render(){
        const name = this.state.name;

        return <div style={{border: '1px solid green', marginTop: '20px'}}>
            <h3>Son:</h3> 
            
            <button onClick={this.showSonInfo}>子组件事件</button><br/>
            <input value={name} onChange={(e)=>{this.setState({name: e.target.value})}}/>
            state:  name -- {name}
        </div>    
    }
 }

 