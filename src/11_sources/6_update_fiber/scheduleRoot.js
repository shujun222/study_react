import { setProps, sleep1 } from './utils'
import { UPDATE, TAG_TEXT, TAG_HOST, Placement, TAG_ROOT, ELEMENT_TEXT, DELETION } from './contants'

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
 * 
 *   }
 * }
 */

// 表示一个fiber, 下一个工作单元
let nextUnitOfWork = null
let workInProgressRoot = null; // 根节点
let currentRoot = null // 渲染成狗之后保存的树
let deletions = [] // 数组单独记录
export default function scheduleRoot(rootFiber) {
    // 这是更新阶段了
    if (currentRoot && currentRoot.alternate) {
        // 至少是第二次更新了，双缓存复用之前的树
        workInProgressRoot = currentRoot.alternate
        workInProgressRoot.props = rootFiber.props
        workInProgressRoot.alternate = currentRoot
        console.log("workInProgressRoot", workInProgressRoot);
    } else if (currentRoot) {
        // 第一次更新
        rootFiber.alternate = currentRoot
        workInProgressRoot = rootFiber
    } else {
        workInProgressRoot = rootFiber
    }

    nextUnitOfWork = workInProgressRoot

    // 保险操作，清空effect指针
    workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null
    requestIdleCallback(workLoop, { timeout: 1000 })
}

// 全局计数总时间 & 使用了几次idel
let startTime = Date.now()
let times = 0

function workLoop(deadline) {
    times++
    // 1. 构建fiber树吗？ reconcile阶段
    // console.log("idle tiem remaining", deadline.timeRemaining());
    while ((deadline.timeRemaining() > 10 || deadline.didTimeout) && nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    }

    if (!nextUnitOfWork) {
        console.log("第一大步完成，创建了rootFiber", workInProgressRoot);
        console.log("requestIdleCallback总耗时：", Date.now() - startTime, ", 次数", times);
        console.log("");

        // 2. 阶段二：渲染节点
        commitRoot(workInProgressRoot)
    } else {
        requestIdleCallback(workLoop, { timeout: 1000 })
    }
}


