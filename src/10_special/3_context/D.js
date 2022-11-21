import React, { Component } from 'react'
import {MyContext} from './Context'

export default class D extends Component {
    // static contextType = MyContext
    render() {
        console.log("mycontext", MyContext);
        return (
            <div style={{outline: '1px solid gray', padding: '10px'}}>
                1. 我是孙组件D, 接收到的props是:<br/> 
                1. this.context接收不到? <br/>
                {/* {this.context} */} 

                2. Consumer接收
                <MyContext.Consumer>
                    {value => value}
                </MyContext.Consumer>  
            </div>
        );
    }
}