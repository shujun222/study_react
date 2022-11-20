
import React, { useState } from "react"

function Operation(props) {
    const [counter, setCounter] = useState(0)

    const increment = () => {
        props.increment()
        setCounter(props.counter + 1)
    }

    return (
        <div style={{ border: 'dashed red', width: '200px', marginBottom: '10px' }}>
            组件1:<br />
            Value1(from props): {props.counter} <br />
            value2(from state): {counter}
            <button onClick={increment}>Increment</button>
        </div>
    )
}


function Display(props) {
    return (
        <div style={{ border: 'dashed green', width: '200px' }}>
            组件2:<br />
            显示数据 {props.counter}
        </div>
    )
}


export default function Father() {
    const [counter, setCounter] = useState(0)

    function increment () {
        setCounter(counter + 1)
    }

    return <div style={{border: 'dashed blue', width: '250px', height: '200px'}}>
        Father组件: <br/><br/>
        <Operation counter={counter} increment={increment} />
        <Display counter={counter} />
    </div>
}




