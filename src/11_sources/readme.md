视频教程地址：https://www.bilibili.com/video/BV16V411672B


2. 虚拟DOM:
    1. 是什么
    bebal会将jsx转为React.createElement, 这个函数返回的一个json对象，树形结构，这就是虚拟dom
    2. react为什么要引入虚拟dom
    a. 提高性能：大量更新dom操作费性能，全部在visual dom中搞好，一次更新多high呀
        原生的手动改某个特定地方，其实是很快的
        怕就怕那种查询结果，大量数据列表循环的，原生的js不好对比，往往会选择全部重新渲染，
        其实好的做法应该对比两次数据，一样的数据不要重新渲染了，
        但是这个算法手动写可不好写，react虚拟dom就是做了这个事情
    b. 防止xxs跨站攻击：不让直接操作dom就好，虚拟dom里面会进行转义
    c. 跨平台：react, react-dom是分开的，react负值解析和构建，react-dom负责渲染到页面，不同平台替换掉react-dom就好
    3. 优势：上面那个引入原因
    劣势：
            a. 不能极致优化
            b. 占用内存
            c. 遍历树的递归，所以又有了fiber结构
    

    fiber
    https://claudiopro.github.io/react-fiber-vs-stack-demo/
    https://blog.csdn.net/It_kc/article/details/127877268
    为什么有了虚拟dom，还要引入fiber呢？
    1. 同步变异步
    在 react15 及之前 fiber 未出现时，react 的一系列执行过程例如生命周期执行、虚拟 dom 的比较、dom 树的更新等都是同步的，一旦开始执行就不会中断，直到所有的工作流程全部结束为止。
    fiber将任务分割成碎片，requestIdleCallback会去调用，当有更高优先级请求时，比如用户点击、浏览器渲染等
    2. 性能提升
    初始化加载时差不多吧，都要遍历整棵树

    diff算法
    a. 虚拟dom: 
        也差不多？
    b. fiber:
        见下一节11_diff

    更新dom节点时：
    a. 虚拟dom：
        怎么更新呢？需要遍历整个dom吗？
    b. fiber: effect链接起来, 通过currentEffect.return可以找到parent
            parent.appendChild
            parent.removeChild


3. 每一帧介绍：https://blog.51cto.com/u_15707676/5480346
    1. fps: Frames Per Second，即每一秒的帧数。我们在显示器上看到的各种各样的动画效果，都是由一帧一帧组成的。可以将fps理解为动画播放的速度。fps越大，动画越流畅。
    2. ​​requestAnimationFrame​​每一帧必定会执行，​​requestIdleCallback​​是捡浏览器空闲来执行任务。


7_class
   在fiber树上render()上增加了一个class Fiber: 
    {
        child, sibling, return; 
        firstEffect, lastEffect, nextEffect;
        tag: TAG_CLASS, type, key, props, effectTag,
        ...

        stateNode: new class(props),
        updateQueue:new UpdateQueue()  
    }

    setState过程：
    setState(payload) {
        let update = new Update(payload)
        this.internalFiber.updateQueue.enqueueUpdate(update)

        scheduleRoot()
    }

    scheduleRoot： 渲染整个过程：render & commit，
    其中还会有：
    currentFiber.stateNode.state = currentFiber.updateQueue.forceUpdate()

 
8_func
    在fiber树上render()上增加了一个function Fiber: 
    {
        child, sibling, return; 
        firstEffect, lastEffect, nextEffect;
        tag: TAG_FUNCTION_COMPONENT, type, key, props, effectTag,
        ...

        stateNode: 好像没挂载？,
        updateQueue:new UpdateQueue() ,

        hooks: [{
            state: initiaValue,
            updateQueue: new UpdateQueue()
        }, {state, updateQueue}, ... , ]  
    }


    useState / useReducer: 
    1. 挂载阶段：scheduleRoot() 
       render阶段 - beginWork - 构建fiber树
       判断tag === TAG_FUNCITON_COMPONENT {
        执行一遍这个函数组件 currentFiber.type(currentFiber.props)
        执行过程中，必定会触发useReducer
       }

       useReducer() {
          给当前fiber新增一个hooks数组，每调用一次就增加一个newHook
          workInProcessFiber.hooks[hookIndex] = newHook
          return [newHook.state, dispatch]
       }
    2. 更新阶段 
       dispatch() {
          newHook.updateQueue.enqueueUpdate(
            new Update(payload)
          )
          scheduleRoot()
       }
       


虚拟DOM:
1. 是什么
   bebal会将jsx转为React.createElement, 这个函数返回的一个json对象，树形结构，这就是虚拟dom
2. react为什么要引入虚拟dom
   a. 提高性能：大量更新dom操作费性能，全部在visual dom中搞好，一次更新多high呀
      原生的手动改某个特定地方，其实是很快的
      怕就怕那种查询结果，大量数据列表循环的，原生的js不好对比，往往会选择全部重新渲染，
      其实好的做法应该对比两次数据，一样的数据不要重新渲染了，
      但是这个算法手动写可不好写，react虚拟dom就是做了这个事情
   b. 防止xxs跨站攻击：不让直接操作dom就好，虚拟dom里面会进行转义
   c. 跨平台：react, react-dom是分开的，react负值解析和构建，react-dom负责渲染到页面，不同平台替换掉react-dom就好
3. 优势：上面那个引入原因
   劣势：
        a. 不能极致优化
        b. 占用内存
        c. 遍历树的递归，所以又有了fiber结构
  

fiber
https://claudiopro.github.io/react-fiber-vs-stack-demo/
https://blog.csdn.net/It_kc/article/details/127877268
为什么有了虚拟dom，还要引入fiber呢？
1. 同步变异步
   在 react15 及之前 fiber 未出现时，react 的一系列执行过程例如生命周期执行、虚拟 dom 的比较、dom 树的更新等都是同步的，一旦开始执行就不会中断，直到所有的工作流程全部结束为止。
   fiber将任务分割成碎片，requestIdleCallback会去调用，当有更高优先级请求时，比如用户点击、浏览器渲染等
2. 性能提升
   初始化加载时差不多吧，都要遍历整棵树

   diff算法
   a. 虚拟dom: 
      也差不多？
   b. fiber:
      见下一节11_diff

   更新dom节点时：
   a. 虚拟dom：
      怎么更新呢？需要遍历整个dom吗？
   b. fiber: effect链接起来, 通过currentEffect.return可以找到parent
          parent.appendChild
          parent.removeChild


