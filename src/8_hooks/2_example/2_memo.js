import React, { memo, useState } from 'react'

let ChildComp = function ({name}) {
  console.log('render child-comp ...')
  return <div>Child Comp ... {name}</div>
}

// 被memo包裹之后，只要ChildComp的属性没变，就不会重新创建渲染，有点PureComponent的感觉
ChildComp = memo(ChildComp)



export default function ParentComp () {
    const [ count, setCount ] = useState(0)
    const increment = () => setCount(count + 1)
  
    const [ name, setName ] = useState('唐三')

    return (
      <div>
        <button onClick={increment}>点击次数：{count}</button>
        <br />
        <button onClick={()=>{setName("胖子")}}>更换选手</button>

        <ChildComp name={name} />
      </div>
    );
  }