import React, { PureComponent } from 'react'

export default class Parent extends PureComponent {
    state = { error: "" }

    static getDerivedStateFromError(e) {
        console.log("error ", e);
        return { error: e }
    }

    render() {
        const { error } = this.state;
        return (<>
            我是parent中的东西<br />
            <input /> <button>submit</button> <br />
            {error ?
                <span>Something went wrong</span>
                : <Child />
            }
        </>)
    }
}

function Child(props) {
    // const students = [
    //     {"id":1, name:"messi", age:32},
    //     {"id":2, name:"cr7", age:34},
    // ];

    // 一旦有一处报错，全局崩溃
    const students = {};

    return (<>
        {students.map(item => <li key={item.id}>{item.name}</li>)}
    </>);
}