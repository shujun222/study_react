import React from 'react'
import { useState } from 'react';
import { Card } from './Card';
// eslint-disable-next-line
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const style = {
	width: 400,
};

/**
 * 这一节将会太有用了，可排序的拖拽 6到飞起
 * 可以对BE-UI的拖拽起非常大的帮助
 * 
 * 1. isDragging设置opacity为0
 * 2. card同时设置drop & drag
 * 3. useDrop的时候使用hover属性， 这个例子中hover时候，其实已经修改好了
 * 
 * Author: shujun
 * Date: 2021-8-11 07:24
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

	/**
	 * dragIndex: source, 哪个被你选中了，正在被拖拽中
	 * hoverIndex: target, 哪个控件被你替换
	 */
	const moveCard = (dragIndex, hoverIndex) => {
		// 这是官网的写法，真没感觉这个immutability-helper好在哪儿？除了把简单问题复杂化了
		// https://react-dnd.github.io/react-dnd/examples/sortable/simple
		// https://www.jianshu.com/p/5f749e90a6a2
		// const dragCard = cards[dragIndex];
		// setCards(update(cards, {
		// 	$splice: [[dragIndex, 1],[hoverIndex, 0, dragCard]],
		// }));

		// 交换位置方法1：代码简单，但是不好理解吧？ 一种花里胡哨，花拳绣腿的感觉
		// cards[dragIndex] = cards.splice(hoverIndex, 1, cards[dragIndex])[0]

		// 交换位置方法2：非常好理解
		// 但是和更换dragCard，dragCard操作有区别的，你品下，你细品下
		// const dragCard = cards[dragIndex];
		// cards[dragIndex] = cards[dragCard]
		// cards[hoverIndex] = dragCard
		
		// 是否这样才真正的是正解，必须分两步走，先删掉dragIndex, 再往hoverIndex插入dragCard
		const dragCard = cards[dragIndex];
		cards.splice(dragIndex, 1)
		cards.splice(hoverIndex, 0, dragCard)
		
		setCards([...cards])
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div style={style}>
				{cards.map((card, i) => 
					<Card key={card.id} index={i} text={card.text} moveCard={moveCard} />
				 )
				}
			</div>
		</DndProvider>
	);
};

export default Container