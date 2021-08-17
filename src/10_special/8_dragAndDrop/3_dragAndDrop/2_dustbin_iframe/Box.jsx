import React from 'react'
import { useDrag } from 'react-dnd';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
};

export const Box = function Box({ name }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { name },
        // 也可以不在这儿处理吧，在useDrop-drop里
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    
    const opacity = isDragging ? 0.4 : 1;
    return <div ref={drag} style={{ ...style, opacity }}>
			{name}
		</div>;
};
