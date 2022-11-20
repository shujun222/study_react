import React from 'react'
import Knight from './Knight'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BoardSquare from './BoardSquare'

const boardStyle = {
    width: 500,
    height: 500,
    border: '1px solid gray',
    // 这两句css很绝呀
    display: 'inline-flex',
    flexWrap: 'wrap',
};

const squareStyle = { width: '12.5%', height: '12.5%' };

export default function Board(props) {
     function renderSquare(i) {
        const [knightX, knightY] = props.knightPosition
        const x = i % 8
        const y = Math.floor(i / 8)
        const isKnightHere = knightX === x && knightY === y
        const piece = isKnightHere ? <Knight /> : null
        return (
            <div key={i} style={squareStyle}>
                <BoardSquare x={x} y={y} {...props}>{piece}</BoardSquare>
            </div>
        )
    }


    let squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i))
    }

    return <DndProvider backend={HTML5Backend}>
        <div style={boardStyle}>{squares}</div>
    </DndProvider>
}



