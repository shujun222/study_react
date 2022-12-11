import React from "./react";
import ReactDOM from './react-dom'

// import React from 'react'
// import ReactDOM from 'react-dom'

class ClassCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {number: 0}
    }

    onClick = () => {
        this.setState(state => ({number: state.number+1}))
        // this.setState({number: this.state.number + 1})
        // this.setState({number: 44})
    }

    render() {
        return (
            <div id="counter">
                <span>{this.state.number}</span>
                <button onClick={this.onClick}>加一</button>
            </div>
        )
    }
}

let root = document.getElementById("root")
ReactDOM.render(<ClassCounter name="计数器" />, root)

