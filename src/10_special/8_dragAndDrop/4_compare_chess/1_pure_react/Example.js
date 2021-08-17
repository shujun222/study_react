import React, {useState} from 'react'
import Board from './Board'

/**
 * 纯react版本
 * 不拖拽，靠点击空白位置，我们也能走
 * @returns 
 */
export default function Example() {
    const [knightPosition, setKnightPosition] = useState([3,4])   

    function movePosition(x, y) {
        setKnightPosition([x, y])
    }

    return <Board knightPosition={knightPosition} movePosition={movePosition} />
}