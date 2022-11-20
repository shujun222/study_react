import { useState } from 'react';
import { useDrop } from 'react-dnd';
import React from 'react'

// 秀啊，定义个样式还可以用这样的函数式
function getStyle(backgroundColor) {
    return {
        border: '1px solid rgba(0,0,0,0.2)',
        minHeight: '8rem',
        minWidth: '8rem',
        color: 'white',
        backgroundColor,
        padding: '2rem',
        paddingTop: '1rem',
        margin: '1rem',
        textAlign: 'center',
        float: 'left',
        fontSize: '1rem',
    };
}

export const Dustbin = ({ greedy, name, children }) => {
    const [hasDropped, setHasDropped] = useState(false);
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);

    const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
        accept: "box",
        drop(item, monitor) {
            console.log("target name", name);
            // 这个非常难理解了？ 当前一级的didDrop是false？父级反而能感受到didDrop=true, 😓
            // 有点类似与 didDrop等同于在判断嵌套的子层是否被drop了
            const didDrop = monitor.didDrop();

            // 拦截的条件：didDrop了，并且不是贪婪模式；
            if (didDrop && !greedy) {
                console.log("return ?");
                return {name};
            }
            
            console.log("didDrop", didDrop);
            setHasDropped(true);
            setHasDroppedOnChild(didDrop);
            return {name}
        },

        collect: (monitor) => ({
            // 当前组件 && 一直往外扩散到最外层
            isOver: monitor.isOver(), 
            // 没看懂这个是为啥，就当是react-dnd的默认属性了，只当前层，不包括内层，也不包括外层
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),

    }), [greedy, setHasDropped, setHasDroppedOnChild]);

    const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(0, 0, 0, .5)';
    // 1. 通过isOverCurrent和isOver来判断是否更换背景
    if (isOverCurrent || (isOver && greedy)) {
        backgroundColor = 'darkgreen';
    }

    return (
        <div ref={drop} style={getStyle(backgroundColor)}>
			{name}: {text}
			<br />
			{hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}

			<div>{children}</div>
		</div>);
};
