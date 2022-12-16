import { useState } from "react";
// 这么写，加载时默认就是把文件加载进来了; 而且如果没进行特殊处理，这个模块也是会一起打包成main.js文件中的
// 这样毕竟费资源
// import {data} from './data'

export default function Example(params) {
    const [text, setText] = useState("文本")

    const changeText = async() => {
        // 1. 同步的
        // setText(data)
        
        // 2. lazy import数据
        // 原生js不能这么炫酷吧，动态进行import
        // import("./data").then(module => setText(module.data))
        
        // let module = await import("./data")
        // setText(module.data)

        // 3. lazy imp fun
        import("./func").then(module => {
            console.log("module", module);
            setText(module.stringfy({
                player: "Neymar"
            }))
        })
    }

    return (
        <div>
            <button onClick={changeText}>Async Data</button>
            <p>{text}</p>
        </div>
    )
}