// 1. 一个时间片执行一个工作单元任务
function performUnitOfWork(nextUnitOfWork) {
    sleep1(20)
    // 1.1 构建子fiber树
    beginWork(nextUnitOfWork)
    // 如果创建完子fiber链表后，如果有大儿子，有太子
    // 父fiber.child=大儿子，sibling=二儿子， sibling=三儿子

    // a. 优先处理太子，构建太子的儿子们
    if (nextUnitOfWork.child) {
        return nextUnitOfWork.child
    }

    // 如果没有儿子，先完成自己，接着构建弟弟
    while (nextUnitOfWork) {
        // b. 先完成自己, 构建effect list
        completeUnitOfWork(nextUnitOfWork)
        // c. 构建弟弟
        if (nextUnitOfWork.sibling) {
            return nextUnitOfWork.sibling
        }
        // 如果弟弟也没有，找叔叔
        // 返回父亲，父亲会继续找弟弟
        nextUnitOfWork = nextUnitOfWork.return
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
function completeUnitOfWork(completeWork) {
    console.log("  1.2 completeUnitOfWork", completeWork.props.key || completeWork.props.text);

    let returnFiber = completeWork.return
    // 第一个完成的是A1 TEXT
    // 当前节点fiber完成了，
    if (returnFiber) {
        // first只指向大儿子？
        if (!returnFiber.firstEffect) {
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
            // 父亲已经指向过节点了, 当前completeWork是第二个兄弟节点？
            if (returnFiber.lastEffect) {
                returnFiber.lastEffect.nextEffect = completeWork
            } else {
                // 第一次指向孩子
                returnFiber.firstEffect = completeWork
            }
            returnFiber.lastEffect = completeWork
        }
    }
}


/**
 * 1.1 根据当前的fiber和虚拟dom构建fiber树
 */
function beginWork(nextUnitOfWork) {
    console.log("1.1 beginWork", nextUnitOfWork.props.key || nextUnitOfWork.props.text);
    const tag = nextUnitOfWork.tag
    if (tag === TAG_ROOT) {
        updateHostRoot(nextUnitOfWork)
    } else if (tag === TAG_TEXT) {
        updateHostText(nextUnitOfWork)
    } else if (tag === TAG_HOST) {
        updateHost(nextUnitOfWork)
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
    console.log("currentFiber.tag", currentFiber.tag);
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
 * @param {*} currentFiber : 父亲
 */
function reconcileChildren(currentFiber) {
    // nextChildren： 子节点  
    let nextChildren = currentFiber.props.children
    let previousNewFiber; // 上一个Fiber儿子
    let oldFiber = currentFiber?.alternate?.child

    let newIndex = 0
    // 新老fiber树的遍历在同一个循环中搞了
    // 构建fiber的时候还是横行优先构建的吧, 只不过最后的完成工作completeUnitOfWork是递归深度优先了
    while (newIndex < nextChildren.length || oldFiber) {
        let newChild = nextChildren[newIndex]
        let newFiber;

        // 新老fiber类型节点一样，公用老的节点
        const sameType = oldFiber?.type === newChild?.type

        if (sameType) {
            newFiber = {
                tag: oldFiber.tag,
                type: oldFiber.type, //原生DOM节点 
                stateNode: oldFiber.stateNode,

                effectTag: UPDATE,  // 新增/删除/移动
                return: currentFiber,
                key: newChild.key, // 唯一标识
                props: newChild.props, // 属性对象

                alternate: oldFiber, // 新的
                nextEffect: null
            }
        } else {
            if (newChild) {
                newFiber = {
                    tag: newChild.type === ELEMENT_TEXT ? TAG_TEXT : TAG_HOST,
                    type: newChild.type, //原生DOM节点 
                    key: newChild.key, // 唯一标识
                    props: newChild.props, // 属性对象
                    effectTag: Placement,  // 新增/删除/移动
                    // index: ? 应该得有个序号吧？当flags=move时，怎么知道移动到哪里呢？
                    return: currentFiber,

                    firstEffect: null,
                    lastEffect: null,
                    nextEffect: null
                }
            }

            if (oldFiber) {
                oldFiber.effectTag = DELETION
                deletions.push(oldFiber)
            }
        }

        // 如果没有newFiber, 那就是在仅仅遍历老的fiber链，积累要删除的东西
        if (newFiber) {
            if (newIndex === 0) {
                // 这是第一个大儿子
                currentFiber.child = newFiber
            } else {
                previousNewFiber.sibling = newFiber
            }
            previousNewFiber = newFiber
        }

        newIndex++
        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }
    }

}


/**
 * 2. 根据fiber树(已经有了effect链表，真实dom)了
 *    渲染到浏览器上面
 */
function commitRoot() {
    console.log("2. commitRoot 渲染节点到浏览器了");

    // 执行effect list之前，把该删除的元素删掉
    deletions.forEach(commitWork)

    let currentFiber = workInProgressRoot.firstEffect
    while (currentFiber) {
        commitWork(currentFiber)
        currentFiber = currentFiber.nextEffect
    }

    deletions.length = 0

    // 渲染成功的根fiber保存下来，以后currentRoot就是相当于老树了，目前界面看到的树
    currentRoot = workInProgressRoot
    workInProgressRoot = null
}

function commitWork(currentFiber) {
    if (!currentFiber) return

    let returnFiber = currentFiber.return
    let returnDOM = returnFiber.stateNode

    console.log("currentFiber", currentFiber.props.key || currentFiber.props.text);
    console.log("returnFiber", returnFiber.props.key);
    console.log("");

    const { effectTag } = currentFiber;
    if (effectTag === Placement) {
        returnDOM.appendChild(currentFiber.stateNode)
    } else if (effectTag === DELETION) {
        returnDOM.removeChild(currentFiber.stateNode)
    } else if (effectTag === UPDATE) {
        if (currentFiber.type === ELEMENT_TEXT) {
            if (currentFiber.alternate.props.text !== currentFiber.props.text) {
                currentFiber.stateNode.textContent = currentFiber.props.text
            } else {
                updateDOM(returnFiber.stateNode,
                    currentFiber.alternate.props,
                    currentFiber.props)
            }
        }
    }
    currentFiber.effectTag = null
}


