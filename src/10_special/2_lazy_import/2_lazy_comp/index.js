import { useState, lazy, Suspense, createElement } from "react"

// import Player from "./Player"
const Player = lazy(() => import("./Player"))
// console.log("player", Player);

// 自己手写import来操作组件挺难呀
let LazyModule = <>Loading...</>;
import("./Player").then(module => {
    console.log("module", module);
    // 不用它的Suspense, 自己写应该怎么实现呢？
    document.getElementById("test").innerHTML = <>{module}</>
    LazyModule = module
})

export default function Example() {
    const [flag, setFlag] = useState(false)

    return <>
        四分之一决赛：<br />
        克罗地亚 vs 
        {flag && 
        //    <Player />
            
            <Suspense fallback={<h2>Loading...</h2>}>
                <Player />
            </Suspense>
        } <br />

        <button onClick={() => setFlag(!flag)}>巴西vs韩国结束了？</button>

        <div id="test"></div>
        {/* {LazyModule} */}
    </>
}