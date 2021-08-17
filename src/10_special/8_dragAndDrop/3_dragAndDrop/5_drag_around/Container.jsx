import React, { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Box } from './Box';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const styles = {
    width: 300,
    height: 300,
    border: '1px solid black',
    position: 'relative',
};

const Container = ({ hideSourceOnDrag }) => {
    const [boxes, setBoxes] = useState({
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
    });
    const moveBox = useCallback((id, left, top) => {
        setBoxes(update(boxes, {
            [id]: {
                $merge: { left, top },
            },
        }));
    }, [boxes, setBoxes]);
    const [, drop] = useDrop(() => ({
        accept: "box",
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            moveBox(item.id, left, top);
            return undefined;
        },
    }), [moveBox]);

    return (
        

    <div ref={drop} style={styles}>
        {Object.keys(boxes).map((key) => {
            const { left, top, title } = boxes[key];
            return (<Box key={key} id={key} left={left} top={top} hideSourceOnDrag={hideSourceOnDrag}>
                {title}
            </Box>);
        })}
    </div>

    );
};



const Example = ()=> {
    const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true);
    const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), 
        [hideSourceOnDrag]);

    return (
        <DndProvider backend={HTML5Backend}>
            <Container hideSourceOnDrag={hideSourceOnDrag}/>
            <p>
				<label htmlFor="hideSourceOnDrag">
					<input id="hideSourceOnDrag" type="checkbox" checked={hideSourceOnDrag} onChange={toggle}/>
					<small>Hide the source item while dragging</small>
				</label>
			</p>
        </DndProvider>
    )

}
    
export default Example
    


// 1. 可以随意移动位置，和"1_position"的原理是一样的
// 2. 移动的时候isDraging, 不渲染组件，就好比消失一样，妙啊