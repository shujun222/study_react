import React from 'react'
// import { useRef } from 'react'
import { useRef } from '../2_sources/3_useRef'

export default function RefHook() {
    const inpuRef = useRef(66)
    console.log("inputRef", inpuRef);
    
    function show() {
        alert(inpuRef.current.value)
    }

    return (<>
        <input ref={inpuRef} />
        <button onClick={show}>show</button>
    </>);

}

