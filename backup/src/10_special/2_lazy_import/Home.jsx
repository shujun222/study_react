import React, { Component } from 'react'

export default class Home extends Component {
    componentDidMount() {
        console.log("Home didMount");
    }

    componentWillUnmount() {
        console.log("home willUnmount");
    }

    render() {
        return (
            <div className="content">
                    Home <br />
                    主页欢迎你
            </div>
        )
    }
}