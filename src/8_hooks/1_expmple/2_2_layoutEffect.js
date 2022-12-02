import { useLayoutEffect } from "react";
// eslint-disable-next-line
import { useState } from "react";
// eslint-disable-next-line
import { useEffect } from "react"

let cycle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "red",
    position: "absolute"
}

/**
 * layouthook引入的原因 & 特性
 * Author: shujun
 * Date: 2022-12-1
 */
export default function Cycle() {
    const changePosition = () => {
        console.log("cycle", cycle);
        const cycleDiv = document.querySelector("#test")
        cycleDiv.style.left = "50%"
        cycleDiv.style.top = "50%"
        cycleDiv.style.transform = "translate(-50%, -50%)"
    }

    // 据说用这个，位置移动会闪烁下，但是我的电脑不会，厉害吧
    // 疯狂刷新会闪烁
    // useEffect(changePosition);

    /**
     * 1. 需要解决闪烁问题再使用useLayoutEffect
     * 2. 先render，再useLayoutEffect，再更新fiber树
     */
    useLayoutEffect(changePosition);

    console.log("render");
    return <div id="test" style={cycle}></div>
}

/**
Question: useEffect(fn, [])与componentDidMount的区别 
https://www.bilibili.com/video/BV16t4y1r7oJ?p=3&vd_source=10d355be19883e4a50b66949c50a67aa

1. useEffect用法有三种 2_1_effect_hook.js
2. useEffect(fn, [])是在commit完成后异步调用，它是异步的
   componentDidMount()是commit完成后同步调用的
   useLayoutEffect()是同步调用的，
   commit阶段可以分为三个：beforemutation mutation layout,
   因为在layout之后，所以叫这个名字，其实也就是整个commit完成阶段
 */