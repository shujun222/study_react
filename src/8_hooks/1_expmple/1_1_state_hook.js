import React from 'react'
// import { useState } from 'react'
import { useState } from '../2_sources/1_useState'


/**
 * 一次多个state
 * date: 2022-12-12 10:09 在澜澜这准备找工作中
 */
export default function StateHook() {
    const [count, setCount] = useState(0)
    const [age, setAge] = useState(18)

    function add() {
        setCount(count + 1)
    }

    return (
        <div>
            求和为 {count} 
            <button onClick={add}>点我+1</button> <br />

            年龄为 {age} 
            <button onClick={() => setAge(age + 1)}>成长一岁</button>
        </div>
    )
}
