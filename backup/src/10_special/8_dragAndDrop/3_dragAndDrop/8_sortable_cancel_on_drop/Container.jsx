import React, { useState, useCallback } from 'react'
import { Card } from './Card';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const style = {
	width: 400,
};

/**
 * 上一节已经很完美了，但是drop时候不想都不行，因为数据已经变化了
 * 这一节据说可以实现cancel on drop, 666
 * 非常好呀，适合BE-UI的商业版本了
 * 
 * 感觉这次官网的例子写的是真的：罗嗦
 * https://react-dnd.github.io/react-dnd/examples/sortable/cancel-on-drop-outside
 * 
 * 1. 对比上一个例子，无非就是新增了一个 useDrag, end 判断， 整的那么花里胡哨的，好像重写了一样
 * 2. 还把onDrop里判断划过hover组件一半才置换的功能给去了，这是要倒退的节奏呀
 * 
 * Author: shujun
 * Date: 2021-8-15 14:24
 * 
 */
const Container = () => {
	const [cards, setCards] = useState([
		{
			id: 0,
			text: '0 PROFIT',
		},
		{
			id: 1,
			text: '1 Write a cool JS library',
		},
		{
			id: 2,
			text: '2 Make it generic enough',
		},
		{
			id: 3,
			text: '3 Write README',
		},
		{
			id: 4,
			text: '4 Create some examples',
		},
		{
			id: 5,
			text: '5 Spam in Twitter and IRC to promote it (note that this element is taller than the others) 斗罗大陆 史莱克七怪 Spam in Twitter and IRC to promote it (note that this element is taller than the others) 斗罗大陆 史莱克七怪 Spam in Twitter',
		},
		{
			id: 6,
			text: '6 ???',
		},
	]);

	const moveCard = (dragIndex, hoverIndex) => {
		const dragCard = cards[dragIndex];
		cards.splice(dragIndex, 1)
		cards.splice(hoverIndex, 0, dragCard)
		setCards([...cards])
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div style={style}>
				{
					cards.map((card, index) =>
						<Card key={card.id} index={index} text={card.text} moveCard={moveCard} />
					)}

			</div>
		</DndProvider>
	);
};

export default Container