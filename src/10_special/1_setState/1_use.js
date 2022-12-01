import React, { Component } from 'react'

export default class SetState extends Component {
    state = {count: 0}

    add = () => {
        //1. 常规做饭
        // const {count} = this.state
        // this.setState({count: count+1})
        // // 你会惊奇的发现，原来count并没有及时更新，是个异步的，哈哈
        // console.log(this.state.count);

        //可以使用回调如此改进, 第二个参数; 这个问题，我在表格分页里面雨果
        // this.setState({count: count+1}, ()=>{
        //     console.log(this.state.count);
        // })

        // 2. 函数式; 有点鸡肋了吧，好像完全不用的
        this.setState((state)=>(
            {count: state.count + 1}
        ))  
    }
    
    render() {
        return (<>
            求和为{this.state.count} <br/>
            <button onClick={this.add}>点我+1</button>

            <div>
                setState有两种方式：<br />
                1. 对象式setState({}, [callback]) <br/>
                2. 函数式setState(function, [callback])
            </div>
        </>)
    }
}
