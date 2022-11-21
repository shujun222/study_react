import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

/**
 * 
 *  都是一些不看，完全不可能推理知道的用法：
    1. 第二个参数不传类似componentDidUpdate, 不过它挂载阶段也执行，componentDidUpdate只在update阶段; 
    2. 传递[], componentDidMount, return的函数就是componentWillUnmount
    3. 第二个参数[count]只监控count变化的componentDidUpdate
 */
export default function EffectHook() {
    const [count, setCount] = useState(0)

    // 1. componentDidUpdate, componentDidMount 都会更新；
    useEffect(() => {
        console.log("useEffect1");
        return () => {
            // 每次都会执行，渲染下一次之前先清理这一次
            console.log("useEffect1 clean up");
        }
    })

    // 2. 只有componentDidMount componentWillUnmount
    // 好处：相同功能集合在一起了
    useEffect(() => {
        console.log("useEffect2");
        const timer = setInterval(() => setCount(count => count + 1), 5000)

        // return的函数相当于 componentWillUnmount
        return () => {
            console.log("useEffect2 clean up");
            clearInterval(timer)
        }
    }, [])

    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById("root"))
    }


    const [num, setNum] = useState(0)
    const increaseNum = () => {
        setNum(num + 1)
    }

    // 3. 只有num变换的时候，函数才执行
    useEffect(()=> {
        console.log("useEffect3");
        return () => {
            console.log("useEffect3 clean up");
        } 
    }, [num])

    return (<>
        当前求和为{count} &nbsp;
        <button onClick={() => setCount(count + 1)}>点我+1</button> <br/>
        触发componentWillUnmount: 
        <button onClick={unmount}>销毁组件</button> <br/>

        另一个计数: {num} &nbsp; 
        <button onClick={increaseNum}>计数2</button>
    </>);

}