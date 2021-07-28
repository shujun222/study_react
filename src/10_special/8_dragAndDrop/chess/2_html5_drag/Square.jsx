import React, {useState} from 'react'
import Knight from './Knight'

const dragInStyle = {
    backgroundColor: '#00ad23',
    opacity: '0.5'
}

export const Square = ({ i, knightPosition, movePosition, dragIn, setDragIn}) => {
    const x = i % 8
    const y = Math.floor(i / 8)
    const black = (x + y) % 2 === 1
    const isKnightHere = knightPosition[0] === x && knightPosition[1] === y
    const piece = isKnightHere ? <Knight /> : null

    const backgroundColor = black ? 'black' : 'white';
    const color = black ? 'white' : 'black';

    const squareStyle = {
        width: '12.5%',
        height: '12.5%',
        color,
        backgroundColor,
    }

    const canMove = canMoveKnight(x, y)

    if (dragIn) {
        console.log(i, x, y, black);
    }

    return (
        <div style={(canMove && dragIn) ? {...squareStyle, ...dragInStyle} : squareStyle}
            onClick={() => handleSquareClick(x, y, canMove)}
            onDragOver={(e) => handleDragOver(e, canMove)}
            onDragLeave={handleDragLeave}
            onDrop={() => handleDrop(x, y)}
        >
            {piece}
        </div>);


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

    function handleSquareClick(x, y, canMove) {
        console.log(222);
        if (canMove) {
            movePosition(x, y)
        }
    }

    function handleDragLeave() {
        setDragIn(false)
    }

    function handleDrop(x, y) {
        console.log("handleDrop...");
        setDragIn(false)
        movePosition(x, y)
    }

    function handleDragOver(e, canMove) {
        setDragIn(true)
        // 真是奇了怪了，这句不阻止，就没法触发handleDrop
        if (canMove) {
            e.preventDefault();
        }

        console.log("handleDragOver...");
    }
};
