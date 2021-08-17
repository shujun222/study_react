import React from 'react'
import { useDrag } from 'react-dnd';
const style = {
    position: 'absolute',
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    cursor: 'move',
};
export const Box = ({ id, left, top, hideSourceOnDrag, children, }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "box",
        item: { id, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);

    // 其实也可以添加一个样式来隐藏行踪和气息，真是瀚海乾坤罩 
    const opacity = (isDragging && hideSourceOnDrag) ? 0 : 1
    
    // if (isDragging && hideSourceOnDrag) {
    //     return <div ref={drag}/>;
    // }
    return (<div ref={drag} style={{ ...style, left, top, opacity }}>
			{children}
		</div>);
};
