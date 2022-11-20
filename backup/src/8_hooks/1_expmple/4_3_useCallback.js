import React, { useState, memo } from 'react'
import { useCallback } from 'react'

export default function App() {
    const [name, setName] = useState('名称')
    const [content, setContent] = useState('内容')
    
    return (
        <>
            <div>
                如果组件参数中有函数，函数每次都相当于重新生成，子组件的props其实一直在变化了<br/>
                so need useCallback缓存函数
            </div>
            <button onClick={() => setName(new Date().getTime())}>name</button> &nbsp;
            <button onClick={() => setContent(new Date().getTime())}>content</button>
           
            <ShowResult name={name}>
                {content}
            </ShowResult>
        </>
    )
}

function ChangeName({name, func}) {
    console.log('ChangeName render...', func)
    return name + 'new'
}
const ChangeNameMemo = memo(ChangeName)

function ShowResult({ name, children }) {
    function logFunc() {
        console.log(666);
    }

    const logFunc2 = useCallback(logFunc, [])

    return (
        <div style={{border: '1px dashed gray', margin: '20px'}}>
            组件：
            <div>
                memo包裹的组件：
                {/* logFunc每次都是相当于重新生成的，所有func一直在变化 */}
                {/* <ChangeNameMemo name={name} func={logFunc}/> */}
                <ChangeNameMemo name={name} func={logFunc2}/>
            </div>

            <div>children:{children}</div>
        </div>
    )
}