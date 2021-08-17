import { Dustbin } from './Dustbin';
import { Box } from './Box';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import React from 'react'

export const Container = () => (<div>
    如果啥都不处理，默认是第一幅图，拖入最里层时，由内往外遍历useDrop-onDrop,
    外层也会生效：
    <div>
        
        <Dustbin greedy={true} name={1}>
            <Dustbin greedy={true} name={2}>
                <Dustbin greedy={true} name={3}/>
            </Dustbin>
        </Dustbin>

        <Dustbin name={1}>
            <Dustbin name={2}>
                <Dustbin name={3}/>
            </Dustbin>
        </Dustbin>
    </div>

    <div style={{ clear: 'both' }}>
        <Box />
    </div>
</div>);

/**
 * 嵌入式target，这技术很适合BE-UI的表单查询区，弹框区的渲染，赞
 * https://react-dnd.github.io/react-dnd/examples/nesting/drop-targets
 * 
 * 但是感觉不是那么好理解的呢？
 * 1. 通过 monitor.isOver({ shallow: true }) 来判断是否为当前层
 * 2. useDrop里面判断monitor.didDrop()有意思了，难道这就是所谓的过去时，当前层didDrop=false, 
 *    然后它再默认循环依次往外遍历，外层didDrop为true，
 *    也就是如果拖入最里面一层，useDrop-onDrop()由内往外默认执行三次：false, true, ture
 *    除非按例子中那样通过标记去打断它
 *    useDrag-end只执行一次，获取的是onDrop最外层数据
 * 
 * Author: shujun
 * Date: 2021-8-17 6:55
 * 
 */
export default function Example() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Container />
        </DndProvider>
    )
}
