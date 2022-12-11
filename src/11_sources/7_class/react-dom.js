import { TAG_ROOT } from './contants';
import scheduleRoot from './scheduler'

function render(element, container) {
    let rootFiber = {
        tag: TAG_ROOT,
        // 如果是原生节点，指向dom元素；
        stateNode: container,
        props: {children: [element]}
    }
    
    scheduleRoot(rootFiber)
}

const ReactDOM = {
    render
}
export default ReactDOM