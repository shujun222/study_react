import React, { memo, useState, useCallback, useMemo } from 'react'

let ChildComp = function ({name}) {
  console.log('render child-comp ...')
  return <div>Child Comp ... {name}</div>
}

// 被memo包裹之后，只要ChildComp的属性没变，就不会重新创建渲染，有点PureComponent的感觉
ChildComp = memo(ChildComp)



export default function ParentComp () {
    const [ count, setCount ] = useState(0)
    const increment = useCallback((count) => setCount(count+1), [])
  
    const [ name, setName ] = useState('唐三')
    // 和useCallback同样的道理，函数每次都加载，player每次重新被定义，烦不烦呢？
    // const players = ["唐三","签到流","唐晨","波赛西"]
    const players = useMemo(() => ["唐三","签到流","唐晨","波赛西"], [])

    return (
      <div>
        {/* <button onClick={increment}>点击次数：{count}</button> */}
        <button onClick={()=>increment(count)}>点击次数：{count}</button>

        <br />
        <button onClick={()=>{setName("胖子")}}>更换选手</button>
        {/* 但是这个时候如果传递的是function作为prop，那就玩完了，因为function每次都会重新渲染，increment每次都在重新被定义 */}
        <ChildComp name={name} onClick={increment} players={players} />
      </div>
    );
  }