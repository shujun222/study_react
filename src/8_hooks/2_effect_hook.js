import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

export default function EffectHook() {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        console.log("useEffect");
        const timer = setInterval(() => setCount(count => count+1), 1000)

        // return的函数相当于 componentWillUnmount
        return () => {
            console.log("unmount...");
            clearInterval(timer)
        }
    }, [])
    // 都是一些不看，完全不可能推理知道的用法：
    // 1. 第二个参数不传就是 componentDidUpdate; [count]只监控count变化的componentDidUpdate
    // 2. 传递[], componentDidMount
    // 3. 第一个参数中的回调就算 componentWillUnmount
    
    function unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById("root"))
    }

    return(<>
        当前求和为{count} <br/>
        <button onClick={() => setCount(count+1)}>点我+1</button>
        <button onClick={unmount}>销毁组件</button>
    </>);
    
}