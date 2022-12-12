import {render} from '../1_expmple'

// 1. 最简洁版
let lastValue
export function useState0(initValue) {
    lastValue = lastValue || initValue
    const dispatch = (newValue) => {
        lastValue = newValue
        render()
    }

    return [lastValue, dispatch]
}


// 2. 多个state版本s
let lastValues = []
export let hookIndex = 0
export function useState(initValue) {
    console.log("hookIndex a", hookIndex);
    let currentIndex = hookIndex
    let lastValue = lastValues[hookIndex++] || initValue
    // dispatch是一个闭包函数
    const dispatch = (newValue) => {
        console.log("hookIndex b", currentIndex);
        lastValues[currentIndex] = newValue
        render()
    }

    return [lastValue, dispatch]
}

export function initStateIndex() {
    hookIndex = 0
}


// 3. 源码级的useState
// 11_sources\8_func\scheduler.js useState
/**
    0. 函数组件是一个fiber节点
   往这个fibe上挂一个hooks数组：hooks[]
   {
        state: initiaValue,
        updateQueue: new UpdateQueue()
    }

    1. 每次setState()都是在 updateQueue中加入一个对象
    2. 一个函数，批量触发一次batchUpdate, render
    3. render里面会重新生成fiber树，也就会执行当前funComp, 自然就会执行useReducer
       在useReducer中会执行 updateQueue.forceUpdate()

 */

