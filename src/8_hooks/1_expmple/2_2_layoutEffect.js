// eslint-disable-next-line
// import { useLayoutEffect, useEffect } from "react";

// eslint-disable-next-line
import { useEffect, useLayoutEffect } from "../2_sources/2_0_useEffect"




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
        console.log("effect func 1");
        // 想阻塞渲染，咋连 useEffect也阻塞了？
        // for (let ts = Date.now(); Date.now() - ts < 3000;) { }

        console.log("effect func 2");
        const cycleDiv = document.querySelector("#test")
        cycleDiv.style.transform = "translate(300px, 100px)"
        // 电脑太好了，看不到闪烁，所有用了夸张手法，放大效果
        cycleDiv.style.transition = "all 2000ms"
    }

    // 位置移动会闪烁下
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
但是感觉这段讲解不好懂呀....
1. useEffect用法有三种 2_1_effect_hook.js
2. useEffect(fn, [])是在commit完成后异步调用，它是异步的
   componentDidMount()是commit完成后同步调用的
   useLayoutEffect()是同步调用的，
   commit阶段可以分为三个：beforemutation mutation layout,
   因为在layout之后，所以叫这个名字，其实也就是整个commit完成阶段


https://www.bilibili.com/video/BV16V411672B/?p=9&vd_source=10d355be19883e4a50b66949c50a67aa
1:37秒讲解的更好吧

1. useEffect / useLayoutEffect 都是在commit阶段执行，那自然也必须在react render(构造fiber树)之后执行
2. useEffect 在渲染之后异步调用，不阻塞浏览器渲染
   useLayoutEffect在渲染之前调用，阻塞浏览器渲染

3. 原理？ 事件循环机制中： ？ 不太确定
   先微任务 -> 判断当前帧是否需要渲染 -> 需要则渲染界面 -> 宏任务
   useEffect再宏任务中
   useLayoutEffect再微任务中

*/