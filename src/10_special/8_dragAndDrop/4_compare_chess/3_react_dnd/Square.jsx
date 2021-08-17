import React from 'react'

export const Square = ({ black, children }) => {
    const backgroundColor = black ? 'black' : 'white';
    const color = black ? 'white' : 'black';
    return (
    <div style={{
        width: '100%',
        height: '100%',
        color,
        backgroundColor,
    }}>
        {children}
    </div>);
};
