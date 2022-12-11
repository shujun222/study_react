1. 为什么会重复渲染
   挂载  | 更新
   更新阶段： setState,  props render了，forceUpdate了

   无效渲染：父组件setState了，子组件也被迫重新render，其实是不想render的

2. 怎么避免
   a. 类组件
      继承React.PureComponent
      组件props中如果传递function, 不要直接在传递属性的时候定义函数，应该先定义好再传递函数名称
      
   b. function 组件
      b1. 类似PureComponent, 包裹整个组件，memo
      b2. 父亲是类组件，子组件是func，那也先定义好func，再传递名字就好
          如果父组件也是func, 那先定义也没用，因为父组件会完全重新render一遍
          那就得需要useCallBack包裹函数
      b3. 函数执行结果，useMemo
      b4. 缓存: reselect
          import { createSelector } from 'reselect'
          export const selectTodos = createSelector(selectTodoEntities,    (entities)          =>
                     Object.values(entities)
          )
          useSelect(selectTodos)
      b5. 不可变数据： ImmutableJs immerjs  ?

