import { useState } from 'react'

export function useRef(initialValue) {
    console.log("initValue", initialValue);
    const [ref, _] = useState({ current: initialValue });
    return ref;
}