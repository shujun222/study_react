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