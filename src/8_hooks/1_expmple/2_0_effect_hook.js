import React, { useState } from 'react'

// import { useEffect } from 'react'
import { useEffect } from '../2_sources/2_0_useEffect'


/**
 *  基本使用
 *  @Date: 2022-12-12
 */
export default function EffectHook() {
    const [count, setCount] = useState(0)
    const [num, setNum] = useState(0)

    // 等价于componentDidMount + componentDidUpdate（不过只有num变换的时候，函数才执行）
    useEffect(()=> {
        console.log("useEffect num", num);
    }, [num])

    console.log("render...");
    return (<>
        count: {count} &nbsp;
        <button onClick={() => setCount(count + 1)}>点我+1</button> <br/>

        num: {num} &nbsp; 
        <button onClick={() => setNum(num + 1)}>计数2</button>
    </>);

}