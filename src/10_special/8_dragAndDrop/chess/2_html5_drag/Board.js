import React, {useState} from 'react'
import { Square } from './Square'
import Knight from './Knight'

const boardStyle = {
    width: 500,
    height: 500,
    border: '1px solid gray',
    // 这两句css很绝呀
    display: 'inline-flex',
    flexWrap: 'wrap',
};

export default function Board({ knightPosition, movePosition }) {
    const [dragIn, setDragIn] = useState(false)

    function renderSquare(i) {
        return (
            <Square key={i} i={i} 
            knightPosition={knightPosition} movePosition={movePosition} 
            dragIn={dragIn} setDragIn={setDragIn} />
        )
    }

    let squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i))
    }

    return <div style={boardStyle}>{squares}</div>
}



