import React, { Component } from 'react'
import {connect} from 'react-redux'
import {add} from '../redux/actions/person'

class Person extends Component {

    add = () => {
        const newPerson = {
            id: Math.random(), 
            name: this.nameNode.value, 
            age: this.ageNode.value
        }
        this.props.add(newPerson)

        this.nameNode.value = ""
        this.ageNode.value = ""
    }

    render() {
        const {persons, count} = this.props
        return (<>
            <h2>Person组件, 上方组件求和为{count}</h2>
            <input type="text" ref={e => this.nameNode=e} placeholder="姓名" />
            <input type="text" ref={e => this.ageNode=e} placeholder="年龄" />
            <button onClick={this.add}>添加</button>
            <br/>

            {persons.map(item => (
                <li key={item.id}>姓名：{item.name}, 年龄: {item.age}</li>
            ))}

        </>)

    }
}

export default connect(
    state => ({
        persons: state.person,
        count: state.counter
    }),
    {add}
)(Person)
