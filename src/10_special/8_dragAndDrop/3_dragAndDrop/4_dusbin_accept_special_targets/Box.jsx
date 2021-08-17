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

export const Box = function Box({ name, type, canDrag=true }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        canDrag,
        item: { name },
        // 也可以不在这儿处理吧，在useDrop-drop里
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            // 只要你按住了alt键进行拖动，那么dropResult.dropEffect=copy, 否则默认为move
            // 拓展一步：可以给Dustbin设置允许copy还是move，不如取个名字：allowedDropEffect=['copy']，然后再次进行判断本次拖拽是否放行
            console.log("dropResult", dropResult);
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}, action ${dropResult.dropEffect}!`);
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
