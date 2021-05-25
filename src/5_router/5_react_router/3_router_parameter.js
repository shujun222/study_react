import React, { Component } from 'react'
import {Link, BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './index.css';
// eslint-disable-next-line
import qs from 'querystring';

/**
 * 路由组件的参数传递 - 
 * 1. params方式
 * 2. search
 * 3. state传递: 隐藏传递参数，不想体现下地址栏内
 * 
 * Author: shujun620
 * Date: 2021-5-8 07:10
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
                {/* <Link to={`/home/messages/${item.id}/${item.title}`}>{item.title}</Link> */}

                {/* 2.1 search方式：url的search里面传递参数 */}
                {/* <Link to={`/home/messages/detail?id=${item.id}&title=${item.title}`}>{item.title}</Link> */}

                {/* 3.1 state方式：to传递对象了 */}
                <Link to={{pathname: '/home/messages/detail', state:{id: item.id, title: item.title}}}>{item.title}</Link>
            </ul>
        ))}

        {/* 1.2 params方式：注册路由时动态路由匹配 */}
        {/* <Route path="/home/messages/:id/:title" component={Detail} /> */}

        {/* 2.2 search方式： 不需要像传递params那样特别声明接收 */}
        {/* <Route path="/home/messages/detail" component={Detail} /> */}

        {/* 3.2 state方式：直接注册路由就好 */}
        <Route path="/home/messages/detail" component={Detail} />
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
    // const {id, title} = props.match.params;

    // 2.3 search方式：取值从location.search
    // const {id, title} = qs.parse(props.location.search.slice(1));

    // 3.3 state方式，取值
    const {id, title} = props.location.state || {};
    return (<>
        <li>id: {id}</li>
        <li>title: {title}</li>
        <li>content: {content[id]}</li>
    </>);
}