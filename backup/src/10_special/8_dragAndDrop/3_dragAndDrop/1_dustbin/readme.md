这属于最简单的reaact-dnd例子了, 对react-dnd有个初步认识

1. 在最外层用 <DndProvider backend={HTML5Backend}> 包裹
   这个用法和redux的Provider很类似

2. 给source写上useDrag钩子

3. 给targe写生useDrop钩子

搞定，收工


确实做到了对原有结构侵入最小，拖拽的东西都集中起来管理了。


基本概念：
https://react-dnd.github.io/react-dnd/docs/overview
1. item && type
2. monitor 
   react内部定义的一个state，可以监控状态变化，isDragging ? isOver? canDrop?
3. collect: 收集monitor的状态，作为useDrag, useDrop的返回值
4. 
