import React from 'react'
import { useDrop } from 'react-dnd';

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left'
};

export const Dustbin = ({allowedDropEffect, accept}) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept,        
        // 拖拽释放后，干什么，返回什么
        drop: () => ({ name: 'Dustbin', allowedDropEffect }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    } else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }

    return (
        <div ref={drop}
            style={{ ...style, backgroundColor }}>
            {isActive ? 'Release to drop' : 'Drag a box here'}
        </div>);
};
