import React, { Component } from 'react'
import { Link, BrowserRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './index.css';

/**
 * 精准匹配 & 嵌套路由
 * Author: shujun620
 * Date: 2021-5-7 07:30
 */
export default class router extends Component {
    render() {
        return (<BrowserRouter>
            <h1>React Router Demo</h1>
            <hr />

            <div>
                <div className="menus">
                    <NavLink activeClassName="active" to="/about">About</NavLink>
                    <NavLink activeClassName="active" to="/home">Home</NavLink>
                </div>
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/home" component={Home} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        </BrowserRouter>)
    }
}


function Home(prop) {
    console.log(prop);
    return (
        <div className="content">
            Home 主页欢迎你 <br />

            {/* tab切换页面 */}
            <span className="tabSwitch">
                <NavLink activeClassName="active" to="/home/news">News</NavLink>
            </span>
            <span className="tabSwitch">
                <NavLink activeClassName="active" to="/home/messages">Messages</NavLink>
            </span>

            {/* 路由注册 */}
            {/* 
                <NavLink activeClassName="active" to="news"> 是可行的，url的相对绝对路径 
                然鹅 <Route path="/news" path="news" 都会失败的，难道路由path一定是全路径匹配的呢？ 
                */}
            <Switch>
                <Route path="/home/news" component={News} />
                <Route path="/home/messages" component={Messages} />
                <Redirect to="/home/messages" />
            </Switch>

        </div>
    )
}

function About() {
    return (
        <div className="content">
            About author<br />
            shu jun ~
        </div>
    )
}

function Messages() {
    return (<>
        <li>message1</li>
        <li>message2</li>
        <li>message3</li>
        <li>message4</li>
    </>);
}

function News() {
    return (<>
        <li>new1</li>
        <li>new1</li>
    </>);
}