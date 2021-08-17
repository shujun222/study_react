import React, { useState } from 'react'

/**
 * hook中的更新
 * 
 * date: 2021-8-14
 */
export default function StateHook() {
    const [count, setCount] = useState(0)
    const [users, setUsers] = useState(["唐三", "小舞", "胖子", "戴老大"])
    
    function add() {
        setCount(count+1)
    }

    function changeUser() {
        console.log("change users...");
        users[3] = "小奥"    
        //依旧是同样问题，users是一个指针，改了也没用
        // setUsers(users)
        setUsers([...users])
    }

    console.log(666);
    return (<>
        <div>
            求和为 {count} <br />
            <button onClick={add}>点我+1</button>
        </div>

        <div>
            出战队员: {users.map((user, index) => <span key={index}>{user} </span>)}
            <button onClick={changeUser}>更换阵容</button>
        </div>
    </>)
}
