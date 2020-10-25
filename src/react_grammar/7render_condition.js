/**
 *  研究怎么控制组件的渲染
 *  https://react.docschina.org/docs/conditional-rendering.html
 *  Author: shujun
 *  Date: 2020-08-14
 **/

import React from 'react'

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        // 用户初始默认是没有登录的
        this.state = {
            isLoggedIn: false, 
            unReadMail: []
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLoginClick() {
        console.log("handleLoginClick...");
        // 如果不绑定this.function.bind(this), 函数函数可以调用的，只不过this.setState会报错？ 
        // 小朋友，我有很多的❓
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        console.log("handleLogoutClick...");
        this.setState({isLoggedIn: false});
    }

    render() {
        // 1. return外面，render里面，或者函数里面进行if else判断，返回一个元素变量。
        let button;
        if (this.state.isLoggedIn) {
            button = <button onClick={this.handleLogoutClick}>Logout</button>
        } else {
            button = <button onClick={this.handleLoginClick}>Login</button>
        }

        
        return (<>
            <div>
                if else 产生的元素：{button}
            </div>

            {/* 2. 在jsx中用 {flag && <html>}来显示隐藏代码 */}
            <div>
                flag and html方式:   
                {
                    this.state.unReadMail.length > 0 
                    && <span>你有未读邮件，{this.state.unReadMail.length}封</span>
                }
            </div>

            {/* 3. 三目运算控制，condition ? true : false */}
            <div>
                三目运算控制元素显示：
                {this.state.unReadMail.length>0 ? 
                    <span>你有未读邮件</span>:
                    <span>你的邮箱是空的，请别人给你发邮件吧！</span>
                }    
            </div>
            
            {/* 4 非主流方式，如果需要组件声明周期执行，但是又不想内容渲染，可以return null */}
            <ReadMail unReadMail={this.state.unReadMail} />
        </>);
    }
}  


class ReadMail extends React.Component {
    constructor(props) {
        super(props);
        console.log("ReadMail constructor...");
    }

    componentDidMount(){
        console.log("ReadMail componentDidMount");
    }

    render() {
        if (this.props.unReadMail.length > 0){
            return <div>我是收件箱</div>;
        } else{
            return null;
        }
    }
}



