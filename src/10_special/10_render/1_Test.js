import React, {useState} from 'react'


/**
 * 想通过这个例子证明虚拟dom强，
 * 直接往后续添加元素，自动对比前面不变的数据，已经渲染的都不变
 */
export default function Test() {
    let [arrays, setArrays] = useState(new Array(10).fill(0))

    const add = () => setArrays([...arrays, arrays.length + 1])
    const aa = (
        <div>
            <button onClick={add}>add</button> <br/>
            {arrays.map((item, index) => <li key={index}>{index}</li>)}
        </div>
    )

    console.log("aa", aa);
    return aa
}


