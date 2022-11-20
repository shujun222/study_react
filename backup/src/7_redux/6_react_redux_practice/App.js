import React, { Component } from 'react'
import CounterContainer from './containers/Counter'
import PersonContainer from './containers/Person'
import store from './redux/store'
import {Provider} from 'react-redux'


export default class App extends Component {
    render() {
        return (
            <Provider store={store}> 
                <CounterContainer />
                
                <hr />

                <PersonContainer />
            </Provider>
        );
    }
}



