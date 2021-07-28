import React, { useState, useMemo } from 'react'

export default function App() {
    const [name, setName] = useState('名称')
    const [content, setContent] = useState('内容')
    return (
        <>
            <button onClick={() => setName(new Date().getTime())}>name</button>
            <button onClick={() => setContent(new Date().getTime())}>content</button>
            <Button name={name}>{content}</Button>
        </>
    )
}


function Button({ name, children }) {
    function changeName(name) {
        console.log('11')
        return name + '改变name的方法'
    }

    // 这么写，函数一直会调用，即便改变的是children, 和name半毛钱关系也没有
    // const otherName = changeName(name)

    // useMemo能达到性能优化，只有[name]改变了再去调用函数
    const otherName =  useMemo(()=>changeName(name),[name])

    return (
        <>
            <div>{otherName}</div>
            <div>{children}</div>
        </>

    )
}