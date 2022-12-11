import {ELEMENT_TEXT} from './contants'
import scheduleRoot from './scheduler'
import {Update} from './updateQueue'

function createElement(type, config, ...children) {
    config = config || {}
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
                        text: child, children:[]
                    }
                }
            })
        }
    }
}

class Component {
    constructor(props) {
        this.props = props
    }

    // 可能是对象，也可能是一个函数
    setState(payload) {
        let update = new Update(payload)
        // updateQueue其实是放在类组件对应的fiber节点上
        this.internalFiber.updateQueue.enqueueUpdate(update)

        scheduleRoot()
    }
}

Component.prototype.isReactComponent = true


const React = {
    Component,
    createElement
}
export default React