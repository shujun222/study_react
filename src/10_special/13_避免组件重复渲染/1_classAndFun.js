import React, { memo } from "react";

export default class TestClass extends React.Component {
    state = {
        name: 'messi',
        profile: 7000,
    }

    logFun = ()=> 222

    render() {
        return <>
            name: {this.state.name} <br/>
            <button onClick={() => this.setState({name: new Date().getTime()})}>change name</button>

            <FootBall profile={this.state.profile / 7}  
            //    log={()=> 222}
               log={this.logFun}
            />

            {/* <BaxiFootBall profile={this.state.profile / 2} /> */}
            {/* <MemoBaxi profile={this.state.profile / 2} log={this.logFun} /> */}
        </>
    }
}

class FootBall extends React.PureComponent {
    render() {
        console.log("FootBall render...");
        console.log("log func", this.props.log && this.props.log());
        return <h2>国足平均工资：{this.props.profile}</h2>
    }
}

function BaxiFootBall({log, profile}) {
    console.log("BaxiFootBall render...", this);
    console.log("log func", log && log());
    return <h2>巴西男足平均工资：{profile}</h2>
}

const MemoBaxi = memo(BaxiFootBall)