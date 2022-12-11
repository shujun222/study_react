import React from "./react";
import ReactDOM from './react-dom'

// import React from 'react'
// import ReactDOM from 'react-dom'


// useState是基于useReducer实现的
function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return {number: state.number + 1}
        default:
            return state;
    }
}


function FunctionCounter (props) {
    const [numberState, dispatch] = React.useReducer(reducer, {number: 0})
    const [info, setInfo] = React.useState({age: 18})

    return (
        <div>
            <div id="counter">
                <span>{numberState.number}</span>
                <button onClick={() => dispatch({type: 'ADD'})}>加一</button>
            </div>

            <div id="age">
                <span>{info.age}</span>
                <button onClick={() => setInfo({age: info.age + 1})}>成长一岁</button>
            </div>
        </div>
        
    )
}

// eslint-disable-next-line
function FunctionCounter1 (props) {
    return (
        <div id="counter">
            <span>10</span>
            <button>加一</button>
        </div>
    )
}

let root = document.getElementById("root")
ReactDOM.render(<FunctionCounter name="计数器" />, root)

