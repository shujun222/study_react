import React from "react"
import { Provider } from 'react-redux';
import logo from '../common/logo.svg'
import CounterConnector from './Counter'
import store from './store'

export default function CounterContainer() {
    return (
        <Provider store={store}>
            <div style={{ textAlign: "center" }}>
                <img src={logo} className="App-logo" alt="logo" style={{ height: "40vmin" }} />
            </div>

            <CounterConnector />
        </Provider>
    )
}