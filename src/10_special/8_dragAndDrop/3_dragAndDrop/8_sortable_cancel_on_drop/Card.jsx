import React from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    cursor: 'move',
};

// index是数组的排列顺序，和数据本身无关，这个后面作为hoverIndex来看
export const Card = ({ id, text, index, moveCard, findCard }) => {
    const ref = useRef(null)

    const [, drop] = useDrop({
        accept: "card",

        // 看来hover是默认自带的属性
        hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;

            // 下面所有的判断都是为了去除闪烁
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // 闪烁出现在 4->5 这种，5能完全包裹0，会搞不清楚index到底是哪个位置的
            // 4的top(hoverBoundingRect.top)只要进入了5的范围，就是hover 5， 就会交换
            // 现在改了，得进入5的一半，才去交换，但是这样为啥就避免了这个bug呢？感觉还是有点玄学的味道
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);

            // 这一句很关键呐：
            // 假设我们把第0个拖动到第一个之后，并且拖着迟迟不放手。也就是0，1互换位置。item.index=0, hoverIndex=1
            // 第一遍执行完，0，1交换位置了，Container重新render，因为拖着一直没释放，所以item.index依旧还是为0，hoverIndex依旧为1，又互换位置，它又重新来一遍了,也就是我们刚白换位置了，哈哈
            // 但是这个时候，把item.index=0 赋值为1，再次重新渲染的时候，配合上面的不替换自己，就拦截了
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: { index, originIndex: index },

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),

        end: (item, monitor) => {
            const didDrop = monitor.didDrop();
            console.log(index, "origin", item, "didDrop", didDrop);
            if (!didDrop) {
                moveCard(index, item.originIndex);

            }
        },
    }), [id, moveCard]);

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref))

    return (
        <div ref={ref} style={{ ...style, opacity }}>
			{text}
		</div>);
};
