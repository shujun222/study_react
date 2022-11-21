import React, {useRef} from 'react'

export default function RefHook() {
    const inpuRef = useRef()
    function show() {
        alert(inpuRef.current.value)
    }

    return(<>
        <input ref={inpuRef} />
        <button onClick={show}>show</button>
    </>);
    
}

