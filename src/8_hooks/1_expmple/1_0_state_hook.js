import React from 'react'
// import { useState } from 'react'
import { useState } from '../2_sources/1_useState'


/**
 * useState相比Class实在是太简洁了，棒棒
 * 
 * date: 2021-5-22
 */
export default function StateHook() {
    const [count, setCount] = useState(0)

    function add() {
        // set不需要{key:value}映射，也不需要先去下this.state
        setCount(count + 1)
    }

    // 1. 不需要render函数了
    return (
        <div>
            求和为 {count} <br />
            <button onClick={add}>点我+1</button>
        </div>
    )
}
