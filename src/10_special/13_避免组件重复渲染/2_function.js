import React, { memo, useCallback, useState } from "react";

// 方法一：方法定义在函数外面
// const logFun = ()=> 222
export default function TestFun() {
    const [name, setName] = useState("messi")
    const [profile, setProfile] = useState(7000)

    const logFun = ()=> 222
    // 方法二：使用hook useCallback
    const logFunCallBack = useCallback(logFun, [])

    return <>
        name: {name} <br/>
        <button onClick={() => setName(new Date().getTime())}>change name</button>
        
        <MemoBaxi profile={profile / 2} log={logFun} />
        {/* <MemoBaxi profile={profile / 2} log={logFunCallBack} /> */}
    </>
}


function BaxiFootBall({log, profile}) {
    console.log("BaxiFootBall render...", this);
    console.log("log func", log && log());
    return <h2>巴西男足平均工资：{profile}</h2>
}

const MemoBaxi = memo(BaxiFootBall)