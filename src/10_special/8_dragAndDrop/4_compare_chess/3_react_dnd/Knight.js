import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'

const knightStyle = {
    fontSize: 40,
    fontWeight: 'bold',
    cursor: 'move',
    textAlign: 'center',
    // border: '1px solid red',
    height: '100%',
};

export default function Knight() {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  console.log("drag", drag);
  return (
    <div style={{
      ...knightStyle,
      opacity: isDragging ? 0.5 : 1,
    }}
      ref={drag}
    >
      ♘
    </div>
  )
}

