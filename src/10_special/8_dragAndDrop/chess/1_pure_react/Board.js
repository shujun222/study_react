import React from 'react'
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

const squareStyle = { width: '12.5%', height: '12.5%' };

export default function Board({ knightPosition, movePosition }) {
    function renderSquare(i, [knightX, knightY]) {
        const x = i % 8
        const y = Math.floor(i / 8)
        const black = (x + y) % 2 === 1
        const isKnightHere = knightX === x && knightY === y
        const piece = isKnightHere ? <Knight /> : null
        return (
            // onClick直接加在Square上不奏效？
            <div key={i} onClick={() => handleSquareClick(x, y)}
                style={squareStyle}
            >
                <Square black={black}>{piece}</Square>
            </div>
        )
    }

    // 判断是否为马儿走的日
    function canMoveKnight(toX, toY) {
        const [x, y] = knightPosition
        const dx = toX - x
        const dy = toY - y

        return (
            (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2)
        )
    }

    function handleSquareClick(x, y) {
        if (canMoveKnight(x, y)) {
            movePosition(x, y)
        }
    }

    let squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition))
    }

    return <div style={boardStyle}>{squares}</div>
}



