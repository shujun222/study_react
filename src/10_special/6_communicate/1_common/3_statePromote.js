/**
 * 状态提升
 * 如何从组件中提炼属性，不同子组件共享父组件的state，达到数据一致的要求
 * 
 * Author: shujun
 * Date: 2020-08-16
 */

 import React from 'react';


 function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>
 }

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

export default class Calculator extends React.Component {
    render() {
        return(<>
            <TemperatureInput scale='c' />
            <TemperatureInput scale='f' />
        </>);
    }
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: ''};
    }

    handleChange = (e) => {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
                <BoilingVerdict celsius={temperature} />   
            </fieldset>
        );
    }
}
