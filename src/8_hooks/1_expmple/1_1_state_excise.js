import { useEffect, useState } from 'react'

/**
 * Question: 打印几次render？
 * 
 */
function Excise() {
    const [count, setCount] = useState(-1)

    useEffect(() => {
        console.log("gogogo.... setState");
        setCount(0);
    })

    console.log("render...");
    return <button>{count}</button>
}


function Excise1() {
    const [count, setCount] = useState(-1)

    useEffect(() => {
        console.log("gogogo.... setState");
        setCount(0);
    }, [])

    console.log("render...");
    return <button>{count}</button>
}


function Excise2() {
    const [count, setCount] = useState(-1)

    useEffect(() => {
        console.log("gogogo.... setState");
        setCount(0);
    })

    console.log("render...");
    return <button onClick={() => setCount(count + 1)}>{count}</button>
}


// export default Excise
// export default Excise1
export default Excise2