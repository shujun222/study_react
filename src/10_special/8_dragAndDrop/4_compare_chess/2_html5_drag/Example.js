import React, {useState} from 'react'
import Board from './Board'

/**
 * 就不使用react-dnd, 喜欢html5的drag,drop api, 也不是很复杂，难接受
 * 1. 给knight加上draggable="true"
 * 2. 给Square加上onDragOver, onDragDrop等
 * 但是不得不说对拖拽对组件本身嵌入深了些了，得父亲传递不少方法下去给子组件，方便子组件种改变父级State
 * 
 * Date: 2021-7-5
 * Author: shujun
 */
export default function Example() {
    const [knightPosition, setKnightPosition] = useState([3,4])   

    function movePosition(x, y) {
        setKnightPosition([x, y])
    }

    return <Board knightPosition={knightPosition} movePosition={movePosition} />
}