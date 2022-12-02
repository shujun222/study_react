import React, { useState, memo, useCallback } from 'react'

/**
 * memo(function, compareFun): 缓存整个组件的值，类似React.pureComponent
 * Author: shujun
 * Date: 2022-12-1
 */
export default function App() {
    const [name, setName] = useState('名称')
    const [content, setContent] = useState('内容')

    const log = () => console.log(666);
    const useLog = useCallback(log, [])

    return (
        <>
            <h2>useMemo</h2>
            <p>
                有两个state: name， content; 任意更改一个state都会引起组件的重新render
            </p>
            <button onClick={() => setName(new Date().getTime())}>change name</button> &nbsp;
            <button onClick={() => setContent(new Date().getTime())}>change content</button> <br/>
           
            {/* 如果还有入参，func, 那memo也没用 */}
            {/* 全名: <FullName name={name} log={log} /> <br/> */}
            全名: <FullName name={name} log={useLog} /> <br/>

            content: {content}
        </>
    )
}

function GetFullName({name}) {
    console.log('只要组件重新渲染，函数都会重新执行？')
    return 'shu ' + name
}
const FullName = memo(GetFullName)