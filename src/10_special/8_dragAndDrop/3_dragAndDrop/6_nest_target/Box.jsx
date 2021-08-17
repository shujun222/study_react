import { useDrag } from 'react-dnd';
import React from 'react'

const style = {
    display: 'inline-block',
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    backgroundColor: 'white',
    cursor: 'move',
};

export const Box = () => {
    const [, drag] = useDrag(() => ({ 
        type: "box",
        end: (item, monitor) => {
            const didDrop = monitor.didDrop();
            const dropResult = monitor.getDropResult()
            console.log(dropResult.name, ": didDrop? ", didDrop);
        } 
    
    }));
    return (<div ref={drag} style={style}>
			Drag me
		</div>);
};
