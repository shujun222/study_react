import React, { Component, lazy, Suspense } from 'react'
import {BrowserRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import '../../5_router/5_react_router/index.css'

// 普通引入, 两个模块会一次性加载进来：相关的js文件在network中被加载了，
// 但是切换路由时，组件还是销户再渲染的
// import About from './About'
// import Home from './Home'

// 方法二：懒加载
// 切换路由时，组件还是销户再渲染，但是初次加载时js文件确实变少了，第一次切换路由时才会加载对应的组件js
// 1. 关键点1：import方式不同了哦
const About = lazy(() => import('./About'))
const Home = lazy(() => import('./Home'))

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

                {/* 2. 关键点2：路由部分一定要用Suspense包裹哦 */}
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/home" component={Home} />
                        <Redirect to="/home" />
                    </Switch>  
                </Suspense>
            </div>
        </BrowserRouter>)
    }
}


/**
 * 那么问题来了，有必要使用懒加载吗？
 * 没必要，因为我平常菜单根本就不多，使用路由默认配置挺好的呀，即：
 * 1. 第一次初始化时加载所有的
 * 2. 以后每次切换路由，就很顺畅丝滑啦，额，没有丝毫的卡顿感觉的
 * 
 */




