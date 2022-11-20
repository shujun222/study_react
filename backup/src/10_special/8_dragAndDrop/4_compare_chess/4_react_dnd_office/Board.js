import React, {useState, useEffect} from 'react'
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

export default function Board({ game }) {
    const [[knightX, knightY], setKnightPos] = useState(game.knightPosition);
    useEffect(() => {
        console.log("userEffect...");
        return game.observe(setKnightPos)
    });

    function renderSquare(i, [knightX, knightY]) {
        const x = i % 8
        const y = Math.floor(i / 8)
        const isKnightHere = knightX === x && knightY === y
        const piece = isKnightHere ? <Knight /> : null
        return (
            // onClick直接加在Square上不奏效？
            <div key={i} onClick={() => handleSquareClick(x, y)}
                style={squareStyle}
            >
                <BoardSquare x={x} y={y} game={game} >{piece}</BoardSquare>
            </div>
        )
    }

    function handleSquareClick(x, y) {
        if (game.canMoveKnight(x, y)) {
            game.movePosition(x, y)
        }
    }

    let squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, game.knightPosition))
    }

    // return <div style={boardStyle}>{squares}</div>
    return <DndProvider backend={HTML5Backend}>
        <div style={boardStyle}>{squares}</div>
    </DndProvider>
}



