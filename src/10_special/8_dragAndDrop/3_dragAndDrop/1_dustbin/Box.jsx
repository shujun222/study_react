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
    const [{ opacity }, drag] = useDrag(() => ({
        type: 'box',
        // item是一个对象，表示你拖拽时要传递的数值，这是交互的宝藏呀
        item: { name },
        // 也可以不在这儿处理吧，在useDrop-drop里
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`);
            }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }));
    
    return <div ref={drag} style={{ ...style, opacity }}>
			{name}
		</div>;
};
