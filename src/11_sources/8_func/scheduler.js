import { setProps, sleep1 } from './utils'
import { UPDATE, TAG_TEXT, TAG_HOST, Placement, TAG_ROOT, ELEMENT_TEXT, DELETION, TAG_CLASS, TAG_FUNCTION_COMPONENT } from './contants'
import { Update, UpdateQueue } from './updateQueue';
import React from './react';

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

// 在全局中过渡下，指向 currentFiber; currentFiber.type() 函数组件Func()时会调用useReducer, 里面需要给currentFiber挂载hook对象
let workInProcessFiber = null 
let hookIndex = 0 // hook索引

export default function scheduleRoot(rootFiber) {
    // 这是更新阶段了
    if (currentRoot && currentRoot.alternate) {
        console.log("111 3333");
        // 至少是第二次更新了，双缓存复用之前的树
        workInProgressRoot = currentRoot.alternate
        if (rootFiber) {
            workInProgressRoot.props = rootFiber.props
        }
        workInProgressRoot.alternate = currentRoot
    } else if (currentRoot) {
        console.log("111 222");
        // 第一次更新
        if (rootFiber) {
            rootFiber.alternate = currentRoot
            workInProgressRoot = rootFiber
        } else {
            workInProgressRoot = {
                ...currentRoot,
                alternate: currentRoot
            }
        }

    } else {
        console.log("111 111", rootFiber);
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
    // console.log("completeWork", completeWork);
    console.log("  1.2 completeUnitOfWork", completeWork.props?.key || completeWork.props?.text || completeWork.tag);

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
function beginWork(currentFiber) {
    // console.log("currentFiber", currentFiber);
    console.log("1.1 beginWork", currentFiber.props?.key || currentFiber.props?.text || currentFiber.tag);
    const tag = currentFiber.tag
    if (tag === TAG_ROOT) {
        updateHostRoot(currentFiber)
    } else if (tag === TAG_TEXT) {
        updateHostText(currentFiber)
    } else if (tag === TAG_HOST) {
        updateHost(currentFiber)
    } else if (tag === TAG_CLASS) { // 类组件
        updateClassComponent(currentFiber)
    } else if (tag === TAG_FUNCTION_COMPONENT) {
        updateFunctionComponent(currentFiber)
    }
}

function updateHostRoot(currentFiber) {
    // 根据父fiber和所有的儿子虚拟dom儿子们构建出fiber
    let nextChildren = currentFiber.props.children
    reconcileChildren(currentFiber, nextChildren)
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
    let nextChildren = currentFiber.props.children
    reconcileChildren(currentFiber, nextChildren)
}


function updateClassComponent(currentFiber) {
    if (!currentFiber.stateNode) {
        // 类组件实例new ClassCounter() 和 fiber双向指向
        currentFiber.stateNode = new currentFiber.type(currentFiber.props)
        currentFiber.stateNode.internalFiber = currentFiber
        currentFiber.updateQueue = new UpdateQueue()
    } else {
        // 给组件的实例的state赋值
        currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate()
    }

    let newElement = currentFiber.stateNode.render();
    // console.log("react class newElement", newElement);
    newElement = React.createElement("div", {
        id: "counter"
    }, React.createElement("span", null, currentFiber.stateNode.state.number),
        React.createElement("button", {
            onClick: currentFiber.stateNode.onClick
        }, "plus 1"));
    // console.log("my class newElement", newElement);
    let newChildren = [newElement]
    reconcileChildren(currentFiber, newChildren)
}


function updateFunctionComponent(currentFiber) {
    workInProcessFiber = currentFiber
    hookIndex = 0
    currentFiber.hooks = []

    // console.log("currentFiber", currentFiber);
    let visualDOM = currentFiber.type(currentFiber.props)
    // console.log("react visualDom", visualDOM);
    // console.log("react visualDom", visualDOM);


    // visualDOM = React.createElement("div", {
    //     id: "counter"
    // }, React.createElement("span", {}, workInProcessFiber.hooks[hookIndex].state.number),
    //     React.createElement("button", {}, "\u52A0\u4E00"));
    // console.log("my visualDom", visualDOM);

    // visualDOM = React.createElement("div", {
    //     id: "counter"
    // }, React.createElement("span", {}, currentFiber.hooks[hookIndex].state.number), React.createElement("button", {
    //     onClick: () => dispatchFunc({type: 'ADD'})
    // }, "\u52A0\u4E00"));

    const hooks = currentFiber.hooks
    console.log("666 hooks", hooks);
    visualDOM = React.createElement("div", {}, 

    React.createElement("div", {
        id: "counter"
      }, React.createElement("span", {}, hooks[0].state.number), React.createElement("button", {
        onClick: () => dispatchFunc[0]({type: 'ADD'})
      }, "加一")), 

      React.createElement("div", {
        id: "age"
      }, React.createElement("span", {}, hooks[1].state.age), React.createElement("button", {
        onClick: () => dispatchFunc[1]({age: hooks[1].state.age + 1})
      }, "成长一岁")));

    let newChildren = [visualDOM]
    reconcileChildren(currentFiber, newChildren)
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
    // if (stateNode.setAttribute) {
    setProps(stateNode, oldProps, newProps)
    // }
}




/**
 * 1.1.1 根据父fiber和子虚拟DOM数组构建当前returnFiber的子Fiber树
 * @param {*} currentFiber : 父亲
 */
function reconcileChildren(currentFiber, nextChildren) {
    // nextChildren： 子节点  
    let previousNewFiber; // 上一个Fiber儿子
    let oldFiber = currentFiber?.alternate?.child
    if (oldFiber) oldFiber.firstEffect = oldFiber.lastEffect = oldFiber.nextEffect = null

    let newIndex = 0
    // 新老fiber树的遍历在同一个循环中搞了
    // 构建fiber的时候还是横行优先构建的吧, 只不过最后的完成工作completeUnitOfWork是递归深度优先了
    while (newIndex < nextChildren.length || oldFiber) {
        let newChild = nextChildren[newIndex]
        let newFiber;

        // 新老fiber类型节点一样，公用老的节点
        const sameType = newChild && oldFiber && oldFiber.type === newChild.type
        if (sameType) {
            // 如果有上上次的fiber，就拿过来复用
            if (oldFiber.alternate) {
                newFiber = oldFiber.alternate
                newFiber.props = newChild.props
                newFiber.alternate = oldFiber
                newFiber.effectTag = UPDATE
                newFiber.nextEffect = null

                newFiber.updateQueue = oldFiber.updateQueue
            } else {
                newFiber = {
                    tag: oldFiber.tag,
                    type: oldFiber.type, //原生DOM节点 
                    stateNode: oldFiber.stateNode,

                    effectTag: UPDATE,  // 新增/删除/移动
                    return: currentFiber,
                    key: newChild.key, // 唯一标识
                    props: newChild.props, // 属性对象

                    alternate: oldFiber, // 新的
                    nextEffect: null,

                    updateQueue: oldFiber.updateQueue
                }
            }

        } else {
            if (newChild) {
                let tag;
                if (newChild.type === ELEMENT_TEXT) {
                    tag = TAG_TEXT
                } else if (typeof newChild.type === 'string') {
                    tag = TAG_HOST
                } else if (typeof newChild.type === 'function') {
                    if (newChild.type.prototype.isReactComponent) {
                        tag = TAG_CLASS
                    } else {
                        tag = TAG_FUNCTION_COMPONENT
                    }
                }


                newFiber = {
                    tag,
                    type: newChild.type, //原生DOM节点 
                    key: newChild.key, // 唯一标识
                    props: newChild.props, // 属性对象
                    effectTag: Placement,  // 新增/删除/移动
                    // index: ? 应该得有个序号吧？当flags=move时，怎么知道移动到哪里呢？
                    return: currentFiber,

                    firstEffect: null,
                    lastEffect: null,
                    nextEffect: null,
                }
                if (tag === TAG_CLASS) {
                    newFiber.updateQueue = newChild.updateQueue
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
    // 可能是类组件
    while (![TAG_HOST, TAG_ROOT, TAG_TEXT].includes(returnFiber.tag)) {
        returnFiber = returnFiber.return
    }
    let returnDOM = returnFiber.stateNode

    // console.log("currentFiber", currentFiber.props.key || currentFiber.props.text);
    // console.log("returnFiber", returnFiber.props.key);
    // console.log("");

    const { effectTag } = currentFiber;
    if (effectTag === Placement) {
        // 据说会挂载两次？
        if (currentFiber.tag === TAG_CLASS) {
            return
        }

        let nextFiber = currentFiber
        // 如果要挂载的节点不是dom节点，比如说是类组件Fiber, 一直找第一个儿子，知道找到一个真实dom节点为止
        while (nextFiber.child && nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_TEXT) {
            nextFiber = nextFiber.child
        }
        returnDOM.appendChild(nextFiber.stateNode)
    } else if (effectTag === DELETION) {
        commitDeletion(currentFiber, returnDOM)
        // returnDOM.removeChild(currentFiber.stateNode)
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


function commitDeletion(currentFiber, returnDOM) {
    if (currentFiber.tag === TAG_HOST || currentFiber.tag === TAG_TEXT) {
        returnDOM.removeChild(currentFiber.stateNode)
    } else {
        commitDeletion(currentFiber.child, currentFiber)
    }
}

/**
 * 
 *  workInProcessFiber = currentFiber
    hookIndex = 0
    workInProcessFiber.hooks = []
 *
 */
let dispatchFunc = [];
export function useReducer(reducer, initiaValue) {
    console.log("666 hookIndex", hookIndex);
    let newHook = workInProcessFiber?.alternate?.hooks?.[hookIndex]
    // 第二次渲染
    if (newHook) {
        newHook.state = newHook.updateQueue.forceUpdate(newHook.state)
        
        console.log("666 newHook", newHook);
    } else {
        // 第一次渲染
        newHook = {
            state: initiaValue,
            updateQueue: new UpdateQueue()
        }
    }

    const dispatch = action => {
        console.log("666 newHook2", newHook);
        console.log("666 reducer", reducer);
        let payload = reducer ? reducer(newHook.state, action) : action
        newHook.updateQueue.enqueueUpdate(
            new Update(payload)
        )
        console.log("666 dispatchFunc", dispatchFunc);
        console.log("666 dispatchFunc reducer", reducer);
        scheduleRoot()
    }
    dispatchFunc[hookIndex] = dispatch
    workInProcessFiber.hooks[hookIndex] = newHook
    hookIndex++
    return [newHook.state, dispatch]
}

export function useState(initiaValue) { 
    return useReducer(null, initiaValue)
}

