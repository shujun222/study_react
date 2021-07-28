import React, {useState} from 'react'
import Board from './Board'

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