import React, { useState, memo } from 'react'

/**
 * memo(function, compareFun): 缓存整个组件的值，类似React.pureComponent
 * Author: shujun
 * Date: 2022-12-1
 */
export default function App() {
    const [name, setName] = useState('名称')
    const [content, setContent] = useState('内容')

    return (
        <>
            <h2>useMemo</h2>
            <p>
                有两个state: name， content; 任意更改一个state都会引起组件的重新render
            </p>
            <button onClick={() => setName(new Date().getTime())}>change name</button> &nbsp;
            <button onClick={() => setContent(new Date().getTime())}>change content</button> <br/>
           
            {/* 全名: <GetFullName name={name} /> <br/> */}
            全名: <FullName name={name} /> <br/>

            content: {content}
        </>
    )
}

// 如果需要包裹一个组件
function GetFullName({name}) {
    console.log('只要组件重新渲染，函数都会重新执行？')
    return 'shu ' + name
}
// const FullName = memo(GetFullName)

// 类似于 shouldComponentUpdate(), 不过好像没有用？
function shouldUpdate(prevProps, nextProps) {
    console.log("nextProps.name", nextProps.name);
    if(nextProps.name % 2 === 1){
        return true
    } else {
        console.log("next.name", nextProps.name);
        return false
    }
}
const FullName = memo(GetFullName, shouldUpdate)


