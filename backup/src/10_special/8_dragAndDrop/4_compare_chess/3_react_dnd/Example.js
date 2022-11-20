import React, {useState} from 'react'
import Board from './Board'

/**
 * 对官网给的react-dnd例子看不懂，感觉好复杂，自己修改写过了一遍
 * 
 * Date: 2021-7-12
 * Author: shujun
 */
// To do 还有bug
export default function Example() {
    const [knightPosition, setKnightPosition] = useState([3,4])   

    function moveKnight(x, y) {
        setKnightPosition([x, y])
    }

    function canMoveKnight(toX, toY) {
        const [x, y] = knightPosition
        const dx = toX - x
        const dy = toY - y

        return (
            (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2)
        )
    }

    return <Board knightPosition={knightPosition} 
    moveKnight={moveKnight} 
    canMoveKnight={canMoveKnight}/>
}