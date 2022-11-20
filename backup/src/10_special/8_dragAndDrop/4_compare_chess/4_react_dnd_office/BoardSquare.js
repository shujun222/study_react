import React from 'react'
import { Square } from './Square'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'

export default function BoardSquare({ x, y, children, game }) {
    const black = (x + y) % 2 === 1
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.KNIGHT,
        drop: () => game.moveKnight(x, y),
        canDrop: () => game.canMoveKnight(x, y),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
    }), [x, y])

    return (
        <div
            ref={drop}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}
        >
            <Square black={black}>{children}</Square>

            {isOver && !canDrop && <Overlay color="red" />}
            {!isOver && canDrop && <Overlay color="yellow" />}
            {isOver && canDrop && <Overlay color="green" />}
           
        </div>
    )
}

function Overlay({color}) {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                zIndex: 1,
                opacity: 0.5,
                backgroundColor: color,
            }}
        />
    )
}
