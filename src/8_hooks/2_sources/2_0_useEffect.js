// 1. 最简单版本
let lastCallback
let lastDependency
export function useEffect(callback, dependency) {
    let changed = true;

    if (lastCallback) {
        changed = !dependency?.every((item, index) => item === lastDependency[index])
    }

    if (changed) {
        // callback()
        // 先渲染，后执行
        setTimeout(callback)
        lastCallback = callback
        lastDependency = dependency
    }
}

// 2. 支持多次调用版
let lastCallbacks = []
let lastDependencys = []
let effectHookIndex = 0
export function useEffect1(callback, dependency) {
    let changed = true;

    if (lastCallbacks.length > 0) {
        changed = !dependency?.every((item, index) => item === lastDependencys[effectHookIndex][index])
    }

    if (changed) {
        callback()
        lastCallbacks[effectHookIndex] = callback
        lastDependencys[effectHookIndex] = dependency
    }
    effectHookIndex++

    // 应该在setState中重新调用render(), 然后effectHookIndex归零
    effectHookIndex = 0
}




let lastLayoutCallback
let lastLayoutDependency
export function useLayoutEffect(callback, dependency) {
    let changed = true;

    if (lastLayoutCallback) {
        changed = !dependency?.every((item, index) => item === lastLayoutDependency[index])
    }

    if (changed) {
        // Promise.resolve().then(callback)
        queueMicrotask(callback)
        // requestAnimationFrame(callback)

        lastLayoutCallback = callback
        lastLayoutDependency = dependency
    }
}
