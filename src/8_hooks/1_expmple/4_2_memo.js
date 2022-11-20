import React, { useState, memo } from 'react'

export default function App() {
    const [name, setName] = useState('名称')
    const [content, setContent] = useState('内容')
    
    return (
        <>
            <div>
                上一章的useMemo只能用来包裹函数，监听一组值, return一个具体值
                如果想要meno整个组件的所有props呢？接下来有请：<br/>
                memo: <br/>

                当只改变content。name不变化是时候，是不会触发ChangeNameMemo组件的
            </div>
            <button onClick={() => setName(new Date().getTime())}>name</button> &nbsp;
            <button onClick={() => setContent(new Date().getTime())}>content</button>
           
            <ShowResult name={name}>
                {content}
            </ShowResult>
        </>
    )
}

function ChangeName({name}) {
    console.log('ChangeName render...')
    return name + 'new'
}
const ChangeNameMemo = memo(ChangeName)

function ShowResult({ name, children }) {
    return (
        <div style={{border: '1px dashed gray', margin: '20px'}}>
            组件：
            <div>memo包裹的组件：<ChangeNameMemo name={name} /></div>
            <div>children:{children}</div>
        </div>
    )
}