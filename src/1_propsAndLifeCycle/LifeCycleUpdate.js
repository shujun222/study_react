import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LifeCycleUpdate extends Component {
    state = {
        person: { name: "马红俊", level: "46级控制系战魂宗", skill: "凤凰笑田鸡" },
    }

    changePlayer = () => {
        this.setState({
            person: { name: "唐山", level: "48级控制系战魂宗", skill: "蓝银囚笼" }
        });
    }

    render() {
        return <div style={{ border: '1px solid red', width: '400px' }}>
            欢迎参加斗罗大陆魂师精英赛：
                <button onClick={this.changePlayer}>大师换人</button>
            <Player person={this.state.person} />
        </div>;
    }
}

class Player extends Component {
    // --------------   只是初次挂载的三个函数 start  -----------------
    constructor() {
        super();
        console.log("Player init: constructor");
        this.state = {a:""};
    }

    // UNSAFE_componentWillMount() {
    //     console.log("Player init: componentWillMount");
    // }

    static getDerivedStateFromProps() {
        console.log("Player getDerivedStateFromProps");
        return null;
    }

    componentDidMount() {
        console.log("Player init: componentDidMount");
    }

    // --------------   只是初次加载的三个函数 end  -----------------


    // --------------   更新时执行 start  -----------------
    // 现在看来，组件更新有三种可能
    // 1. 看起来像是props改了(本质是父组件被render了)
    // 2. setState了
    // 3. forceUpdate
    // UNSAFE_componentWillReceiveProps() {
    //     console.log("Player componentWillReceiveProps");
    // }

    shouldComponentUpdate() {
        // 初始化时是不加载的
        console.log("Player update shouldComponentUpdate");
        return false;
    }

    // UNSAFE_componentWillUpdate() {
    //     console.log("Player componentWillUpdate");
    // }

    getSnapshotBeforeUpdate() {
        console.log("Player updae getSnapshotBeforeUpdate");
        return "666";
    }

    componentDidUpdate (){
        console.log("Player update componentDidUpdate");
    }
    // --------------   更新时执行 end  -----------------


    force = () => {
        // 即便state没有改变，即便shouldComponentUpdate return false, 我也能更新
        this.forceUpdate();
    }
    
    death = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }

    componentWillUnmount() {
        console.log("Player componentWillUnmount ");
    }

    render() {
        console.log("Player render");
        const { name, level, skill } = this.props.person;
        return <div style={{ border: '1px dashed green', width: '200px' }}>
            史莱克上场的是：<b>{name}</b> <br />
            {level} <br />
                必杀技 {skill} <br />
            <button onClick={this.force}>强制render</button>
            <button onClick={this.death}>自杀</button>
        </div>;
    }
}
