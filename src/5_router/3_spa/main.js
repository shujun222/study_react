import React, { Component } from 'react';
import './index.css';

export default class main extends Component {
    state = {"content": "Home"};

    render() {
        const {content} = this.state;
        return (<>
            <h1>React Router Demo</h1>
            <hr />
            
            <div className="menus">
                <a onClick={()=>this.setState({content: "About"})} 
                    className={"About"===content && "active"}>About</a>
                <a onClick={()=>this.setState({content: "Home"})}
                    className={"Home"===content && "active"}>Home</a>
            </div>

            {"About" === content && <About />}
            {"Home" === content && <Home />}
        </>)
    }
}



function Home() {
    console.log("home");
    return (
        <div className="content">
                Home <br />
                主页欢迎你
        </div>
    )
}

function About() {
    console.log("about");
    return (
        <div className="content">
            About author<br/>
            shu jun ~
        </div>
    )
}