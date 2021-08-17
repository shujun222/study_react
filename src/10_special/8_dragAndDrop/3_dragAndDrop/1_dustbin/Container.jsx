import React from 'react'
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Container = function Container() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Dustbin />
			
			<div>
				<Box name="Glass"/>
				<Box name="Banana"/>
				<Box name="Paper"/>
			</div>
		</DndProvider>);
};

export default Container