import React, {useState} from 'react'
import Board from './Board'

export default function Example() {
    const [knightPosition, setKnightPosition] = useState([3,4])   

    function movePosition(x, y) {
        setKnightPosition([x, y])
    }

    return <Board knightPosition={knightPosition} movePosition={movePosition} />
}