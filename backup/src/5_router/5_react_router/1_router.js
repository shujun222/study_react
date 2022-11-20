import React, { Component } from 'react'
import {Link, BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './index.css';

export default class router extends Component {
    render() {
        return (<BrowserRouter>
            <h1>React Router Demo</h1>
            <hr />

            <div>
                <div className="menus">
                    {/* <a href="about.html">About</a>
                    <a href="home.html" className="active">Home</a> */}

                    {/* 简洁版本Link, 但是这玩意儿不能高亮点击后的菜单 */}
                    {/* <Link to="/about">About</Link>
                    <Link to="/home">Home</Link> */}

                    <NavLink activeClassName="active" to="/about">About</NavLink>
                    <NavLink activeClassName="active" to="/home">Home</NavLink>
                </div>

                    {/* localhost:3000/23/about 不认识的，只认识根目录路径？ */}
                    {/* <Route path="about" component={About} /> */}
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
                Home <br />
                主页欢迎你
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