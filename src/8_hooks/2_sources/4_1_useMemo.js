let lastDependency;
let lastMemo;
let lastCallback; // 只为了区分第一次还是第二次，否则这个参数可以不需要，换个flag也可以
export function useMemo(callback, dependency) {
    let changed = true;
    if (lastCallback) {
        changed = !dependency?.every((d, index) => d === lastDependency[index])
    }

    if (changed) {
        lastMemo = callback()
        lastDependency = dependency
        lastCallback = callback
    }

    return lastMemo
}