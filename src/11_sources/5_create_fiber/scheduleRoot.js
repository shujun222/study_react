import {setProps, sleep1} from './utils'
import {TAG_TEXT, TAG_HOST, Placement, TAG_ROOT, ELEMENT_TEXT} from './contants'

/**
 * 1. diff阶段/render阶段  对比老旧虚拟dom，更新fiber树
 *    此阶段可以暂停
 * 2. commit阶段：
 *    进行dom更新创建阶段，不能暂停，得一气呵成
 * 
 * rootFiber: {
 *   tag: TAG_ROOT,
 *   stateNode,
 *   container, 
 *   props: {
 *      children: [虚拟dom]
 *   }
 * }
 */

// 表示一个工作单元，正在处理中的fiber
let workInProcess = null
let workRootFiber = null; // 根节点
export default function scheduleRoot(rootFiber) {
    workInProcess = rootFiber
    workRootFiber = rootFiber
    requestIdleCallback(workLoop, {timeout: 1000})
}


// 全局计数总时间 & 使用了几次idel
let startTime = Date.now()
let times = 0

function workLoop(deadline) {
    times++
    // 1. 构建fiber树吗？ reconcile阶段
    // console.log("idle tiem remaining", deadline.timeRemaining());
    while ((deadline.timeRemaining() > 10 || deadline.didTimeout) && workInProcess) {
        workInProcess = performUnitOfWork(workInProcess)
    }

    if (!workInProcess) {
        console.log("第一大步完成，创建了rootFiber", workRootFiber);
        console.log("requestIdleCallback总耗时：", Date.now() - startTime, ", 次数", times);
        console.log("");

        // 2. 阶段二：渲染节点
        commitRoot(workRootFiber)
    } else {
        requestIdleCallback(workLoop, {timeout: 1000})
    }
}


// 1. 一个时间片执行一个工作单元任务
function performUnitOfWork(workInProcess) {
    sleep1(20)
    // 1.1 创建真实节点 & 构建子fiber树
    beginWork(workInProcess)
    // 如果创建完子fiber链表后，如果有大儿子，有太子
    // 父fiber.child=大儿子，sibling=二儿子， sibling=三儿子

    // a. 优先处理太子，构建太子的儿子们
    if (workInProcess.child) {
        return workInProcess.child
    }

    // 如果没有儿子，先完成自己，接着构建弟弟
    while (workInProcess) {
        // b. 先完成自己, 构建effect list
        console.log("  1.2 completeUnitOfWork", workInProcess.props.key || workInProcess.props.text);
        completeUnitOfWork(workInProcess)
        // completeUnitOfWork1(workInProcess)
        // c. 构建弟弟
        if (workInProcess.sibling) {
            return workInProcess.sibling
        }
        // 如果弟弟也没有，找叔叔
        // 返回父亲，父亲会继续找弟弟
        workInProcess = workInProcess.return
    }
}




/**
 * 
 * 1.2 这就是更新时要打补丁的地方，
 * EffectList副作用链
 * 并不是包含所有的节点，而是包含有副作用的fiber节点对于初次渲染而言
 * 
 * 每个fiber都有两个属性：
 *   firstEffect指向第一个副作用的子fiber，
 *   lastEffect指向最后一个副作用的fiber
 * 中间的nextEffect做成一个单链表
 */
// eslint-disable-next-line
function completeUnitOfWork(completeWork) {
    let returnFiber = completeWork.return
    // 第一个完成的是A1 TEXT
    // 当前节点fiber完成了，
    if (returnFiber) {
        // first只指向大儿子？ 只有空才走
        if (!returnFiber.firstEffect) {
            //1 
            returnFiber.firstEffect = completeWork.firstEffect
        }

        if (completeWork.lastEffect) {
            // 父亲已经指向过节点了, 当前completeWork是第二个兄弟节点？
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completeWork.firstEffect
            }
            returnFiber.lastEffect = completeWork.lastEffect
        }

        // 有副作用的节点
        // console.log("completeWork.effectTag", completeWork.effectTag);
        if (completeWork.effectTag) { 
            // 2. 父亲已经指向过节点了, 当前completeWork是第二个兄弟节点？
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completeWork
            } else {
                // 1. 第一次指向孩子
                returnFiber.firstEffect = completeWork
            }
            returnFiber.lastEffect = completeWork
        }
    }
}

