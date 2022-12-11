export function setProps(dom, oldProps, newProps) {
    // 很经典的更新逻辑
    // 1. 遍历老的属性
    for (const key in oldProps) {
        if (key !== 'children') {
            // 1.1 新属性中也有某个key, 则更新
            if (newProps.hasOwnProperty(key)) {
                setProp(dom, key, newProps[key])
            } else {
                // 1.2 新属性中没了，则删除此老key
                dom.removeAttribute(key)
            }
        }
    }

    // 2. 遍历新的属性
    for (let key in newProps) {
        if (key !== "children") {
            // 老属性中没有，则新增
            if (!oldProps.hasOwnProperty(key)) {
                setProp(dom, key, newProps[key])
            }
        }
    }
}

function setProp(dom, key, value) {
    // onclick
    if (/^on/.test(key)) {
        dom[key.toLowerCase()] = value
    } else if (key === "style") {
        if (value) {
            for (const styleName in value) {
                dom.style[styleName] = value[styleName]
            }
        }
    } else {
        dom.setAttribute(key, value)
    }
}

export function sleep1(delay) {
    for (let ts=Date.now(); Date.now() - ts < delay; ) {
    }
}