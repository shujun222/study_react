import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { useEffect } from 'react'

/**
 * 
 *  都是一些不看，完全不可能推理知道的用法：
    1. 第二个参数不传类似componentDidUpdate, 不过它挂载阶段也执行，componentDidUpdate只在update阶段; 
    2. 传递[], 类似但是不完全是componentDidMount, return的函数就是componentWillUnmount
    3. 第二个参数[count]只监控count变化的componentDidUpdate
 */
export default function EffectHook() {
    const [count, setCount] = useState(0)

    // 1. 等价于componentDidUpdate + componentDidMount；
    useEffect(() => {
        console.log("useEffect1");
        return () => {
            // 每次都会执行，渲染下一次之前先清理这一次
            console.log("useEffect1 clean up");
        }
    })

    // 2. 只有componentDidMount
    // 好处：相同功能集合在一起了
    useEffect(() => {
        console.log("useEffect2");
        const timer = setInterval(() => setCount(count => count + 1), 5000)

        // 因为第二个参数是[], return也只执行一次，相当于 componentWillUnmount
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

    // 3. 等价于componentDidMount + componentDidUpdate（不过只有num变换的时候，函数才执行）
    useEffect(()=> {
        console.log("useEffect3");
        return () => {
            console.log("useEffect3 clean up");
        } 
    }, [num])

    console.log("render...");
    return (<>
        当前求和为{count} &nbsp;
        <button onClick={() => setCount(count + 1)}>点我+1</button> <br/>
        触发componentWillUnmount: 
        <button onClick={unmount}>销毁组件</button> <br/>

        另一个计数: {num} &nbsp; 
        <button onClick={increaseNum}>计数2</button>
    </>);

}