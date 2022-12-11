export function setProps(dom, oldProps, newProps) {
    // for (const key in oldProps) {
            
    // }

    for (let key in newProps) {
        if (key !== "children") {
            setProp(dom, key, newProps[key])
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