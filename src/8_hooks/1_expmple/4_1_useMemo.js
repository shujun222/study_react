import React, { useState, useMemo } from 'react'
import {message} from 'antd'
import 'antd/dist/antd.css';


export default function App() {
    const [name, setName] = useState('名称')
    const [content, setContent] = useState('内容')
    
    return (
        <>
            useMemo: <br/>
            <button onClick={() => {
                setName(new Date().getTime());         
                message.success("invoker func changeName");
            }}>name</button> &nbsp;
            <button onClick={() => setContent(new Date().getTime())}>content</button>
           
            <ShowResult name={name}>
                {content}
            </ShowResult>

            当只改变content。name不变化是时候，是不会触发changeName函数的
        </>
    )
}

function ShowResult({ name, children }) {
    function changeName(name) {
        console.log('11')
        // message.success("invoker func changeName")
        return name + 'new'
    }

    // 这么写，函数一直会调用，即便改变的是children, 和name半毛钱关系也没有
    // const otherName = changeName(name)

    // useMemo能达到性能优化，只有[name]改变了再去调用函数
    const otherName = useMemo(()=>changeName(name), [name])

    return (
        <div style={{border: '1px dashed gray', margin: '20px'}}>
            组件：
            <div>useMemo包裹函数(监听参数只有[name])产生的name: {otherName}</div>
            <div>children:{children}</div>
        </div>

    )
}