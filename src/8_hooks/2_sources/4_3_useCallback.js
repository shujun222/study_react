// 1. 简洁版
let lastCallBack
let lastDependency
export function useCallback(callback, dependency) {
    // 1. 初次加载默认为更新了
    let changed = true
   
    // 2. 更新阶段
    if (lastDependency) {
       // 判断依赖项是否进行了更改
       changed = !dependency?.every((d, index) => lastDependency[index] === d)
    }

    
    if (changed) {
        lastCallBack = callback
        lastDependency = dependency
    }

    return lastCallBack
}