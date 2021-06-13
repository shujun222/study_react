import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class LifeCycleInit extends Component {
    constructor(props) {
        super(props);
        console.log("constructor...");
    }

    // UNSAFE_componentWillMount() {
    //     console.log("UNSAFE_componentWillMount...");
    // }

    static getDerivedStateFromProps(props) {
        console.log("getDerivedStateFromProps...", props);
    }

    componentDidMount() {
        console.log("componentDidMount...");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount...");
    }

    state = { count: 0 };

    add = () => {
        let count = this.state.count;
        this.setState({ count: count + 1 });
    }

    death = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    }
    
    render() {
        console.log("render...");
        let count = this.state.count;
        // Maximum update depth exceeded
        // 不能setState in (render, componentWillUpdate, componentDidUpdate)
        // this.setState({ count: count + 1 });

        return <div>
            <div>Count: {count}</div>
            <button onClick={this.add}>点我+1</button>
            <button onClick={this.death}>销毁组件</button>
        </div>
    }
}
