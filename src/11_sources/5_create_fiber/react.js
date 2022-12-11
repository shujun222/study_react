import {ELEMENT_TEXT} from './contants'

// react16.8的方法吧，和react18的格式略有不同
function createElement(type, config, ...children) {
    delete config._self
    delete config._source
    return {
        type,
        props: {
            ...config, 
            children: children.map(child => {
                return typeof child === "object" ? child : {
                    type: ELEMENT_TEXT,
                    props: {
                        text: child, 
                        children:[]
                    }
                }
            })
        }
    }
}

const React = {
    createElement
}
export default React