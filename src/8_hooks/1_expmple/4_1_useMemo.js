import React, { useState, useMemo } from 'react'
import { message } from 'antd'
import 'antd/dist/antd.css';

/**
 * useMemo(function, [x]): 缓存函数的返回值
 */
export default function App() {
    const [name, setName] = useState('名称')
    const [content, setContent] = useState('内容')


    function getFullName(name) {
        console.log('只要组件重新渲染，函数都会重新执行？')
        return 'shu ' + name
    }

    // 这么写，函数一直会调用，即便改变的是children, 和name半毛钱关系也没有
    // const fullName = getFullName(name)

    // useMemo能达到性能优化，只有[name]改变了再去调用函数
    const fullName = useMemo(() => getFullName(name), [name])
    // 谁update也没用，老子只运行一次
    // const fullName = useMemo(() => getFullName(name), [])
    // 谁update都可以，一直运行
    // const fullName = useMemo(() => getFullName(name), [])


    return (
        <>
            <h2>useMemo</h2>
            <p>
                有两个state: name， content; 任意更改一个state都会引起组件的重新render
            </p>
            <button onClick={() => setName(new Date().getTime())}>change name</button> &nbsp;
            <button onClick={() => setContent(new Date().getTime())}>change content</button> <br/>
           
            全名: {fullName} <br/>
            content: {content}
            
        </>
    )
}
