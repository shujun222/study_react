import React, { Component, PureComponent } from 'react'

export default class ParentComp extends Component {
    state = {
        count: 0,
        name: "唐三"
    }

    increment = () => {
        let count = this.state.count + 1
        this.setState({count})
    }

    players = ["唐三","签到流","唐晨","波赛西"]

    render() {
        const {count, name} = this.state
        return (
            <div>
                <button onClick={() => this.increment(count)}>点击次数：{count}</button>
                <br />
                <button onClick={() => { this.setState({name: "胖子"}) }}>更换选手</button>
                
                <ChildComp name={name} onClick={this.increment} players={this.players} />
            </div>
        )
    }
}


class ChildComp extends PureComponent {
    render() {
        console.log('render child-comp ...')
        return <div>Child Comp ... {this.props.name}</div>
    }
}
