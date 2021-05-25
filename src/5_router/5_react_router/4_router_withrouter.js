import React, { Component } from 'react'
import {Link, BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';

import RouterHeader from './4_routerHeader';
import './index.css';

/**
 * 怎么让普通组件有路由组件的属性呢？
 * 
 * Author: shujun620
 * Date: 2021-5-10 07:10
 */
export default class MyRouter extends Component {
    render() {
        return (<BrowserRouter>
            <RouterHeader />

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
            About author<br/>
            shu jun ~
        </div>
    )
}

function Messages() {
    const data = [
        {id:"1", title:"message1"},
        {id:"2", title:"message2"},
        {id:"3", title:"message3"},
        {id:"4", title:"message4"},

    ];
    return(<>
        {data.map(item => (
            <ul key={item.id}>
                {/* 1.1 params方式：url里面传递参数 */}
                <Link to={`/home/messages/${item.id}/${item.title}`}>{item.title}</Link>
            </ul>
        ))}

        {/* 1.2 params方式：注册路由时动态路由匹配 */}
        <Route path="/home/messages/:id/:title" component={Detail} />
    </>);
}

function News() {
    return(<>
        <li>new1</li>
        <li>new1</li>
    </>);
}

function Detail(props) {
    const content = {
        "1": "我爱你中国，亲爱的母亲",
        "2": "我的愿望是世界和平",
        "3": "祝福未来的自己",
        "4": "每天保存乐观：求知的渴望，获知的成就",
    }

    console.log(props);
    // 1.3 params方式：接受时从 props.match中拿取，不要去split url
    const {id, title} = props.match.params;

    return (<>
        <li>id: {id}</li>
        <li>title: {title}</li>
        <li>content: {content[id]}</li>
    </>);
}