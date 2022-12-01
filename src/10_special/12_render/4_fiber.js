/**
<div style={style}>
    A文本
    <div style={style}>B1文本</div>
    <div style={style}>B2文本</div>
</div>

平常jsx会把上面dom翻译成下面的虚拟dom
 */
let style = { color: 'green', border: '1px solid red', margin: '5px' }
let visualDOM = {
    type: 'div',
    key: 'A',
    props: {
        style,
        children: [
            { type: 'div', key: 'B1', props: { style, children: [] } },
            { type: 'div', key: 'B2', props: { style, children: [] } },
        ]
    }
}


// 表示一个工作单元，正在处理中的fiber
let workInProcess;
const TAG_ROOT = 'TAG_ROOT'
// 原生dom节点: div， span, ul...
const TAG_HOST = 'TAG_HOST'
const Placement = "Placement"
let root = document.getElementById("root")

// Fiber就是一个普通的JS对象
let rootFiber = {
    tag: TAG_ROOT, // Fiber的类型
    key: 'ROOT',  // 唯一标志
    stateNode: root, // Fiber真实dom节点
    props: {
        children: [visualDOM]
    }
}


function workLoop() {
    // 1. 构建fiber树吗？
    while (workInProcess) {
        workInProcess = performUnitOfWork(workInProcess)
    }
    console.log("rootFiber", rootFiber);

    // 2. 阶段二：渲染节点
    commitRoot(rootFiber)

}



function performUnitOfWork(workInProcess) {
    console.log("workInProcess.key", workInProcess.key);
    // 1.1 构建子fiber树
    beginWork(workInProcess)
    // 如果创建完子fiber链表后，如果有大儿子，有太子
    // 父fiber.child=大儿子，sibling=二儿子， sibling=三儿子

    if (workInProcess.child) {
        // 则返回处理太子，构建太子的儿子们
        return workInProcess.child
    }
    // 如果没有儿子，接着构建弟弟
    // 如果没有儿子，自己就结束了
    while (workInProcess) { // 看看有没有弟弟
        // 也有可能是最小的儿子完成了，这个最小的弟弟会让它父亲完成
        completeUnitOfWork(workInProcess)
        if (workInProcess.sibling) {
            return workInProcess.sibling
        }
        // 如果弟弟也没有，找叔叔
        workInProcess = workInProcess.return
        // 如果没有父亲，全部结束
    }
}

/**
 * 
 * @param {*} style : {color: 'green', border: '1px solid red', margin: '5px'}
 * @returns "color: green; border: 1px solid red; margin: 5px"
 */
function transferCss(style) {
    let css = "";
    for (let k in style) {
        css += `${k}:${style[k]};`
    }
    return css
}

// fiber在结构的时候，要去创建真实的dom元素
function completeUnitOfWork(workInProcess) {
    console.log("completeUnitOfWork", workInProcess.key);
    let stateNode; // 真实dom
    switch (workInProcess.tag) {
        case TAG_HOST:
            stateNode = createStateNode(workInProcess)
            // for(let key in workInProcess.props.style) {
            //     stateNode.style[key] = workInProcess.props.style[key]
            // }
            stateNode.style = transferCss(workInProcess.props.style)
            stateNode.innerHTML = "wahaha"
            break;

        default:
            break;
    }

    // 在完成工作单元的时候要判断当前fiber有没有dom操作
    makeEffectList(workInProcess)

}

/**
 * 
 * EffectList副作用链
 * 并不是包含所有的节点，而是包含有副作用的fiber节点对于初次渲染而言
 * 
 */
function makeEffectList(completeWork) {
    let returnFiber = completeWork.return
    if (returnFiber) {
        if (!returnFiber.firstEffect) {
            returnFiber.firstEffect = completeWork.firstEffect
        }
        if (completeWork.lastEffect) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completeWork.firstEffect
            }
            returnFiber.lastEffect = completeWork.lastEffect
        }
        if (completeWork.flags) {
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completeWork
            } else {
                returnFiber.firstEffect = completeWork
            }
            returnFiber.lastEffect = completeWork
        }
    }
}


function createStateNode(fiber) {
    if (fiber.tag === TAG_HOST) {
        let stateNode = document.createElement(fiber.type)
        fiber.stateNode = stateNode
    }
    return fiber.stateNode
}

/**
 * 1.1 根据当前的fiber和虚拟dom构建fiber树
 */
function beginWork(workInProcess) {
    console.log("beginWork", workInProcess.key);
    // 根据父fiber和所有的儿子虚拟dom儿子们构建出fiber
    return reconcileChildren(workInProcess)
}

/**
 * 1.1.1 根据父fiber和子虚拟DOM数组构建当前returnFiber的子Fiber树
 * @param {*} returnFiber : 父亲
 */
function reconcileChildren(returnFiber) {
    // nextChildren： 子节点  
    let nextChildren = returnFiber.props.children
    let previousNewFiber; // 上一个Fiber儿子
    let firstChildFiber; // 当前returnFiber的大儿子
    for (let newIndex = 0; newIndex < nextChildren.length; newIndex++) {
        let newFiber = createFiber(nextChildren[newIndex])
        newFiber.flags = Placement;
        newFiber.return = returnFiber
        if (!firstChildFiber) {
            // 这是第一个大儿子
            firstChildFiber = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }
        previousNewFiber = newFiber
    }
    returnFiber.child = firstChildFiber
    return firstChildFiber
}

function createFiber(element) {
    return {
        tag: TAG_HOST,
        type: element.type, //原生DOM节点 
        key: element.key, // 唯一标识
        props: element.props // 属性对象
    }
}





function commitRoot(rootFiber) {
    let currentEffect = rootFiber.firstEffect
    while (currentEffect) {
        let flags = currentEffect.flags
        switch (flags) {
            case Placement:
                commitPlacement(currentEffect)
                break;

            default:
                break;
        }
        currentEffect = currentEffect.nextEffect
    }
}

function commitPlacement(currentEffect) {
    // 父dom节点
    let parent = currentEffect.return.stateNode
    parent.appendChild(currentEffect.stateNode)

}



//当前正在执行的工作单元
workInProcess = rootFiber
workLoop()