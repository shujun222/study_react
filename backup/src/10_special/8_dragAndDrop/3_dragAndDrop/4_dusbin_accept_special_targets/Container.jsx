import React from 'react'
import { Dustbin } from './Dustbin';
import { Box } from './Box';
import { DndProvider } from 'react-dnd'
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend'

/**
 * 这一节将非常有用，target只接受对应，特殊组件，
 * 可以对BE-UI的拖拽起非常大的帮助
 * useDrop里的accept属性
 * 
 * Author: shujun
 * Date: 2021-8-2 07:13
 * 
 */
const Container = function Container() {
    return (
        <DndProvider backend={HTML5Backend}>
			{/* 还支持url，file等拖入，炫酷呀 */}
            <Dustbin accept={["Glass", "Banana", "Paper", NativeTypes.URL, NativeTypes.FILE]} />
            <Dustbin allowedDropEffect={["copy", "move"]} accept={["Glass"]}/>
			
			<div style={{clear: 'both'}}>
				<Box name="Glass" type="Glass" canDrag={false} />
				<Box name="Banana" type="Banana" />
				<Box name="Paper" type="Paper" />
			</div>
		</DndProvider>);
};

export default Container