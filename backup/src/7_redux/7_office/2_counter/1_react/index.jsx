import React from "react"
import logo from '../common/logo.svg'
import Counter from './Counter'

export default function CounterContainer() {
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <img src={logo} className="App-logo" alt="logo" style={{ height: "40vmin" }} />
            </div>

            <Counter />
        </>
    )
}