let currentEffect
// eslint-disable-next-line
function completeUnitOfWork1(completeWork) {
    if (completeWork.tag === TAG_ROOT) return
   
    if (!workRootFiber.firstEffect) {
        workRootFiber.firstEffect = completeWork
    } else {
        currentEffect.nextEffect = completeWork
    }
    currentEffect = completeWork
}

/**
 * 1.1 根据当前的fiber和虚拟dom构建fiber树
 */
function beginWork(workInProcess) {
    console.log("1.1 beginWork", workInProcess.props.key || workInProcess.props.text);
    const tag = workInProcess.tag
    if (tag === TAG_ROOT){
        updateHostRoot(workInProcess)
    } else if(tag === TAG_TEXT) {
        updateHostText(workInProcess)
    } else if (tag === TAG_HOST) {
        updateHost(workInProcess)
    }
}

function updateHostRoot(currentFiber) {
    // 根据父fiber和所有的儿子虚拟dom儿子们构建出fiber
    reconcileChildren(currentFiber)
}

function updateHostText(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber)
    }
}

function updateHost(currentFiber) {
    if (!currentFiber.stateNode) {
        currentFiber.stateNode = createDOM(currentFiber)
    }

    reconcileChildren(currentFiber)
}

function createDOM(currentFiber) {
    if (currentFiber.tag === TAG_TEXT) {
        return document.createTextNode(currentFiber.props.text)
    } else if (currentFiber.tag === TAG_HOST) {
        let stateNode = document.createElement(currentFiber.type)
        updateDOM(stateNode, {}, currentFiber.props)
        return stateNode
    }
}

function updateDOM(stateNode, oldProps, newProps) {
    setProps(stateNode, oldProps, newProps)
}




/**
 * 1.1.1 根据父fiber和子虚拟DOM数组构建当前returnFiber的子Fiber树
 * @param {*} returnFiber : 父亲
 */
function reconcileChildren(returnFiber) {
    // nextChildren： 子节点  
    let nextChildren = returnFiber.props.children
    let previousNewFiber; // 上一个Fiber儿子
    // 构建fiber的时候还是横行优先构建的吧, 只不过最后的完成工作completeUnitOfWork是递归深度优先了
    for (let newIndex = 0; newIndex < nextChildren.length; newIndex++) {
        let element = nextChildren[newIndex]
        let newFiber = {
            tag: element.type === ELEMENT_TEXT ? TAG_TEXT : TAG_HOST,
            type: element.type, //原生DOM节点 
            key: element.key, // 唯一标识
            props: element.props, // 属性对象
            effectTag: Placement,  // 新增/删除/移动
            // index: ? 应该得有个序号吧？当flags=move时，怎么知道移动到哪里呢？
            return: returnFiber,

            firstEffect: null,
            lastEffect: null,
            nextEffect: null
        }

        if (newIndex === 0) {
            // 这是第一个大儿子
            returnFiber.child = newFiber
        } else {
            previousNewFiber.sibling = newFiber
        }
        previousNewFiber = newFiber
    }
}


/**
 * 2. 根据fiber树(已经有了effect链表，真实dom)了
 *    渲染到浏览器上面
 */
function commitRoot() {
    console.log("2. commitRoot 渲染节点到浏览器了");
    let currentFiber = workRootFiber.firstEffect
    while (currentFiber) {
        commitWork(currentFiber)
        currentFiber = currentFiber.nextEffect
    }
}

function commitWork(currentFiber) {
    if (!currentFiber) return

    let returnFiber = currentFiber.return
    let returnDOM = returnFiber.stateNode
    
    console.log("currentFiber", currentFiber.props.key || currentFiber.props.text);
    console.log("returnFiber", returnFiber.props.key);
    console.log("");

    if (currentFiber.effectTag === Placement) {
        returnDOM.appendChild(currentFiber.stateNode)
    }
    currentFiber.effectTag = null
}

