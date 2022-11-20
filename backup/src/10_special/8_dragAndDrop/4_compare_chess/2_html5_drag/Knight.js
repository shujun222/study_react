import React from 'react'

const knightStyle = {
    fontSize: 40,
    fontWeight: 'bold',
    cursor: 'move',
    // textAlign: 'center',
    // border: '1px solid red',
    // height: '100%',
    paddingLeft: '6px',
};

export default function Knight() {
  return <span style={knightStyle} draggable="true">♘</span>
}

