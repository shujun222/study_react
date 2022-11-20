import React from 'react'
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

/**
 * 非常有用的技能，可以按住alt键进行复制哦
 * 1. 只要你按住了alt键进行拖动，那么dropResult.dropEffect=copy
 * 2. useDrag里的end, 顺序应该后于 useDrop的drop()
 * 3. drop里的返回值在useDrag里面可以获取：monitor.getDropResult()
 * @returns 
 */
const Container = function Container() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Dustbin allowedDropEffect={["copy", "move"]} />
			
			<div>
				<Box name="Glass"/>
				<Box name="Banana"/>
				<Box name="Paper"/>
			</div>
		</DndProvider>);
};

export default Container