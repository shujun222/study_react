import React from 'react'

const knightStyle = {
    fontSize: 40,
    fontWeight: 'bold',
    cursor: 'move',
    textAlign: 'center',
    // border: '1px solid red',
    height: '100%',
};

export default function Knight() {
  return <div style={knightStyle}>♘</div>
}

