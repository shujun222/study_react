import React, { Component } from 'react'

export default class About extends Component {
    componentDidMount(){
        console.log("about didmount");
    }

    render() {
        return (
            <div className="content">
                About author<br/>
                shu jun ~
            </div>
        )
    }
}