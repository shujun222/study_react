
import React from 'react'
/**
 * 有异步，也有同步
 * https://www.bilibili.com/video/BV1eG41157YD/?spm_id_from=444.64.top_right_bar_window_custom_collection.content.click&vd_source=10d355be19883e4a50b66949c50a67aa
 * 1:05:00
 * 
 * 为了批量更新setState, 这也一个函数内即便多个setState, 也只会触发一次render
 * react官网的解释：
 * 1. 保持内部一致性
 * 2. 后续架构升级后启用并发更新
 * 
 * https://www.bilibili.com/video/BV16t4y1r7oJ?p=2&vd_source=10d355be19883e4a50b66949c50a67aa
 * 还得先了解 legacy模式、concurrent模式
 * 总结：
 * 1. setState有两个api， setState(function, callback)任何情况下都是同步的
 * 2. 接下来只讨论 setState({}, callback), 而它又依赖于全局标志batchUpdate
 *    2.1 react生命周期，实例方法中，batchUpdate=true
 *        塞了一个setState进队列，并收集所有的第一个参数{}, 后续集体合并，再陆续执行回调
 *    2.2 如果在setTimeOut, setInterval, addListener中，batchUpdate=false, 或者说获取不到
 *        同步执行了, 这也不好，会造成render多次
 *    2.3 如果是在react18中，开启concurrent模式，又全部都是异步的了：ReactDOM.unstable_createRoot 
 * 
 * 结论：
 *   既然官网react18中concurrent模式默认所有setState({}, callback)全部异步，我们平常工作中就可以默认它全部异步
 *   如果需要里面获取setState之后的状态，可以在回调中进行
 */
export default class Asynchronous extends React.Component {
    state = {count: 0}

    // 1. 异步的 setState({}, [callback]) 
    handleClick1 = () => {
        this.setState(
            {count: this.state.count + 1},
            () => console.log("回调11", this.state.count)
        )
        console.log("顺序11", this.state.count)

        this.setState(
            {count: this.state.count + 1},
            () => console.log("回调12", this.state.count)
        )
        console.log("顺序12", this.state.count)
    }

    // 2. setState(function, [callback]之间又是同步的，诀绝子呀
    handleClick2 = () => {
        this.setState(
            (preState) => {
                console.log("preState21", preState.count);
                return {count: preState.count + 1}
            },
            () => console.log("回调21", this.state.count)
        )
        console.log("顺序21", this.state.count)
        this.setState(
            (preState) => {
                console.log("preState22", preState.count);
                return {count: preState.count + 1}
            },
            () => console.log("回调22", this.state.count)
        ) 
        console.log("顺序22", this.state.count)
    }

    handleClick3 = () => {
        this.setState(
            {count: this.state.count + 1},
            () => console.log("回调31", this.state.count)
        )
        console.log("顺序31", this.state.count)

        setTimeout(()=>{
            console.log("顺序33", this.state.count)
            this.setState({count: this.state.count + 1})
            console.log("顺序34", this.state.count)
            this.setState({count: this.state.count + 1})
            console.log("顺序35", this.state.count)
        }, 0)
    }

    render() {
        console.log("render");
        return <>
            count: {this.state.count} <br/>
            <button onClick={this.handleClick1}>异步 setState({}, [callback])</button> <br/>
            <button onClick={this.handleClick2}>同步 setState(function, [callback])</button> <br/>
            <button onClick={this.handleClick3}>同步 addEventListen setTimeout setInterval </button> <br/>
        </>
    }
}