import React from 'react'
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Frame, { FrameContextConsumer } from 'react-frame-component';
const FrameBindingContext = ({ children }) =>
	<FrameContextConsumer>
		{({ window }) =>
			<DndProvider backend={HTML5Backend} context={window}>
				{children}
			</DndProvider>}
	</FrameContextConsumer>
	;

// Don't use the decorator, embed the DnD context within the iframe
export default function Container() {
	return (
		<FrameBindingContext>

			{/* 最原始的貌似在react里面用不了，下次嵌入路由试试 */}
			{/* <iframe srcDoc="<Dustbin />" /> */}

			{/* 还是没想象中简单呀，iframe中怎么样才能拖拽呢？ */}
			<Frame>
				<Dustbin />
				<input />
			</Frame>

			{/* <Dustbin /> */}

			<div>
				<Box name="Glass" />
				<Box name="Banana" />
				<Box name="Paper" />
			</div>
		</FrameBindingContext>
	);
};


